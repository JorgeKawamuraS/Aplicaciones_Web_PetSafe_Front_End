<template>
  <div class="login" >
    <v-form class="cont" align="right"
            color="deep-purple accent-4"
            ref="form"
            v-model="valid"
            lazy-validation>

      <v-text-field v-model="name"
                    label="Full Name"
                    required>
      </v-text-field>

      <v-text-field v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required>
      </v-text-field>

      <v-text-field v-model="pass"
                    :counter="12"
                    label="Password"
                    required>
      </v-text-field>

      <v-text-field v-model="pass2"
                    :counter="12"
                    @change="passwordValidate"
                    label="Confirm Password"
                    required>
      </v-text-field>


      <v-container
          class="px-0"
          fluid
      >
        <v-radio-group v-model="row" row class="mb-0 ma-auto pa-0">
          <v-radio
              :label="'Vetetinario'"
          ></v-radio>
          <v-radio
              :label="'Dueño'"
          ></v-radio>
        </v-radio-group>
      </v-container>

      <v-btn :disabled="!valid"
             color="success"
             class="mr-0 mb-6 ma-0"
             @click="validate">
        SUBMIT
      </v-btn>
    </v-form>

    <v-divider></v-divider>

    <div class="pre-register" >
      <p>¿Ya tienes una cuenta?</p>

      <v-btn color="blue dark" @click="goToLogin">
        LOG IN
      </v-btn>

    </div>

  </div>
</template>

<style lang="scss">

.cont {
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 120px;
}


@media (max-width: 760px) {
  .cont {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 180px;
  }
}

.pre-register {
  margin-top: 50px;
  text-align: center;
}
</style>

<script>
export default {
  name: "register",
  data() {
    return {
      valid: true,
      name: '',
      pass: '',
      pass2: '',

      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      confirmPassword: [

      ]
    }
  },

  methods: {
    validate() {
      if(this.$refs.form.validate){
        if(this.email == 'admin@gmail.com' && this.pass == '12345')
          return 1
        else
          alert('E-mail not valid')
      }
    },

    passwordValidate() {
      if(this.pass != this.pass2){
        alert('Ambas contraseñas deben ser igales!')
      }
      else
        return 1
    },
    goToLogin() {
      this.$router.push({name: 'login'})
    }

  }
}
</script>

<style scoped>

</style>