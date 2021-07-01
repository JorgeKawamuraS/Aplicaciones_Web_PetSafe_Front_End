<template>
  <v-app>
  <div class="login" >
    <img src="../images/logo.png" alt="logo" width="250" height="124">
    <v-form class="cont"
            color="deep-purple accent-4"
            ref="form"
            v-model="valid"
            lazy-validation>

<<<<<<< HEAD
      <v-text-field v-model="user.mail"
=======
      <v-text-field v-model="email"
                    :rules="emailRules"
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
                    label="E-mail"
                    required>
      </v-text-field>

<<<<<<< HEAD
      <v-text-field v-model="user.password"
                    :counter="12"
                    label="Password"
                    type="password"
=======
      <v-text-field v-model="name"
                    :counter="12"
                    label="Password"
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
                    required>
      </v-text-field>



<<<<<<< HEAD
      <v-btn :disabled="loading"
             color="success"
             class="mr-4"
             @click="handleLogin">
=======
      <v-btn :disabled="!valid"
             color="success"
             class="mr-4"
             @click="validate">
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
        SUBMIT
      </v-btn>

    </v-form>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <div class="pre-register">
      <p>¿No tienes una cuenta?</p>

      <v-btn color="blue dark" @click="goToRegister">
        SING UP
      </v-btn>

    </div>

  </div>
  </v-app>
</template>

<style lang="scss">
.cont {
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 2%;
}
@media (max-width: 760px) {
  .cont {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 2%;
  }
}
.pre-register {
  margin-top: 50px;
  text-align: center;
}
</style>
<script>
import User from "@/models/user";
import UsersApiService from '@/services/subscription/users-api.service';

export default {
  name: "login",
  data() {
    return {
<<<<<<< HEAD
      user: new User('','','',''),
      valid: true,
      loading: false,
      name: '',
      email: '',
      profileId:0,
    }
  },
  computed: {
    loggedIn(){
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  created(){
    /*if(this.loggedIn){
      this.$router.push({name: 'owner'});
    }*/
  },
  methods: {
    handleLogin() {
      this.loading = true;
      console.log('Starting Login handling');

      if (!this.valid) {
        console.log('Invalid');
        this.loading = false;
        return;
      }
      if (this.user.mail && this.user.password) {
        console.log('Starting Request');
        this.$store.dispatch('auth/login', this.user).then(
            (user) => {
              console.log('Logged In');
              console.log(user);
              if(user.username===this.user.mail) {
                if(user.userTypeVet){
                  console.log(this.currentUser.id);
                  UsersApiService.getVetByUserId(this.currentUser.id).then(
                      (response)=>{
                        this.profileId=response.data.id;
                        console.log(response.data);
                        console.log(this.profileId);
                        if(this.profileId>0){
                          this.$router.push(`/vets/${this.profileId}`)
                        }else{
                          this.$router.push({name: 'profile'});
                        }
                      }
                  ).catch(e=>{
                    console.log(e);
                    this.$router.push({name: 'profile'});
                  })
                }else{
                  UsersApiService.getOwnerByUserId(user.id).then(
                      response=>{
                        console.log(response.data)
                        this.profileId=response.data[0].id;
                        if(this.profileId>0){
                          this.$router.push(`/owner/${this.profileId}`)
                        }else{
                          this.$router.push({name: 'profile'});
                        }
                      }
                  ).catch(e=>{
                    console.log(e);
                    this.$router.push({name: 'profile'});
                  })
                }
              }
            },
            error => {
              console.log('Error');
              this.loading = false;
              this.message = (error.response && error.response.data)
                  || error.message || error.toString();
            }
        )
        this.loading = false;
      }
    },
=======
      valid: true,
      name: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    validate() {

    },
    goToRegister() {
      this.$router.push({name: 'register'})
    }
  },
}
</script>

<style scoped>
</style>