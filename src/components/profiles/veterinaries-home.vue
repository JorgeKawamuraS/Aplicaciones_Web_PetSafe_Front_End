<template>
  <v-app>
    <v-container >
      <v-layout row wrap >
        <v-flex sm>
          <template>
            <v-sheet elevation="8" class="sheet">
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
import VeterinaryProfile from "@/models/profiles/veterinaryProfile";

export default {
  name: "veterinaries-home",
  data(){
    return {
      toCollect:[],
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
      VeterinariesApiService.getAll().then(
          response=>{
            this.veterinaries=response.data;
          }
      ).catch(e=>console.log(e));
    },
    latestVeterinaries(){
      for(let i=1;i<=this.toCollect.length;i++){
        this.veterinaries.push(this.toCollect[this.toCollect-i]);
      }
    },
    refreshList(){
      this.retrieveVeterinaries()
    },
    close(){
      this.dialog = false;
      this.dialogVeterinary=false;
    },
    navigateToVeterinaryProfile(id){
      this.$router.push({name:'veterinary-profile',params:{id}});
    }
  },
  created() {
    this.retrieveVeterinaries();
  }
}
</script>

<style scoped>

.sheet{
  width: 100%;
}

*{
//border: 3px solid black;
}


.data{
  flex-direction: column;
  display: flex;
  text-align: left;
}

</style>