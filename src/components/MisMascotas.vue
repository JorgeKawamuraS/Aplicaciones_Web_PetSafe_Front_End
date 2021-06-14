<template>
  <v-layout align-start>
    <v-flex>
      <v-data-table
          :headers="headers"
          :items="pets"
          sort-by="breed"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>Mis Mascotas</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  New Pet
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.name"
                            label="Pet name"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.breed"
                            label="Breed"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.age"
                            label="Age"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            v-model="editedItem.sex"
                            label="Sex"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
              color="primary"
              @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  //name: "MisMascotas"
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Pet Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Breed', value: 'breed'},
        {text: 'Age', value: 'age'},
        {text: 'Sex', value: 'sex'},

        {text: 'Actions', value: 'actions', sortable: false},
      ],
      pets: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        breed: '',
        age: 0,
        sex: ''
      },
      defaultItem: {
        name: '',
        breed: '',
        age: 0,
        sex: '',
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.pets = [
        {
          name: 'Doge',
          breed: 'a',
          age: 6,
          sex: 'M',
        },
        {
          name: 'Stanley',
          breed: 'b',
          age: 9,
          sex: 'M',
        },
        {
          name: 'Laika',
          breed: 'c',
          age: 15,
          sex: 'F',
        },
        {
          name: 'Cheems',
          breed: 'd',
          age: 8,
          sex: 'M',
        },
        {
          name: 'Scooby',
          breed: 'f',
          age: 16,
          sex: 'M',
        },
        {
          name: 'Firulais',
          breed: 'g',
          age: 2,
          sex: 'F',
        },
        {
          name: 'Luna',
          breed: 'h',
          age: 3,
          sex: 'F',
        },
        {
          name: 'Korone',
          breed: 'i',
          age: 6,
          sex: 'F',
        },
        {
          name: 'Shakira',
          breed: 'j',
          age: 11,
          sex: 'F',
        },
        {
          name: 'Lucas',
          breed: 'k',
          age: 13,
          sex: 'M',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.pets.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.pets.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.pets.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
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
        Object.assign(this.pets[this.editedIndex], this.editedItem)
      } else {
        this.pets.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>