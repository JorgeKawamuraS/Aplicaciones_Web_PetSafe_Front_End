<template>
  <v-app>
  <v-container>
    <v-card max-width="1200px">
      <v-card-title>
        Reocordatorios
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="displayRecordatories"
            :items-per-page="5"
            :search="search"
            class="elevation-1"
            href="recordatoriesTable">

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
          </template>

          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Nuevo Recordatorio</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.description" label="Descripción"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Eliminar Recordatorio</v-card-title>
                <v-card-text>
                  <p>¿Estás seguro que deseas eliminar este recordatorio?</p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text >Cancelar</v-btn>
                  <v-btn color="blue darken-1" text >OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </template>

        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn small color="rgb(0, 123, 253)" @click="navigateToAddRecordatory">Agregar</v-btn>
        <v-btn small color="#ff5252" @click="removeAllRecortatories">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  </v-app>
</template>

<script>
import RecordatoriesApiService from '../services/recordatories-api.service'
export default {
  name: "recordatories",
  data () {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'N°',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Descripción', value: 'description' },
        { text: 'Acciones', value: 'actions', sortable: false },

      ],
      recordatories: [],
      displayRecordatories: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        description: ''
      },
      defaultItem: {
        id: 0,
        description: ''
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Recordatorio' : 'Editar Recordatorio'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    retrieveRecordatories() {
      RecordatoriesApiService.getAll()
        .then(response => {
          this.recordatories = response.data;
          this.displayRecordatories = response.data.map(this.getDisplayRecordatories);
        })
      .catch((e) => {
        console.log(e);
      });
    },

    getDisplayRecordatories(recordatory) {
      return {
        id: recordatory.id,
        description: recordatory.description
      };
    },

    refreshList() {
      this.retrieveRecordatories();
    },

    removeAllRecortatories() {
      RecordatoriesApiService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        alert("The Backend does not support this operation.");
        console.log(e);
      })
    },

    editItem(item) {
      this.editedIndex = this.displayRecordatories.indexOf(item);
      this.editedItem = Object.assign({}, this.recordatories[this.editedIndex]);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayRecordatories.indexOf(item);
      this.editedItem = Object.assign({}, this.recordatories[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm(){
      this.deleteRecordatory(this.editedItem.id);
      this.recordatories.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.recordatories[this.editedIndex] = this.editedItem;
        this.displayRecordatories[this.editedIndex] = this.getDisplayRecordatories(this.recordatories[this.editedIndex]);
        RecordatoriesApiService.update(this.editedItem.id, this.editedItem)
          .then(() => {
            this.refreshList();
          })
        .catch(e => {
          console.log(e);
        });
      } else {
        RecordatoriesApiService.create(this.editedItem)
          .then(response => {
            let item = response.data;
            this.recordatories.push(item);
            this.displayRecordatories.push(this.getDisplayRecordatories(item));
          })
            .catch(e => {
              console.log(e);
            });
      }
      this.close();
    },

    deleteRecordatory(id) {
      RecordatoriesApiService.delete(id)
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
    },

    navigateToAddRecordatory() {
      this.$router.push({name: 'add-recordatory'});
    },

    navigateToEditRecordatory(id) {
      this.$router.push({name: 'edit-recordatory', params: {id: id}})
    }

  },
  mounted() {
    this.retrieveRecordatories();
  }
}
</script>

<style scoped>


</style>