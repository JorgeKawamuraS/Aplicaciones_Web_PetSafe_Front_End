<template>
  <v-app>
    <v-container>
      <side-menu-vet :drawer="drawer" ></side-menu-vet>
      <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
        <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="white--text"><img src="../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
      </v-app-bar>
      <div class="home">
        <div v-for="request in requests" :key="request.id" >
          <v-list-item :class="{'green lighten-5' : request.accepted === true}">
            <v-list-item-avatar>
              <v-img :src="request.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content >
              <v-list-item-title v-html="request.owner"></v-list-item-title>
              <v-list-item-subtitle v-html="request.reason"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-row justify="center">
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                      mdi-information
                    </v-icon>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5">
                      Veterinary appointment
                    </v-card-title>
                    <v-simple-table class="pa-9">
                      <template v-slot:default>
                        <tbody>
                        <tr>
                          <th class="text-left">
                            Owner
                          </th>
                          <td>{{ request.owner }}</td>
                        </tr>
                        <tr>
                          <th class="text-left">
                            Date
                          </th>
                          <td>{{ request.date }}</td>
                        </tr>
                        <tr>
                          <th class="text-left">
                            Hour
                          </th>
                          <td>{{ request.hour }}</td>
                        </tr>
                        <tr>
                          <th class="text-left">
                            Description
                          </th>
                          <td>{{ request.description }}</td>
                        </tr>
                        <tr>
                          <th class="text-left">
                            Accepted
                          </th>
                          <td>{{ request.accepted }}</td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="green darken-1"
                          text
                          @click="dialog = false"
                      >
                        Reject
                      </v-btn>
                      <v-btn
                          color="green darken-1"
                          text
                          @click="dialog = false, acceptRequest(request.id)"
                      >
                        Accept
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

            </v-list-item-action>

          </v-list-item>
          <v-divider></v-divider>
        </div>
      </div>
    </v-container>

  </v-app>

</template>
<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
//import MyRequestsPopUp from "@/components/MyRequestsPopUp";

import SideMenuVet from "./side-menu-vet"

export default {
  //components:{ MyRequestsPopUp},
  name: 'vet-request',
  components: { SideMenuVet },
  data(){
    return{
      requests:[
        {
          id: 1,
          patient: 'Bethovenn',
          owner: 'John Doe',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          reason: 'Consulta',
          date: '2021-04-28',
          hour: '9:00',
          description: 'Mi perro de 3 años ha estado cojeando estos dias',
          accepted: true
        },
        {
          id: 2,
          patient: 'Aragon',
          owner: 'Allan Green',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          reason: 'Consulta',
          date: '2019-11-15',
          hour: '10:00',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          accepted: false
        },
        {
          id: 3,
          patient: 'Backster',
          owner: 'Peter Hood',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          reason: 'Consulta',
          date: '2019-11-14',
          hour: '13:00',
          description: 'MSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
          accepted: false
        },
      ],
      dialog: false,
      drawer: false,
    }
  },
  computed:{
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  methods:{
    acceptRequest(id){
      let request = this.requests.filter(request => request.id == id)[0]
      request.accepted = !request.accepted
    },
    deleteRequest(id){
      this.requests = this.requests.filter(request => request,id !== id)
    },
    suggestDate(id, date){
      let request = this.requests.filter(request => request.id === id)[0]
      request.date = date
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  created() {
    if(!this.currentUser){
      this.$router.push('/login');
    }
  }
}
</script>