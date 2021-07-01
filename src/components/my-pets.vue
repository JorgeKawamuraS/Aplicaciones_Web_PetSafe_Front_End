<template>
  <v-app>
    <side-menu-vet :drawer="drawer"></side-menu-vet>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
    </v-app-bar>
    <v-main>
    <v-container fluid>
      <v-layout row wrap align-center>
        <v-flex xs8 offset-md2>
      <v-row dense align="center">
        <v-col v-for="pet in pets" :key="pet.id" class="d-flex">
          <v-card margin="auto" class="mx-auto flex-column" min-width="250px" max-width="250px">
            <v-spacer class="mt-10"></v-spacer>
            <div class="d-flex align-center">
              <v-avatar size="128" class="mx-auto" >
                <img :src="pet.src" alt="Pet">
              </v-avatar>
            </div>
            <v-card-title  class="headline d-flex">{{ pet.name }}</v-card-title>
            <v-spacer></v-spacer>
            <div id="data">
            <h4 class="ml-3">Edad: {{ pet.age }}</h4>
            <h4 class="ml-3">Cumpleaños: 24/5/6</h4>
            <h4 class="ml-3">Genero: M</h4>
            </div>
            <v-card-actions>
              <v-btn color="blue" class="d-flex"  @click="navigateToPetProfile(pet.id)">Mas informacion</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
        </v-flex>
      </v-layout>
    </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideMenuVet from "./side-menu-vet";

export default {
  name: "mis-mascotas",
  components: {SideMenuVet},
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      pets: [],
      drawer: false,
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
          id: 1 ,
          name: 'Doge',
          age: 6,
          sex: 'M',
          src:'http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg'
        },
        {
          id: 2 ,
          name: 'Stanley',
          age: 9,
          sex: 'M',
          src:'http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg'
        },
        {
          id: 3 ,
          name: 'Laika',
          age: 15,
          sex: 'F',
          src:'http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg'
        },
        {
          id: 4 ,
          name: 'Cheems',
          age: 8,
          sex: 'M',
          src:'http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg'
        }
      ]
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
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

#data{
  flex-direction: column;
  display: flex;
  text-align: left;
}


</style>