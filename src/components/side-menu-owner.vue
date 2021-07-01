<template>
  <v-navigation-drawer v-model="drawer" fixed app clipped class="drawer-style" width="200px">
    <v-list dense class="pt-3 white--text justify-space-between">
      <v-list-item v-for="option in options" :key="option.id" @click="navigateToOption(option.src)">
        <v-list-item-content>{{option.name}}</v-list-item-content>
      </v-list-item>
      <v-spacer></v-spacer>
      <v-list-item v-for="extra in extras" :key="extra.id" @click="navigateToOption(extra.src)">
        <v-list-item-content>{{extra.name}}</v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn icon><v-icon small>mdi-instagram</v-icon></v-btn>
        <v-btn icon><v-icon small>mdi-twitter</v-icon></v-btn>
        <v-btn icon><v-icon small>mdi-facebook</v-icon></v-btn>
      </v-card-actions>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "side-menu-vet",
  props: {
    drawer: Boolean
  },
  data(){
    return{
      options:[
        {id:1,name:'Perfil',src:'/owner/1'},
        {id:3,name:'Agenda',src:'/owner/1/schedule'},
        {id:4,name:'Recordatorios',src:''},
        {id:5,name:'Mapa',src:''},
        {id:6,name:'Tratamientos',src:''},
        {id:7,name:'Buzon',src:''}],
      extras:[
        {id:8,name:'Ayuda',src:''},
        {id:9,name:'Configuracion',src:''}]
    }
  },
  methods: {
    navigateToOption(path){
      this.$router.push({path:path});
    }
  }
}
</script>

<style scoped>

</style>