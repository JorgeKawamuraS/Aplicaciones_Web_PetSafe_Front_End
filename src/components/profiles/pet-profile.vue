<template>
  <v-app>
    <side-menu-vet :drawer="drawer" ></side-menu-vet>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="white" to="/profile">{{ currentUser.username }}</v-btn>
      <v-btn text color="white" @click.prevent="logout">CERRAR SESIÓN</v-btn>
    </v-app-bar>
    <v-row justify="space-around">

      <v-card class="cont">
        <div id="space">
          <div class="img-profile">
            <img class="img-user" :src="item.profilePicture">
          </div>
        </div>
        <div id="in-card">
          <div>
            <div>
              <h3>Nombre:</h3>
              <h4>{{item.name}}</h4>
            </div>

            <div>
              <h3>Fecha de Nacimiento:</h3>
              <h4>{{item.birthDate}}</h4>
            </div>


            <div>
              <h3>Ciudad:</h3>
              <h4>{{cityName}}</h4>
            </div>


            <div>
              <h3>Provincia</h3>
              <h4>{{provinceName}}</h4>
            </div>
          </div>
          <div>
            <v-card-actions >
              <h3>Enfermedades</h3>
              <v-spacer></v-spacer>
              <v-btn icon @click="showIllness=!showIllness">
                <v-icon>{{showIllness ? 'mdi-chevron-up': 'mdi-chevron-down'}}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="showIllness" >
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <div id="specialty-expand"  v-for="illness in associatedIllnesses" :key="illness.id">
                        <v-card-text >{{illness.name}}</v-card-text>
                      </div>
                      <div>
                        <v-dialog v-model="dialogIllness" scrollable max-width="500">
                          <template v-slot:activator="{on,attrs}">
                            <v-btn text  v-bind="attrs" v-on="on" >Añadir enfermedad</v-btn>
                          </template>
                          <v-card>
                            <v-checkbox v-for="illness in notAssociatedIllnesses" :key="illness.id"
                                        :label="illness.name" value="specialty.name"></v-checkbox>
                            <v-btn text  @click="dialogIllness=false">CLOSE</v-btn>
                            <v-btn text color="primary" @click="dialogIllness=false">SAVE</v-btn>
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-expand-transition>
            <v-card-actions>
              <h3>Tratamientos</h3>
              <v-spacer></v-spacer>
              <v-btn icon @click="showTreatment=!showTreatment">
                <v-icon>{{showTreatment ? 'mdi-chevron-up': 'mdi-chevron-down'}}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="showTreatment" >
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <div id="treatment-expand"  v-for="illness in associatedIllnesses" :key="illness.id">
                        <v-card-text >{{illness.name}}</v-card-text>
                      </div>
                      <div>
                        <v-dialog v-model="dialogIllness" scrollable max-width="500">
                          <template v-slot:activator="{on,attrs}">
                            <v-btn text  v-bind="attrs" v-on="on" >Añadir enfermedad</v-btn>
                          </template>
                          <v-card>
                            <v-checkbox v-for="illness in notAssociatedIllnesses" :key="illness.id"
                                        :label="illness.name" value="specialty.name"></v-checkbox>
                            <v-btn text  @click="dialogIllness=false">CLOSE</v-btn>
                            <v-btn text color="primary" @click="dialogIllness=false">SAVE</v-btn>
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-expand-transition>
          </div>
        </div>

        <v-dialog v-model="dialogPet">
          <template v-slot:activator="{ on, attrs }" >
            <v-btn v-bind="attrs" v-on="on" class="btn-edit" color="primary"> Edit <span class="material-icons"></span> </v-btn>
          </template>
          <v-card max-width="500px" class="ma-auto">
            <h1>Agregar Veterinaria</h1>
            <v-form class="cont" v-model="valid">
              <div class="d-flex flex-row">
                <v-text-field v-model="itemEdit.name"
                              label="Nombre de la mascota"
                              required  class="field">
                </v-text-field>

                <div class="d-flex flex-column">
                  <span class="ml-auto">Fecha de nacimiento</span>

                  <input type="date" class="float-left" v-model="itemEdit.birthDate">
                </div>

              </div>
              <div class="d-flex flex-row">


                <v-text-field v-model="itemEdit.profilePicture"
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
            >
              Continue
            </v-btn>
          </v-card>
        </v-dialog>

      </v-card>


    </v-row>
  </v-app>
</template>

<script>
import SideMenuVet from "@/components/side-menu-vet";
import PetsApiService from "@/services/profiles/pets-api.service";
import ProvinceApiService from "@/services/location/province-api.service";
import CityApiService from "@/services/location/cities-api.service";
import IllnessesApiService from "@/services/petInformation/illnesses-api.service";

export default {
  name: "pet-profile",
  components: {SideMenuVet},
  data(){
    return {
      item:{},
      itemEdit:{},
      showIllness: false,
      showTreatment: false,
      dialogm1:'',
      associatedIllnesses: [],
      notAssociatedIllnesses:[
        {name:'Baños',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Cortes de pelo',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Rayos X',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Esterilizaciones',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Corte de uñas',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Hospedaje',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Desparacitación',src:'https://image.flaticon.com/icons/png/512/101/101960.png'}
      ],
      associatedTreatments: [],
      notAssociatedTreatments:[
        {name:'Baños',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Cortes de pelo',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Rayos X',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Esterilizaciones',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Corte de uñas',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Hospedaje',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Desparacitación',src:'https://image.flaticon.com/icons/png/512/101/101960.png'}
      ],
      dialogIllness:false,
      dialogTreatment:false,
      drawer: false,
      provinceText:'Elije una provincia',
      cityText:'Elije una ciudad',
      provinces:[],
      cities: [],
      cityName:'',
      provinceName:'',
      dialogPet: false,
      valid:true,
    }
  },
  watch:{
    dialogSpecialty(val){
      val || this.close();
    },
    dialogVeterinary(val){
      val || this.close();
    }
  },
  computed:{
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  methods:{
    retrievePet(id){
      PetsApiService.getById(id)
          .then((response)=>{
            this.item=response.data;
            this.itemEdit=this.item;
            this.locationData();
          })
          .catch(e=>{
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
    },
    chooseCity(name){
      this.cityText=name;
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
    },
    retrieveIllnesses(){
      IllnessesApiService.getAll()
          .then(response=>{
            this.associatedIllnesses = response.data;
          })
          .catch((e)=>{
            console.log(e);
          })
    },
  },
  created() {
    this.retrievePet(this.$route.params.id);
    this.retrieveIllnesses();
    this.retrieveProvince();
    if(!this.currentUser){
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

.field{
  max-width: 40%;
  margin-right: 5%;
}

#space{
  justify-content: space-between;
}

.cont{
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 50px;
  width: 70%;
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
  font-size: 18px;
}

#in-card {
  width: 90%;
  margin: auto;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
}

#in-card>div{
  width: 45%;
}

#in-card>div>div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2%;
}

#in-card>div>div>h3{
  float: left;
  text-align: left;
}
#in-card>div>div>h4{
  float: right;
  text-align: left;
  margin-left: 2%;
}

#specialty-expand{
  display: flex;
  flex-direction: row;
}

.data{
}
</style>