<template>
  <v-app>
    <side-menu-vet :drawer="drawer"></side-menu-vet>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
    </v-app-bar>
    <v-card class="cont">
      <div class="img-profile">
        <img class="img-user" src="https://www.healthychildren.org/SiteCollectionImagesArticleImages/little_girl_with_mom_and_dog.jpg?RenditionID=3">
      </div>
      <div class="data">
        <div>
          <h3>Firstname</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Lastname</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Cellphone</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Email</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Gender</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Birth Date</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>City</h3>
          <!--  vet -->
          <h4>{{}}</h4>
        </div>

      </div>

      <v-btn class="btn-edit" color="primary"> Edit <span class="material-icons"></span> </v-btn>

    </v-card>
    <pets-list class="mt-10"></pets-list>
  </v-app>
</template>

<script>
import PetsList from "./my-pets";
import SideMenuVet from "./side-menu-vet";

export default {
  name: 'owner-profile',
  components: {SideMenuVet, PetsList},
  data(){
    return{
      drawer: false,
    }
  },
  methods:{
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
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
</style>