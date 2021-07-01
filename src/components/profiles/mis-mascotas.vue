<template>
  <v-app>
    <v-main>
    <v-container fluid>
      <v-layout row wrap align-center>
        <v-flex xs8 offset-md2>

          <template>
            <v-sheet class="mx-auto" elevation="8" max-width="1200" min-width="250px">
              <h1>MIS MASCOTAS</h1>
              <v-slide-group class="pa-4" show-arrows active-class="success">
                <v-slide-item v-for="pet in pets" :key="pet.id" >
                  <v-card margin="auto" class="ma-3 flex-column" min-width="250px" max-width="250px">
                    <v-spacer class="mt-10"></v-spacer>
                    <div class="d-flex align-center">
                      <v-avatar size="128" class="mx-auto" >
                        <img :src="pet.profilePicture" alt="Veterinary">
                      </v-avatar>
                    </div>
                    <v-card-title  class="headline d-flex">{{ pet.name }}</v-card-title>
                    <v-spacer></v-spacer>
                    <div id="data">
                      <h4 class="ml-3">Cumpleaños: {{ pet.birthDate }}</h4>
                    </div>
                    <v-card-actions>
                      <v-btn color="blue" class="d-flex"  @click="navigateToPetProfile(pet.id)">Más información</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-slide-item>
                <v-card v-if="isMyProfile"  margin="auto" class="ma-3 flex-column" min-width="250px" max-width="250px" min-height="350px">
                  <div id="addPet" class="flex-column">
                    <v-dialog v-model="dialogPet">
                      <template v-slot:activator="{ on, attrs }" >
                        <h5>AGREGAR MASCOTA</h5>
                        <v-btn v-bind="attrs" v-on="on" icon > <v-icon x-large>mdi-plus</v-icon> </v-btn>
                      </template>
                      <v-card max-width="500px" class="ma-auto">
                        <h1>Agregar Mascota</h1>
                        <v-form class="cont" v-model="valid">
                          <div class="d-flex flex-row">
                            <v-text-field v-model="toSavePet.name"
                                          label="Nombre de la mascota"
                                          required  class="field">
                            </v-text-field>

                            <div class="d-flex flex-column">
                              <span class="ml-auto">Fecha de cumpleaños</span>

                              <input type="date" class="float-left" v-model="toSavePet.birthDate">
                            </div>

                          </div>
                          <div class="d-flex flex-row">

                            <v-text-field v-model="toSavePet.profilePicture"
                                          label="Link de su foto de perfil"
                                          required type="text" >
                            </v-text-field>

                          </div>
                          <div class="d-flex flex-row mb-5">
                            <v-menu transition="scale-transition" origin="center center" >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn dark color="dark" v-bind="attrs" v-on="on" class="field btnchoose">
                                  <h6 class="btnchoose">{{ provinceText }}</h6>
                                </v-btn>
                              </template>
                              <v-list>
                                <v-list-item v-for="province in provinces" :key=province.id @click="chooseProvince(province.name,province.id)" >
                                  <v-list-item-title v-text=province.name></v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                            <v-menu v-if="provinceText!='Elije una provincia'" transition="scale-transition" origin="center center" >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn dark color="dark" v-bind="attrs" v-on="on" class="field btnchoose">
                                  <h6 class="btnchoose">{{ cityText }}</h6>
                                </v-btn>
                              </template>
                              <v-list>
                                <v-list-item v-for="city in cities" :key=city.id @click="chooseCity(city.name,city.id)" >
                                  <v-list-item-title v-text=city.name></v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>

                          </div>
                        </v-form>
                        <v-btn
                            color="error"
                            class="mr-3"
                            @click="close"
                        >
                          Atrás
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="save"
                        >
                          Continue
                        </v-btn>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-card>
              </v-slide-group>
            </v-sheet>
          </template>

        </v-flex>
      </v-layout>
    </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ProvinceApiService from "@/services/location/province-api.service";
import UsersApiService from "@/services/subscription/users-api.service";
import PetsApiService from "@/services/profiles/pets-api.service";
import OwnersApiService from "@/services/profiles/ownerProfile-api.service";
import PetProfile from "@/models/profiles/petProfile";
import PetOwner from "@/models/profiles/petOwner";

export default {
  name: "mis-mascotas",
  components: {},
  data() {
    return {
      dialog: false,
      pets: [],
      petOwners: [],
      toSavePet: new PetProfile('','','','',''),
      toSavePetOwner: new PetOwner(true),
      drawer: false,
      dialogPet:false,
      provinceText:'Elije una provincia',
      cityText:'Elije una ciudad',
      provinces:[],
      cities: [],
      cityId:0,
      provinceId:0,
      valid:true,
      isMyProfile:false,
    }
  },
  computed: {
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogPet(val) {
      val || this.close()
    },
  },
  created() {
    //this.initialize();
    this.retrievePets();
    this.retrieveProvince();
    this.isMyAccount();
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
    retrievePets(){
      OwnersApiService.getPetsById(this.$route.params.id).then(
          response=>{
            this.petOwners=response.data;
            this.petOwners.forEach(po=>{
              PetsApiService.getById(po.petId).then(
                  response=>{
                    this.pets.push(response.data);
                  }
              )
            })
          }
      )
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    retrieveCities(id) {
      ProvinceApiService.getCitiesByProvinceId(id)
          .then((response)=>{
            this.cities=response.data;
          })
          .catch(e=>{
            console.log(e);
          });
    },
    retrieveProvince(){
      ProvinceApiService.getAll()
          .then((response)=>{
            this.provinces=response.data;
          })
          .catch(e=>{
            console.log(e);
          });
    },
    chooseProvince(name,id){
      this.provinceText=name;
      this.retrieveCities(id);
      this.provinceId=id;
    },
    chooseCity(name,id){
      this.cityText=name;
      this.cityId=id;
    },
    close() {
      this.dialog = false;
      this.dialogPet=false;
    },
    save() {
      ProvinceApiService.createPet(this.provinceId,this.cityId,this.toSavePet)
          .then(response=>{
            console.log(response.data);
            console.log(response.data.id);
            PetsApiService.createPetOwner(response.data.id,this.$route.params.id,this.toSavePetOwner)
            let id = response.data.id;
            this.$router.push({name:'pet',params:{id}});
          });
      this.close()
    },
    isMyAccount(){
      UsersApiService.getOwnerByUserId(this.currentUser.id).then(
          response=>{
            console.log(response.data.id);
            console.log(this.$route.params.id);
            if(response.data.id==this.$route.params.id){
              this.isMyProfile=true;
              console.log(this.isMyProfile)
            }
          }
      )
    },
    navigateToPetProfile(id){
      this.$router.push({name:'pet',params:{id}});
    }
  },
}
</script>

<style scoped>

#data{
  flex-direction: column;
  display: flex;
  text-align: left;
}


#addPet{
  margin-top: 60%;
}
</style>