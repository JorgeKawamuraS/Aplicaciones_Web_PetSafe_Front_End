<template>
  <v-app>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="white" to="/profile">{{ currentUser.username }}</v-btn>
      <v-btn text color="white" @click.prevent="logout">CERRAR SESIÓN</v-btn>
    </v-app-bar>
    <h1 class="mt-10">Personaliza tu perfil</h1>
    <v-card class="cont">
      <div class="img-profile">
        <img class="img-user" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png">
      </div>
      <div class="data">
        <div>
          <h3>Nombre</h3>
          <!-- atributos de vet -->
          <h4></h4>
        </div>

        <div>
          <h3>Telefono</h3>
          <!-- atributos de vet -->
          <h4></h4>
        </div>

        <div>
          <h3>Email</h3>
          <!-- atributos de vet -->
          <h4>{{currentUser.username}}</h4>
        </div>

        <div>
          <h3>Fecha de nacimiento</h3>
          <!-- atributos de vet -->
          <h4></h4>
        </div>

        <div>
          <h3>Ciudad</h3>
          <!--  vet -->
          <h4></h4>
        </div>

        <div>
          <h3>Provincia</h3>
          <!--  vet -->
          <h4></h4>
        </div>

        <div v-if="currentUser.userTypeVet">
          <h3>Code</h3>
          <h4></h4>
        </div>

        <div v-if="currentUser.userTypeVet">
          <h3>Años de experiencia</h3>
          <h4></h4>
        </div>
      </div>

      <v-dialog v-if="currentUser.userTypeVet" v-model="dialogVet">
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
              <v-text-field v-model="toSaveVet.name"
                            label="Nombre Completo"
                            required  class="field">
              </v-text-field>

              <div class="d-flex flex-column">
                <span class="ml-auto">Fecha de nacimiento</span>

                <input type="date" class="float-left" v-model="toSaveVet.birthDate">
              </div>

            </div>
            <div class="d-flex flex-row">

              <v-text-field v-model="toSaveVet.code"
                            :counter="12"
                            label="Codigo de Veterinario"
                            type="number" class="field">
              </v-text-field>

              <v-text-field v-model="toSaveVet.experienceYear"
                            :counter="2"
                            type="number"
                            label="Años de experiencia"  class="field"
              >
              </v-text-field>

            </div>
            <div class="d-flex flex-row">

              <v-text-field v-model="toSaveVet.telephonicNumber"
                            label="Número de Telefono"
                            required type="number"  class="field">
              </v-text-field>

              <v-text-field v-model="toSaveVet.profilePicture"
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

              <v-menu v-if="provinceText!=='Elije una provincia'" transition="scale-transition" origin="center center" >
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
              color="primary"
              @click="save"
          >
            Continue
          </v-btn>
          <v-btn
              color="error"
              class="ml-3"
              @click="close"
          >
            Atrás
          </v-btn>
        </v-card>
      </v-dialog>
      <v-dialog v-else v-model="dialogOwner">
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
              <v-text-field v-model="toSaveOwner.name"
                            label="Nombre Completo"
                            required  class="field">
              </v-text-field>

              <div class="d-flex flex-column">
                <span class="ml-auto">Fecha de nacimiento</span>

                <input type="date" class="float-left" v-model="toSaveOwner.birthDate">
              </div>

            </div>
            <div class="d-flex flex-row">

              <v-text-field v-model="toSaveOwner.telephonicNumber"
                            label="Número de Telefono"
                            required type="number"  class="field">
              </v-text-field>

              <v-text-field v-model="toSaveOwner.profilePicture"
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
              color="primary"
              @click="save"
          >
            GUARDAR
          </v-btn>
          <v-btn
              color="error"
              class="ml-3"
              @click="close"
          >
            ATRÁS
          </v-btn>
        </v-card>
      </v-dialog>

    </v-card>
  </v-app>
</template>

<script>
import ProvinceApiService from "@/services/location/province-api.service";
import OwnerProfile from "@/models/profiles/ownerProfile";
import VetProfile from "@/models/profiles/vetProfile";
import UsersApiService from "@/services/subscription/users-api.service";

export default {
  name: 'empty-profile',
  components: {},
  data(){
    return{
      valid:true,
      drawer: false,
      item: {},
      toSaveOwner: new OwnerProfile('','','','',''),
      toSaveVet: new VetProfile('','','','','','',''),
      cityId:0,
      provinceId:0,
      provinceText:'Elije una provincia',
      cityText:'Elije una ciudad',
      provinces:[],
      cities: [],
      dialogOwner: false,
      dialogVet: false,
      profileId:0,
    }
  },
  watch:{
    dialogOwner(val){
      val || this.close();
    },
    dialogVet(val){
      val || this.close();
    },
  },
  computed:{
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  methods:{
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
    close(){
      this.dialogOwner=false;
      this.dialogVet=false;
    },
    save(){
      if(this.currentUser.userTypeVet) {
        ProvinceApiService.createVet(this.provinceId, this.cityId, this.currentUser.id, this.toSaveVet);
        UsersApiService.getVetByUserId(this.currentUser.id)
        .then(response=>{
          console.log(response.data)
          this.profileId=response.data.id;
          this.$router.push(`/vets/${this.profileId}`)
        })
        .catch((e)=>{
          console.log(e);
        });
      }else{
        ProvinceApiService.createOwner(this.provinceId, this.cityId, this.currentUser.id, this.toSaveOwner);
        UsersApiService.getOwnerByUserId(this.currentUser.id)
            .then(response=>{
              console.log(response.data);
              console.log(response.data.id);
              this.profileId=response.data.id;
              this.$router.push(`/owner/${this.profileId}`)
            })
            .catch((e)=>{
              console.log(e);
            });
      }
    },
    logout(){
      this.$store.dispatch('auth/logout');
      this.$router.push({name:'home'})
    },
    hasAProfile(){
      if(this.currentUser.userTypeVet){
        UsersApiService.getVetByUserId(this.currentUser.id).then(
            response=>{
              if(response.data.id>0){
                this.$router.push(`/vets/${response.data.id}`);
              }
            }
        );
      }
      else{
        UsersApiService.getOwnerByUserId(this.currentUser.id).then(
            response=>{
              console.log(response.data)
              console.log(response.data.id)
              if(response.data.id>0){
                console.log(response.data.id)
                this.$router.push(`/owner/${response.data.id}`);
              }
            }
        );
      }
    }
  },
  created() {
    this.hasAProfile();
    this.retrieveProvince();
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
</style>