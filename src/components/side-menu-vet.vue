<template>
  <v-navigation-drawer v-model="drawer" fixed app clipped class="drawer-style" width="200px">
<<<<<<< HEAD
    <v-list v-if="currentUser.userTypeVet" dense class="pt-3 white--text justify-space-between">
      <v-list-item  v-for="option in options" :key="option.id" @click="navigateToOption(option.src)">
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
    <v-list v-else dense class="pt-3 white--text justify-space-between">
      <v-list-item  v-for="option in optionsOwner" :key="option.id" @click="navigateToOption(option.src)">
=======
    <v-list dense class="pt-3 white--text justify-space-between">
      <v-list-item v-for="option in options" :key="option.id" @click="navigateToOption(option.src)">
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
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
import UsersApiService from "@/services/subscription/users-api.service";

export default {
  name: "side-menu-vet",
  props: {
    drawer: Boolean
  },
  data(){
    return{
      options:[
<<<<<<< HEAD
          {id:1,name:'Perfil',src:''},
          {id:2,name:'Agenda',src:''},
          {id:3,name:'Clientes',src:''},
          {id:4,name:'Solicitud',src:''},
          {id:5,name:'Tratamientos',src:''},
          {id:6,name:'Buzon',src:''}],
      optionsOwner:[ {id:1,name:'Perfil',src:''},
        {id:2,name:'Agenda',src:''},
        {id:3,name:'Recordatorios',src:''},
        {id:4,name:'Veterinarios',src:''},
        {id:5,name:'Tratamientos',src:''},
        {id:6,name:'Buzon',src:''}],
      extras:[
          {id:8,name:'Ayuda',src:''},
          {id:9,name:'Configuracion',src:''}],
      profileId:0,
    }
  },
  computed:{
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
=======
          {id:1,name:'Perfil',src:'/vets/1'},
          {id:3,name:'Agenda',src:'/vets/1/schedule'},
          {id:4,name:'Clientes',src:'/my-clients'},
          {id:5,name:'Solicitud',src:''},
          {id:6,name:'Tratamientos',src:''},
          {id:7,name:'Buzon',src:'/owner/1/mailbox'}],
      extras:[
          {id:8,name:'Ayuda',src:''},
          {id:9,name:'Configuracion',src:''}]
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    }
  },
  methods: {
    navigateToOption(path){
      this.$router.push({path:path});
<<<<<<< HEAD
    },
    changePaths(){
      if(this.currentUser.userTypeVet){
        UsersApiService.getVetByUserId(this.currentUser.id).then(
            response=>{
              this.profileId=response.data.id;
              console.log(this.options[0].src)
              this.options[0].src=`/vets/${this.profileId}`;
              this.options[1].src=`/vets/${this.profileId}/schedule`;
              this.options[2].src=`/vets/${this.profileId}/clients`;
              this.options[3].src=`/vets/${this.profileId}/`;
              this.options[4].src='/chats';
              this.options[5].src=`/vets/${this.profileId}/mailbox`;
              console.log(this.options[0].src)
        }).catch(e=>
        console.log(e));
      }else{
        UsersApiService.getOwnerByUserId(this.currentUser.id).then(
            response=>{
              this.profileId=response.data.id;
              this.optionsOwner[0].src=`/owner/${this.profileId}`;
              this.optionsOwner[1].src=`/owner/${this.profileId}/schedule`;
              this.optionsOwner[2].src=`/owner/${this.profileId}/reminders`;
              this.optionsOwner[3].src=`/searchvets`;
              this.optionsOwner[4].src='/chats';
              this.optionsOwner[5].src=`/vets/${this.profileId}/mailbox`;
            }).catch(e=>
            console.log(e));
      }
    }
  },
  created() {
    this.changePaths();
=======
    }
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  }
}
</script>

<style scoped>

</style>