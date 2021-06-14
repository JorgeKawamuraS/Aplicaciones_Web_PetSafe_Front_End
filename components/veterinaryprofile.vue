<template>
  <v-row justify="space-around">
    <v-btn class="pl-3" color="success" outlined text>Añadir colaborador</v-btn>
    <v-col>
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
    </v-col>
    <v-btn class="pl-3" color="success" outlined text>Editar Perfil</v-btn>
  </v-row>
</template>

<script>
import VeterinariesApiService from "../services/veterinaries-api.service"
import SpecialtiesApiService from "../services/specialties-api.service"

export default {
  name: "veterinaryprofile",
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
      especialidades: [],
      specialties:[
        {name:'Baños',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Cortes de pelo',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Rayos X',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Esterilizaciones',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Corte de uñas',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Hospedaje',src:'https://image.flaticon.com/icons/png/512/101/101960.png'},
        {name:'Desparacitación',src:'https://image.flaticon.com/icons/png/512/101/101960.png'}
      ],
      dialogSpecialties:false
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
  created() {
    this.retrieveSpecialties();
    this.retrieveVeterinary(this.$route.params.id);
  }
}
</script>

<style scoped>

*{
}

#pfp{
  border-radius: 50%;
  justify-content: space-between;
  margin: auto;
}

.mauto{
  margin: auto;
}

#info{
  margin: auto;
  max-width: 400px;
  border: 3px solid lightseagreen;
}

#space{
  justify-content: space-between;
}
</style>