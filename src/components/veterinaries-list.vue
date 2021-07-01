<template>
  <v-app class="b">
  <v-container fluid>
    <v-layout row wrap align-center>
      <v-flex xs8 offset-md2>
    <v-row dense align="center">
      <v-col v-for="veterinary in displayVeterinaries" :key="veterinary.id" class="d-flex">
        <v-card margin="auto" class="mx-auto flex-column" min-width="250px" max-width="250px">
          <v-spacer class="mt-10"></v-spacer>
          <div class="d-flex align-center">
          <v-avatar size="128" class="mx-auto" >
            <img :src="veterinary.src" alt="Veterinary">
          </v-avatar>
          </div>
          <v-card-title  class="headline d-flex">{{ veterinary.name }}</v-card-title>
          <div id="data">
            <h4 class="ml-3 font-weight-light">Telefono: {{ veterinary.tn }}</h4>
            <h4 class="ml-3 font-weight-light">Fecha de creación: 24/5/2006</h4>
            <h4 class="ml-3 font-weight-light">Genero: M</h4>
          </div>
          <v-card-actions>
            <v-btn color="blue" class="d-flex"  @click="navigateToVeterinaryProfile(veterinary.id)">Mas informacion</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
      </v-flex>
    </v-layout>
  </v-container>
  </v-app>
</template>

<script>
import VeterinariesApiService from '../services/veterinaries-api.service';

export default {
  name: "veterinaries-list",
  data(){
    return {
      search:'',
      veterinaries: [],
      displayVeterinaries: [
        {"id": 2,"name": "Huellitas Seguras","tn":999666333,"src":"https://losmejoresdelima.com/wp-content/uploads/2019/03/Veterinarias.jpg"},
        {"id": 3,"name": "PetSalud","tn":999666555,"src":"https://cdn.mercadonegro.pe/wp-content/uploads/2020/03/cuarentena-coronavirus-peru-veterinarias-1.jpg"},
        {"id": 4,"name": "PetSalud","tn":999666555,"src":"https://cdn.mercadonegro.pe/wp-content/uploads/2020/03/cuarentena-coronavirus-peru-veterinarias-1.jpg"},
        {"id": 5,"name": "Unkown","tn":999666555,"src":"https://cdn.mercadonegro.pe/wp-content/uploads/2020/03/cuarentena-coronavirus-peru-veterinarias-1.jpg"}
      ],
         editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        tn: 0,
        src: ''
      },
      defaultItem: {
        id: 0,
        name: ''
      },
    }
  },
  computed:{
    formTitle(){
      return this.editedIndex === -1 ? 'New Veterinary' : 'Edit Veterinary'
    }
  },
  watch:{
    dialog(val) {
      val || this.close()
    }
  },
  methods: {
    retrieveVeterinaries(){
      VeterinariesApiService.getAll()
      .then(response =>{
          this.veterinaries = response.data;
          this.displayVeterinaries = response.data.map(this.getDisplayVeterinary);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    getDisplayVeterinary(veterinary){
      return {
        id: veterinary.id,
        name: veterinary.name,
        tn: veterinary.tn,
        src: veterinary.src
      };
    },
    refreshList(id){
      this.retrieveVeterinaries(id)
    },
    close(){
      this.dialog = false;
      this.$nextTick(()=>{
        this.editedItem = Object.assign({},this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save(){
      if(this.editedIndex>-1){
        this.veterinaries[this.editedIndex] = this.editedItem;
        this.displayVeterinaries[this.editedIndex] = this.getDisplayVeterinary(this.veterinaries[this.editedIndex]);
        VeterinariesApiService.update(this.editedIndex.id,this.editedItem)
          .then(()=>{
            this.refreshList();
          }).catch(e=>{
            console.log(e);
        })
      }else{
        VeterinariesApiService.create(this.editedItem)
        .then(response=>{
          let item = response.data;
          this.veterinaries.push(item);
          this.displayVeterinaries.push(this.getDisplayVeterinary(item));
        })
        .catch(e=>{
          console.log(e);
        })
      }
      this.close();
    },
    navigateToVeterinaryProfile(id){
      this.$router.push({name:'veterinary-profile',params:{id}});
    }
  },
  mounted() {
    this.retrieveVeterinaries();
  }
}
</script>

<style scoped>

*{
  //border: 3px solid black;
}

b{
  margin: -500px;
}


#data{
  flex-direction: column;
  display: flex;
  text-align: left;
}

</style>