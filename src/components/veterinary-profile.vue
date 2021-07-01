<template>
  <v-app>
    <side-menu-vet :drawer="drawer" ></side-menu-vet>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
    </v-app-bar>
  <v-row justify="space-around">

    <v-card class="cont">
      <div id="space">
      <div class="img-profile">
        <img class="img-user" :src="item.src">
      </div>
      </div>
      <div id="in-card">
        <div>
          <div>
            <h3>Nombre:</h3>
            <h4>{{item.name}}</h4>
          </div>

          <div>
            <h3>Birth Date</h3>
            <h4>{{}}</h4>
          </div>


          <div>
            <h3>City</h3>
            <h4>{{}}</h4>
          </div>


          <div>
            <h3>Province</h3>
            <h4>{{}}</h4>
          </div>
        </div>
        <div>
          <div>
            <h3>Telefono:</h3>
            <h4>{{item.tn}}</h4>
          </div>
          <div>
            <h3>Description:</h3>
            <h5>um has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</h5>
          </div>

          <v-card-actions>
            <h3>Especialidades</h3>
            <v-spacer></v-spacer>
            <v-btn icon @click="show=!show">
              <v-icon>{{show ? 'mdi-chevron-up': 'mdi-chevron-down'}}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show" >
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <div id="specialty-expand"  v-for="specialty in especialidades" :key="specialty.name">
                      <v-card-text >{{specialty.name}}</v-card-text>
                      <v-avatar><img :src="specialty.src" :alt="specialty.name"></v-avatar>
                    </div>
                    <v-dialog v-model="dialogSpecialties" scrollable max-width="500">
                <template v-slot:activator="{on,attrs}">
                  <v-btn text  v-bind="attrs" v-on="on" >Añadir especialidad</v-btn>
                </template>
                <v-card>
                    <v-checkbox v-for="specialty in specialties" :key="specialty.name"
                                :label="specialty.name" value="specialty.name"></v-checkbox>
                  <v-btn text  @click="dialogSpecialties=false">CLOSE</v-btn>
                  <v-btn text color="primary" @click="dialogSpecialties=false">SAVE</v-btn>
                </v-card>
              </v-dialog>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-expand-transition>
        </div>
      </div>

      <v-btn class="btn-edit" color="primary"> Edit <span class="material-icons"></span> </v-btn>

    </v-card>

    <!--<v-col>
      <div id="space">
        <v-img id="pfp" :src="item.src" width="300px" height="300px"></v-img>
      </div>
      <v-card elevation="0" max-width="350px" id="info">
      <div >
        <h1 class="pl-0">{{item.name}}</h1>
        <div>Provincia: {{item.name}}</div>
        <div>Ciudad: {{item.tn}}</div>
        <div>Número de Telefono: {{item.tn}}</div>
        <div>Dirección:</div>
      <v-card-actions>
        <v-btn color="light-blue" text>Especialidades</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show=!show">
          <v-icon>{{show ? 'mdi-chevron-up': 'mdi-chevron-down'}}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text v-for="specialty in especialidades" :key="specialty.name">{{specialty.name}}</v-card-text>
          <v-dialog v-model="dialogSpecialties" scrollable max-width="500">
            <template v-slot:activator="{on,attrs}">
              <v-btn text  v-bind="attrs" v-on="on" >Añadir especialidad</v-btn>
            </template>
            <v-card>
              <v-radio-group v-model="dialogm1" v-for="specialty in specialties" :key="specialty.name">
              <v-radio :label="specialty.name" value="specialty.name"></v-radio>
              </v-radio-group>
              <v-btn text  @click="dialogSpecialties=false">Close</v-btn>
            </v-card>
          </v-dialog>
        </div>
      </v-expand-transition>
      </div>
      </v-card>
    </v-col>-->

  </v-row>
  </v-app>
</template>

<script>
import VeterinariesApiService from "../services/veterinaries-api.service"
import SpecialtiesApiService from "../services/specialties-api.service"
import SideMenuVet from "./side-menu-vet";

export default {
  name: "veterinary-profile",
  components: {SideMenuVet},
  data(){
    return {
      item:{
        id:0,
        name:'Huellitas seguras',
        tn:'',
        src:'https://losmejoresdelima.com/wp-content/uploads/2019/03/Veterinarias.jpg'
      },
      show: false,
      dialogm1:'',
      especialidades: [
        {name:'Baños',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Cortes de pelo',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Rayos X',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Esterilizaciones',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Corte de uñas',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Hospedaje',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Desparacitación',src:'https://image.flaticon.com/icons/png/512/101/101960.png'}],
      specialties:[
        {name:'Baños',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Cortes de pelo',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Rayos X',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Esterilizaciones',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Corte de uñas',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Hospedaje',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Desparacitación',src:'https://image.flaticon.com/icons/png/512/101/101960.png'}
      ],
      dialogSpecialties:false,
      drawer: false,
    }
  },
  watch:{
    dialogSpecialty(val){
      val || this.close();
    }
  },
  methods:{
    retrieveVeterinary(id){
      VeterinariesApiService.getVeterinaryById(id)
        .then((response)=>{
          this.item=response.data;
        })
        .catch(e=>{
          console.log(e);
        });
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    retrieveSpecialties(){
      SpecialtiesApiService.getAll()
      .then(response=>{
        this.especialidades = response.data(this.getDisplaySpecialty);
      })
      .catch(e=>{
        console.log(e);
      })
    },
    getDisplaySpecialty(specialty){
      return {
        id: specialty.id,
        name: specialty.name
      };
    },
    close(){
      this.dialogSpecialties=false;
    }
  },
  mounted() {
    this.retrieveSpecialties();
    this.retrieveVeterinary(this.$route.params.id);
  }
}
</script>

<style scoped>


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

#in-card>div>div>h4{
  float: right;
  text-align: left;
  margin-left: 1%;
}

#specialty-expand{
  display: flex;
  flex-direction: row;
}

.data{
}
</style>