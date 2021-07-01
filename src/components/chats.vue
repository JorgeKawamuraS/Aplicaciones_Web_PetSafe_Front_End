<template>
  <v-app>
  <side-menu-vet :drawer="drawer" ></side-menu-vet>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="white" to="/profile">{{ currentUser.username }}</v-btn>
      <v-btn text color="white" @click.prevent="logout">CERRAR SESIÓN</v-btn>
    </v-app-bar>
  <v-container fluid class="mt-10">
    <v-layout row wrap align-center>
      <v-flex xs8 offset-md2>
        <div class="container" id="all">
          <div id="left">
            <div class="title">
              <h1>CHATS</h1>
              <v-btn icon><v-icon large>
                mdi-message-text
              </v-icon>
              </v-btn>
            </div>
            <div>
              <div class="chats">
                <v-btn v-for="chat in chats" :key="chat.vet" id="chat">
                  <div>
                    <h5>{{chat.vet}}</h5>
                    <v-avatar><img :src="chat.srcVet" alt="vet"></v-avatar>
                  </div>
                  <div>
                    <h5>{{chat.pet}}</h5>
                    <v-avatar><img :src="chat.srcPet" alt="macota"></v-avatar>
                  </div>
                </v-btn>
              </div>
            </div>
          </div>
          <div id="SelectedChat">
            <div>
              <h1>Info</h1>
            </div>
            <div id="messages">
              <p>Messages</p>
            </div>
            <div id="input">
              <v-text-field label="Envia un mensaje..." id="sendMessage"></v-text-field>
              <v-btn icon><v-icon>mdi-send</v-icon></v-btn>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
  </v-app>
</template>

<script>
import SideMenuVet from "./side-menu-vet";

export default {
  name: "chats",
  components: {SideMenuVet},
  data(){
    return{
      drawer: false,
      chats: [{'vet':'Juan','pet':'bobby','srcVet':'https://newsinamerica.com/pdcc/wp-content/uploads/2021/03/Nestle-Purina.jpg','srcPet':'https://estaticos.muyinteresante.es/uploads/images/article/570b65e55bafe88a438b456a/perro_0.jpg'},
        {'vet':'Juan','pet':'bobby','srcVet':'https://newsinamerica.com/pdcc/wp-content/uploads/2021/03/Nestle-Purina.jpg','srcPet':'https://estaticos.muyinteresante.es/uploads/images/article/570b65e55bafe88a438b456a/perro_0.jpg'}]
    }
  },
  computed:{
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  methods:{
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    logout(){
      this.$store.dispatch('auth/logout');
      this.$router.push({name:'home'})
    }
  },
  created() {
    if(!this.currentUser){
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

*{
  //border: 2px solid red;
}

.chats{
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 400px;
}

#chat{
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3%;
}

#chat>div{
  display: flex;
  flex-direction: row;
}

#all{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid black;
  width: 100%;
}

#all>div{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title{
  display: flex;
  flex-direction: row;
  margin: auto;
  height: 100%;
  justify-content: space-between;
}

#left{
  width: 37%;
}

#SelectedChat{
  width: 58%;
  justify-content: space-between;
  height: 450px;
}

#messages{
  height: 75%;
}

#input{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#sendMessage{
  width: 70%;
  margin-left: auto;
}

</style>