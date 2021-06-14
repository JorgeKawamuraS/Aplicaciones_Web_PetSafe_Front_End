<template>
  <v-container fluid>
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
          <v-spacer></v-spacer>
          <v-card-subtitle>Número de contacto:</v-card-subtitle>
          <v-card-subtitle>{{ veterinary.tn }}</v-card-subtitle>
          <v-card-actions>
            <v-btn color="blue" class="d-flex"  @click="navigateToVeterinaryProfile(veterinary.id)">Mas informacion</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VeterinariesApiService from '../services/veterinaries-api.service';

export default {
  name: "veterinaries",
  data(){
    return {
      search:'',
      veterinaries: [],
      displayVeterinaries: [{"id": 2,"name": "Huellitas Seguras","tn":999666333,"src":"https://losmejoresdelima.com/wp-content/uploads/2019/03/Veterinarias.jpg"},],
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
        tn: 0,
        src: ''
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
      this.$route.push({path: `/veterinaries/${id}`});
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

</style>