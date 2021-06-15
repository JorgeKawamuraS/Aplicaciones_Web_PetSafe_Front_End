<template>
  <v-app light>



    <v-app-bar
        app
        flat
    >

   <Header/>
    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>

    <v-footer>
      <Footer/>
    </v-footer>
  </v-app>
</template>

<script>

import Home from "./components/Home.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',

  components: {
    Home,
    Header,
    Footer
  },

  data () {
    return {

    }
  }
};
</script>
