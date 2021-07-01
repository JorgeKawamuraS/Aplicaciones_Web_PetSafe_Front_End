<template>
  <v-app>
    <side-menu-vet :drawer="drawer" ></side-menu-vet>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="white" to="/profile">{{ currentUser.username }}</v-btn>
      <v-btn text color="white" @click.prevent="logout">CERRAR SESIÓN</v-btn>
    </v-app-bar>
    <v-container>
      <v-card max-width="1200px">
        <v-card-title>
          Recordatorios
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
              :items="displayReminders"
              :items-per-page="5"
              :search="search"
              class="elevation-1"
              href="remindersTable">

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

          <v-btn small color="#ff5252" @click="removeAllRecortatories">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import RemindersApiService from '../services/reminders-api.service'
import SideMenuVet from "@/components/side-menu-vet";
export default {
  name: "reminders",
  components: {SideMenuVet},
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
      reminders: [],
      displayReminders: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        description: ''
      },
      defaultItem: {
        id: 0,
        description: ''
      },
      drawer: false,
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Recordatorio' : 'Editar Recordatorio'
    },
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
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
      RemindersApiService.getAll()
          .then(response => {
            this.reminders = response.data;
            this.displayReminders = response.data.map(this.getDisplayRecordatories);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    logout(){
      this.$store.dispatch('auth/logout');
      this.$router.push({name:'home'})
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
      RemindersApiService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          })
    },

    editItem(item) {
      this.editedIndex = this.displayReminders.indexOf(item);
      this.editedItem = Object.assign({}, this.reminders[this.editedIndex]);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.displayReminders.indexOf(item);
      this.editedItem = Object.assign({}, this.reminders[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm(){
      this.deleteRecordatory(this.editedItem.id);
      this.reminders.splice(this.editedIndex, 1);
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
        this.reminders[this.editedIndex] = this.editedItem;
        this.displayReminders[this.editedIndex] = this.getDisplayRecordatories(this.reminders[this.editedIndex]);
        RemindersApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });
      } else {
        RemindersApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.reminders.push(item);
              this.displayReminders.push(this.getDisplayRecordatories(item));
            })
            .catch(e => {
              console.log(e);
            });
      }
      this.close();
    },

    deleteRecordatory(id) {
      RemindersApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

  },
  created() {
    if(!this.currentUser){
      this.$router.push('/login');
    }
  },
  mounted() {
    this.retrieveRecordatories();
  }
}
</script>

<style scoped>

</style>