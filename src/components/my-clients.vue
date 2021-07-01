<template>
  <v-app>
    <side-menu-vet :drawer="drawer"></side-menu-vet>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
<<<<<<< HEAD
      <v-spacer></v-spacer>
      <v-btn text color="white" to="/profile">{{ currentUser.username }}</v-btn>
      <v-btn text color="white" @click.prevent="logout">CERRAR SESIÓN</v-btn>
=======
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    </v-app-bar>
    <v-main>
      <v-container>
        <v-data-table
            :headers="headers"
            :items="clients"
            sort-by="ownername"
            class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
                flat
            >
              <v-toolbar-title>Mis Clientes</v-toolbar-title>
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
                    New Client
                  </v-btn>
                </template>
                <v-spacer></v-spacer>
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
                              v-model="editedItem.petname"
                              label="Pet Name"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="editedItem.ownername"
                              label="Owner Name"
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
              <v-dialog
                  v-model="dialog2"
                  max-width="500px"
              >
                <v-card>
                  <v-card-text>
                    <v-container>
                      <h2>Programacion de Cita</h2>
                      <br>
                      <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="defaultSchedule.Motive"
                              label="Motive"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="defaultSchedule.Date"
                              label="Date"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="defaultSchedule.Hour"
                              label="Hour"
                          ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                          <v-text-field
                              v-model="defaultSchedule.Description"
                              label="Description"
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

              <v-dialog
                  v-model="dialog3"
                  max-width="500px"
              >
                <v-card>
                  <h2>Historial</h2>
                  <v-img src="../images/historial.png"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                      Close
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
                @click="addMeeting()"
            >
              mdi-calendar
            </v-icon>
            <v-icon
                small
                @click="showHistory()"
            >
              mdi-note-text
            </v-icon>
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideMenuVet from "./side-menu-vet"
<<<<<<< HEAD
export default {
  name: "mis-clientes",
  components: { SideMenuVet },
=======

export default {
  name: "mis-clientes",
  components: {SideMenuVet},
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  data(){
    return{
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialogDelete: false,
      drawer: false,
      headers: [
        {
          text: 'Pet Name',
          align: 'start',
          sortable: false,
          value: 'petname',
        },
        {text: 'Owner Name', value: 'ownername'},
        {text: 'Age', value: 'age'},
        {text: 'Sex', value: 'sex'},
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      clients: [],
      editedIndex: -1,
      editedItem: {
        petname: '',
        ownername: '',
        age: 0,
        sex: ''
      },
      defaultItem: {
        petname: '',
        ownername: '',
        age: 0,
        sex: '',
      },
      defaultSchedule: {
        Motive: '',
        Date: '',
        Hour: '',
        Description: ''
      }
    }
  },
<<<<<<< HEAD

=======
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  methods:{
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
<<<<<<< HEAD
    logout(){
      this.$store.dispatch('auth/logout');
      this.$router.push({name:'home'})
    },
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    initialize() {
      this.clients = [
        {
          petname: 'Doge',
          ownername: 'a',
          age: 6,
          sex: 'M',
        },
        {
          petname: 'Stanley',
          ownername: 'b',
          age: 9,
          sex: 'M',
        },
        {
          petname: 'Laika',
          ownername: 'c',
          age: 15,
          sex: 'F',
        },
        {
          petname: 'Cheems',
          ownername: 'd',
          age: 8,
          sex: 'M',
        },
        {
          petname: 'Scooby',
          ownername: 'f',
          age: 16,
          sex: 'M',
        },
        {
          petname: 'Firulais',
          ownername: 'g',
          age: 2,
          sex: 'F',
        },
        {
          petname: 'Luna',
          ownername: 'h',
          age: 3,
          sex: 'F',
        },
        {
          petname: 'Korone',
          ownername: 'i',
          age: 6,
          sex: 'F',
        },
        {
          petname: 'Shakira',
          ownername: 'j',
          age: 11,
          sex: 'F',
        },
        {
          petname: 'Lucas',
          ownername: 'k',
          age: 13,
          sex: 'M',
        },
      ]
    },
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    editItem(item) {
      this.editedIndex = this.clients.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    addMeeting(item){
      this.defaultSchedule = this.clients.indexOf(item)
      this.dialog2 = true
    },
<<<<<<< HEAD
    showHistory(){
      this.dialog3 = true
    },
=======

    showHistory(){
      this.dialog3 = true
    },

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    deleteItem(item) {
      this.editedIndex = this.clients.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    deleteItemConfirm() {
      this.clients.splice(this.editedIndex, 1)
      this.closeDelete()
    },
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    close() {
      this.dialog = false
      this.dialog2 = false
      this.dialog3 = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.clients[this.editedIndex], this.editedItem)
      } else {
        this.clients.push(this.editedItem)
      }
      this.close()
    },
  },
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
    },
<<<<<<< HEAD
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
=======
  },

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
<<<<<<< HEAD
  created() {
    this.initialize();
    if(!this.currentUser){
      this.$router.push('/login');
    }
=======

  created() {
    this.initialize()
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  },
}
</script>

<style scoped>
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
</style>