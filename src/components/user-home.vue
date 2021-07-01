<template>
  <v-app>

    <owner-profile></owner-profile>
    <mis-mascotas></mis-mascotas>
    <footer-home/>
  </v-app>
</template>


<script>
import FooterHome from "./footer-home";
//import HeaderHome from "./header-home";
import MisMascotas from "./profiles/mis-mascotas"
import OwnerProfile from "./profiles/owner-profile"
export default {
  name: "user-home",
  components: {FooterHome, MisMascotas,OwnerProfile},
  data(){
  },
}
OwnerProfile
</script>


<style>
</style>