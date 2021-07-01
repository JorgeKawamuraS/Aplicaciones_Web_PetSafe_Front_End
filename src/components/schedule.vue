<template>
  <v-app>

    <side-menu-vet :drawer="drawer"></side-menu-vet>
    <v-app-bar fixed app color="primary" light clipped-left class="elevation-2">
      <v-app-bar-nav-icon class="white--text" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"><img src="../images/logo.png" alt="logo" width="170" height="60"></v-toolbar-title>
<<<<<<< HEAD
      <v-spacer></v-spacer>
      <v-btn text color="white" to="/profile">{{ currentUser.username }}</v-btn>
      <v-btn text color="white" @click.prevent="logout">CERRAR SESIÓN</v-btn>
=======
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    </v-app-bar>

    <div>
      <h1>MI AGENDA</h1>
    </div>

      <v-container >

        <v-layout wrap>
          <v-flex
              xs12
              class="mb-3"
          >
            <v-sheet height="500">
              <v-calendar
                  ref="calendar"
                  v-model="start"
                  :type="type"
                  :end="end"
                  color="primary"
              ></v-calendar>
            </v-sheet>
          </v-flex>

          <v-flex
              sm4
              xs12
              class="text-sm-left text-xs-center"
          >
            <v-btn @click="$refs.calendar.prev()">
              <v-icon
                  dark
                  left
              >
                mdi-left
              </v-icon>
              Prev
            </v-btn>
          </v-flex>
          <v-flex
              sm4
              xs12
              class="text-xs-center"
          >
            <v-select
                v-model="type"
                :items="typeOptions"
                label="Type"
            >
              <v-calendar-daily first-interval="8" interval-minutes="60">

              </v-calendar-daily>

            </v-select>
          </v-flex>
          <v-flex
              sm4
              xs12
              class="text-sm-right text-xs-center"
          >
            <v-btn @click="$refs.calendar.next()">
              Next
              <v-icon
                  right
                  dark
              >
                mdi-right
              </v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>

  </v-app>
</template>

<script>
import SideMenuVet from "./side-menu-vet";

export default {
  name: "vet-schedule",
  components: {SideMenuVet},
  data(){
    return{
      drawer: false,
      type: 'month',
      start: '2019-01-01',
      end: '2019-01-06',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
        { text: 'Custom Daily', value: 'custom-daily' },
        { text: 'Custom Weekly', value: 'custom-weekly' }
      ],

    }
  },
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
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
<<<<<<< HEAD
    logout(){
      this.$store.dispatch('auth/logout');
      this.$router.push({name:'home'})
    }
  },
  created() {
    if(!this.currentUser){
      this.$router.push('/login');
    }
=======
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  }
}
</script>

<style scoped>
  .calendar {
    width: 1180px;
    margin-top: 60px;
    margin-left: 120px;
  }
  div h1 {
    margin-top: 30px;
  }
</style>