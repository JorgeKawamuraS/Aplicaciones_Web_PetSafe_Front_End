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

    <br/><br/>
    <div align="center" >

      <v-img src = "../images/mail.png" width="30%" height="100%"></v-img>

    </div>
    <br/><br/>
<<<<<<< HEAD
    <h2 class="text-center, display-1 ">Mi buzón</h2>
=======
    <h2 class="text-center, display-1 ">Mi buzon</h2>
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274

    <v-main>
      <v-container>
        <v-data-table
            :headers="headers"
            :items="notifications"
            sort-by="ownername"
            class="elevation-1, text-center"

        >
          <template v-slot:top>
            <v-toolbar
                flat
                align="center"
            >
              <v-toolbar-title class = text-center align="center">Notificaciones</v-toolbar-title>
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
                <!--
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
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
                </template>-->
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
                              v-model="editedItem.summary"
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
                <v-card class="text-left">
                  <h2 class = "text-center">Detalles</h2>
                  <p class="font-weight-black"> &nbsp;  &nbsp; Motivo: </p>
                  <p class="font-weight-black"> &nbsp;  &nbsp; Fecha: </p>
                  <p class="font-weight-black"> &nbsp;  &nbsp; Hora: </p>
                  <p class="font-weight-black"> &nbsp;  &nbsp; Descripcion: </p>


                  <v-card-actions >

                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                      Entendido
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                  v-model="dialog4"
                  max-width="500px"
              >
                <v-card class="text-left">
                  <h2 class = "text-center">
                    La cita se ha agregado a tu agenda correctamente.
                  </h2>

                  <v-card-actions >
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                      Entendido
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

          <template v-slot:[`item.actions`]="{  }" class="align-left">
            <p align="left"> <input type="button" value="Agregar a agenda" align="center" @click = "addToSchedule()" /> </p>
            <p align="left"> <input type="button" value="Ver información" align="center" @click="showHistory()"/> </p>
<<<<<<< HEAD
=======
            <!--
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
            </v-icon>-->
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
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
export default {
  name: "mailbox",
<<<<<<< HEAD
  components: { SideMenuVet },
=======
  components: {SideMenuVet},
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  data(){
    return{
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialogDelete: false,
      drawer: false,
      headers: [
        {
<<<<<<< HEAD
          value: 'summary',
        },
=======

          //text: 'Pet Name',
          //align: 'start',
          //sortable: false,
          value: 'summary',
        },

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
        {text: '', value: 'actions', sortable: false},
      ],
      notifications: [],
      editedIndex: -1,
      editedItem: {
        summary: '',
      },
      defaultItem: {
        summary: '',
      },
      defaultSchedule: {
        Motive: '',
        Date: '',
        Hour: '',
        Description: ''
      }
    }
  },
  methods:{
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    initialize() {
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
      this.notifications = [
        {
          summary: 'Lorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!e',
        },
        {
          summary: 'Lorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!y',
<<<<<<< HEAD
        },
        {
          summary: 'LLorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!a',
        },
        {
          summary: 'CLorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!s',
        },
        {
          summary: 'SLorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!by',
        },
        {
          summary: 'FLorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!',
        },
        {
          summary: 'Lorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!',
        },
=======

        },
        {
          summary: 'LLorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!a',

        },
        {
          summary: 'CLorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!s',

        },
        {
          summary: 'SLorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!by',

        },
        {
          summary: 'FLorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!',

        },
        {
          summary: 'Lorem ipsum dolor sit ametisicing elit. lficiis quibus voluptatum!',

        },

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
      ]
    },
    editItem(item) {
      this.editedIndex = this.notifications.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    addMeeting(item){
      this.defaultSchedule = this.notifications.indexOf(item)
      this.dialog2 = true
    },
    showHistory(){
      this.dialog3 = true
    },
    addToSchedule(){
      this.dialog4 = true
    },
    deleteItem(item) {
      this.editedIndex = this.notifications.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.notifications.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.dialog2 = false
      this.dialog3 = false
      this.dialog4 = false
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
        Object.assign(this.notifications[this.editedIndex], this.editedItem)
      } else {
        this.notifications.push(this.editedItem)
      }
      this.close()
    },
<<<<<<< HEAD
    logout(){
      this.$store.dispatch('auth/logout');
      this.$router.push({name:'home'})
  }
=======
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
    },
<<<<<<< HEAD
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
=======
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
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
<<<<<<< HEAD
    this.initialize();
    if(!this.currentUser){
      this.$router.push('/login');
    }
=======
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