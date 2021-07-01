<template>
  <v-app>
    <side-menu-vet :drawer="drawer"></side-menu-vet>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="white" to="/profile">{{ currentUser.username }}</v-btn>
      <v-btn text color="white" @click.prevent="logout">CERRAR SESIÓN</v-btn>
    </v-app-bar>
    <v-card class="cont">
      <div class="img-profile">
        <img class="img-user" :src="item.profilePicture">
      </div>
      <div class="data">
        <div>
          <h3>Nombre</h3>
          <h4>{{ item.name }}</h4>
        </div>

        <div>
          <h3>Cumpleaños</h3>
          <h4>{{item.birthDate}}</h4>
        </div>

        <div>
          <h3>Télefono</h3>
          <h4>{{item.telephonicNumber}}</h4>
        </div>

        <div>
          <h3>Correo personal</h3>
          <h4>{{email}}</h4>
        </div>

        <div>
          <h3>Código de veterinario</h3>
          <h4>{{item.code}}</h4>
        </div>

        <div>
          <h3>Años de experiencia</h3>
          <h4>{{item.experienceYear}}</h4>
        </div>

        <div>
          <h3>Ciudad</h3>
          <h4>{{cityName}}</h4>
        </div>

        <div>
          <h3>Provincia</h3>
          <h4>{{provinceName}}</h4>
        </div>

      </div>
      <v-dialog v-if="isMyProfile" v-model="dialogVet">
        <template v-slot:activator="{ on, attrs }" >
          <v-btn v-bind="attrs" v-on="on" class="btn-edit" color="primary" > Edit </v-btn>
        </template>
        <v-card max-width="500px" class="ma-auto">
          <h1> Edita tu información</h1>
        <v-form class="cont"
                color="deep-purple accent-4"
                ref="form"
                v-model="valid"
                lazy-validation>
            <div class="d-flex flex-row">
              <v-text-field v-model="itemEdit.name"
                            label="Nombre Completo"
                            required  class="field">
              </v-text-field>

              <div class="d-flex flex-column">
                <span class="ml-auto">Fecha de nacimiento</span>

                <input type="date" class="float-left" v-model="itemEdit.birthDate">
              </div>

            </div>
            <div class="d-flex flex-row">

              <v-text-field v-model="itemEdit.code"
                            :counter="12"
                            label="Código de Veterinario"
                            type="number" class="field">
              </v-text-field>

              <v-text-field v-model="itemEdit.experienceYear"
                            :counter="2"
                            type="number"
                            label="Años de experiencia"  class="field"
              >
              </v-text-field>

            </div>
            <div class="d-flex flex-row">

              <v-text-field v-model="itemEdit.telephonicNumber"
                            label="Número de Telefono"
                            required type="number"  class="field">
              </v-text-field>

              <v-text-field v-model="itemEdit.profilePicture"
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
            @click="editVetProfile"
        >
          Continue
        </v-btn>
        </v-card>
      </v-dialog>

  </v-card>
    <veterinaries-list class="mt-10"></veterinaries-list>
  </v-app>
</template>

<script>
import VeterinariesList from "./veterinaries-list";
import SideMenuVet from "../side-menu-vet";
import VetsApiService from '@/services/profiles/vets-api.service';
import ProvinceApiService from "@/services/location/province-api.service";
import CityApiService from "@/services/location/cities-api.service";
import UsersApiService from "@/services/subscription/users-api.service";
import VetProfile from "@/models/profiles/vetProfile";

export default {
  name: 'vet-profile',
  components: {SideMenuVet, VeterinariesList},
  data(){
    return{
      drawer: false,
      item: {},
      itemEdit:{},
      toEditVet: new VetProfile('','','','','','',''),
      provinceText:'Elije una provincia',
      cityText:'Elije una ciudad',
      provinces:[],
      cities: [],
      cityName:'',
      provinceName:'',
      email:'',
      dialogVet: false,
      show: false,
      isMyProfile:false,
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
    dialogVet(val){
      val || this.close();
    },
  },
  methods:{
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    retrieveProfile(id){
      VetsApiService.getById(id).then(
          (response)=>{
            this.item=response.data;
            this.itemEdit=this.item;
            this.locationData();
            if(this.item.userId===this.currentUser.id){
              this.isMyProfile=true;
            }
          })
          .catch(e=>{
            console.log(e);
          }
        );
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
    editVetProfile(){
      this.toEditVet.name=this.itemEdit.name;
      this.toEditVet.birthDate=this.itemEdit.birthDate;
      this.toEditVet.telephonicNumber=this.itemEdit.telephonicNumber;
      this.toEditVet.profilePicture=this.itemEdit.profilePicture;
      this.toEditVet.code=this.itemEdit.code;
      this.toEditVet.experienceYear=this.itemEdit.experienceYear;
      VetsApiService.update(this.$route.params.id,this.toEditVet).then(
          response=>{
            this.item=response.data;
          }
      )
      this.close();
    },
    locationData(){
      ProvinceApiService.getById(this.item.provinceId).then(
        response=>{
        this.provinceName=response.data.name;
      }).catch(e=>{
        console.log(e);
      });
      CityApiService.getById(this.item.cityId).then(
          response=>{
            this.cityName=response.data.name;
          }).catch(e=>{
        console.log(e);
      });
      UsersApiService.getById(this.item.userId).then(
          response=>{
            this.email=response.data.mail;
          }).catch(e=>{
            console.log(e);
      })
    },
    chooseProvince(name,id){
      this.provinceText=name;
      this.retrieveCities(id);
    },
    chooseCity(name){
      this.cityText=name;
    },
    close(){
      this.dialogVet=false;
      this.dialogVeterinary=false;
    },
    logout(){
      this.$store.dispatch('auth/logout');
      this.$router.push({name:'home'})
    }
  },
  created() {
    this.retrieveProvince();
    this.retrieveProfile(this.$route.params.id);
    if(!this.currentUser){
      this.$router.push('/login');
    }
  }
}
</script>


<style>
.cont{
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 50px;
}
.img-profile{
    text-align: center;
    margin-bottom: 10px;
}
.btn-edit{
    float: right;
}
.img-user{
    width:300px;
    height:300px;
    border-radius:150px;
}
h3{
    font-size: 20px;
    background-color: #F1F2F8;
    
}

.btnchoose{
}

.data{
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20px;
    column-gap: 5px;
}
.field{
  max-width: 40%;
  margin-right: 5%;
}

*{
  //border: 2px solid black;
}
</style>