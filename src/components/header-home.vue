<template>
  <v-app-bar fixed light color="light-blue" height="80px">
    <v-toolbar-title class="white--text"><img src="../images/logo.png" alt="logo" width="160px" height="60px"></v-toolbar-title>
    <v-spacer></v-spacer>
<<<<<<< HEAD
    <div v-if="!currentUser">
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    <v-btn text color="white" @click="navigateToLogin">
      Inciar Sesión
    </v-btn>

    <v-btn text color="white" @click="navigateToRegister">
      Registrate
    </v-btn>
<<<<<<< HEAD
    </div>
    <div v-else>
      <v-btn text color="white" to="/profile">{{ currentUser.username }}</v-btn>
      <v-btn text color="white" @click.prevent="logout">CERRAR SESIÓN</v-btn>
    </div>
=======

     <v-btn text color="white" @click="vetHome">
      Perfil Veterinario
    </v-btn>

    <v-btn text color="white" @click="userHome">
      Perfil Usuario
    </v-btn>
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  </v-app-bar>
</template>

<script>
export default {
  name: "header-home",
<<<<<<< HEAD
  computed:{
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
=======
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  methods:{
    navigateToLogin(){
      this.$router.push({name:'login'});
    },
    navigateToRegister(){
      this.$router.push({name:'register'});
    },
<<<<<<< HEAD
    logout(){
      this.$store.dispatch('auth/logout');
      this.$router.push({name:'home'})
=======
    vetHome(){
      this.$router.push({name:'vet-home'});
    },
    userHome(){
      this.$router.push({name:'user-home'});
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    }
  }
}
</script>

<style scoped>

</style>