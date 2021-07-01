<template>
  <v-app>
    <!--header-home></header-home> <br><br-->
    <schedule></schedule>
    <h3>Mis Veterinarias</h3> <br><br>
    <veterinaries-list></veterinaries-list>
    <footer-home/>
  </v-app>
</template>


<script>
import FooterHome from "./footer-home";
//import HeaderHome from "./header-home";
import VeterinariesList from "./profiles/veterinaries-list";
import Schedule from "./schedule"
//import SideMenuVet from "./side-menu-vet"
export default {
  name: "vet-home",
  components: { FooterHome, VeterinariesList, Schedule},
  data(){
  },
}
</script>


<style>
</style>