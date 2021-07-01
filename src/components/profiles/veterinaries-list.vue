<template>
  <v-app>
  <v-container fluid>
    <v-layout row wrap align-center>
      <v-flex xs8 offset-md2>
      <template>
      <v-sheet class="mx-auto" elevation="8" max-width="1200">
        <h1>MIS VETERINARIAS</h1>
        <v-slide-group class="pa-4" show-arrows active-class="success">
          <v-slide-item v-for="veterinary in veterinaries" :key="veterinary.id" >
            <v-card margin="auto" class="ma-3 flex-column" min-width="250px" max-width="250px">
              <v-spacer class="mt-10"></v-spacer>
              <div class="d-flex align-center">
                <v-avatar size="128" class="mx-auto" >
                  <img :src="veterinary.profilePicture" alt="Veterinary">
                </v-avatar>
              </div>
              <v-card-title  class="headline d-flex">{{ veterinary.name }}</v-card-title>
              <div class="data">
                <h4 class="ml-3 font-weight-light">Teléfono: {{ veterinary.telephonicNumber }}</h4>
                <h4 class="ml-3 font-weight-light">Fecha de creación: {{ veterinary.birthDate }}</h4>
              </div>
              <v-card-actions>
                <v-btn color="blue" class="d-flex"  @click="navigateToVeterinaryProfile(veterinary.id)">Más información</v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-item>
          <v-card v-if="isMyProfile"  margin="auto" class="ma-3 flex-column" min-width="250px" max-width="250px" min-height="350px">
            <div id="addVeterinary" class="flex-column">
              <v-dialog v-model="dialogVeterinary" >
                <template v-slot:activator="{ on, attrs }" >
                  <h5>AGREGAR VETERINARIA</h5>
                  <v-btn v-bind="attrs" v-on="on" icon > <v-icon x-large>mdi-plus</v-icon> </v-btn>
                </template>
                <v-card max-width="500px" class="ma-auto">
                  <h1>Agregar Veterinaria</h1>
                  <v-form class="cont" v-model="valid">
                    <div class="d-flex flex-row">
                      <v-text-field v-model="toSaveVeterinary.name"
                                    label="Nombre de la veterinaria"
                                    required  class="field">
                      </v-text-field>

                      <div class="d-flex flex-column">
                        <span class="ml-auto">Fecha de creación</span>

                        <input type="date" class="float-left" v-model="toSaveVeterinary.birthDate">
                      </div>

                    </div>
                    <div class="d-flex flex-row">

                      <v-text-field v-model="toSaveVeterinary.telephonicNumber"
                                    label="Número de Telefono"
                                    required type="number"  class="field">
                      </v-text-field>

                      <v-text-field v-model="toSaveVeterinary.profilePicture"
                                    label="Link de su foto de perfil"
                                    required type="text"  class="field">
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
  </v-app>
</template>

<script>
import VeterinariesApiService from '../../services/profiles/veterinaries-api.service';
import VetVeterinariesApiService from '../../services/vetVeterinaries-api.service';
import ProvinceApiService from "@/services/location/province-api.service";
import UsersApiService from "@/services/subscription/users-api.service";
import VeterinaryProfile from "@/models/profiles/veterinaryProfile";

export default {
  name: "veterinaries-list",
  data(){
    return {
      veterinaries: [],
      toSaveVeterinary: new VeterinaryProfile('','','','',''),
      provinceText:'Elije una provincia',
      cityText:'Elije una ciudad',
      provinces:[],
      cities: [],
      vetVeterinaries:[],
      cityId:0,
      provinceId:0,
      dialogVeterinary: false,
      isMyProfile:false,
      vet:{},
      valid:true,
    }
  },
  computed:{
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  watch:{
    dialog(val) {
      val || this.close()
    },
    dialogVeterinary(val){
      val || this.close();
    }
  },
  methods: {
    retrieveVeterinaries(){
      VetVeterinariesApiService.getVetVeterinariesByVetId(this.$route.params.id).then(
          response=>{
            console.log(response.data);
            this.vetVeterinaries=response.data;
            this.vetVeterinaries.forEach(vv=>{
              VeterinariesApiService.getVeterinaryById(vv.veterinaryId).then(
                  response=>{
                    console.log(response.data);
                    this.veterinaries.push(response.data);
                  }
              )
            })
          }
      )
    },
    isMyAccount(){
      UsersApiService.getVetByUserId(this.currentUser.id).then(
          response=>{
            if(response.data.id==this.$route.params.id){
              this.isMyProfile=true;
              console.log(this.isMyProfile)
            }
          }
      )
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
    refreshList(id){
      this.retrieveVeterinaries(id)
    },
    close(){
      this.dialog = false;
      this.dialogVeterinary=false;
    },
    save(){
      ProvinceApiService.createVeterinary(this.provinceId,this.cityId,this.toSaveVeterinary)
      .then(response=>{
        console.log(response.data);
        console.log(response.data.id);
        VeterinariesApiService.createVetVeterinary(this.$route.params.id,response.data.id);
        let id = response.data.id;
        this.$router.push({name:'veterinary-profile',params:{id}});
      });
      this.close();
    },
    navigateToVeterinaryProfile(id){
      this.$router.push({name:'veterinary-profile',params:{id}});
    }
  },
  mounted() {
    this.retrieveVeterinaries();
  },
  created() {
    this.retrieveProvince();
    this.isMyAccount();
  }
}
</script>

<style scoped>

.cont{
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 50px;
}
*{
  //border: 3px solid black;
}

#addVeterinary{
  margin-top: 50%;
}

.data{
  flex-direction: column;
  display: flex;
  text-align: left;
}

</style>