<template>
  <v-app>
  <div class="login" >
    <img src="../images/logo.png" alt="logo" width="250" height="124">
    <template>
      <v-stepper
          v-model="e6"
          vertical
      >
        <v-stepper-step
            :complete="e6 > 1"
            step="1"
        >
          Completa tu información
          <small>Elije tu tipo de cuenta</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <div class="d-flex flex-row justify-space-between" id="userType">
          <v-card>
            <h1 class="text-center">Veterinario</h1>
            <p>Profesional encargado de la salud de animales</p>
            <v-btn
                color="primary"
<<<<<<< HEAD
                @click="e6 = e6+1;user.userTypeVet=true"
=======
                @click="e6 = e6+1;setAccountType('vet')"
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
            >
              Select
            </v-btn>
          </v-card>
            <v-card>
              <h1>Dueño de mascota</h1>
              <p>Responsable del cuidado y protección de una mascota</p>
              <v-btn
                  color="primary"
<<<<<<< HEAD
                  @click="e6 = e6+1;user.userTypeVet=false"
=======
                  @click="e6 = e6+1;setAccountType('owner')"
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
              >
                Select
              </v-btn>
            </v-card>
          </div>
        </v-stepper-content>

        <v-stepper-step
            :complete="e6 > 2"
            step="2"
        >
          Llena tu información personal
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-form class="cont" align="right"
                  color="deep-purple accent-4"
                  ref="form"
                  v-model="valid"
                  lazy-validation>
            <template>
              <div class="d-flex flex-row">
<<<<<<< HEAD
                <v-text-field v-model="user.mail"
=======
                <v-text-field v-model="name"
                              label="Full Name"
                              required>
                </v-text-field>

                <v-text-field v-model="email"
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
                              :rules="emailRules"
                              label="E-mail"
                              required>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">

<<<<<<< HEAD
                <v-text-field v-model="user.password"
=======
                <v-text-field v-model="pass"
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
                              :counter="12"
                              label="Password"
                              required
                              type="password">
                </v-text-field>

<<<<<<< HEAD
              </div>
              <div class="d-flex flex-row">
=======
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
                <v-text-field v-model="pass2"
                              :counter="12"
                              @change="passwordValidate"
                              label="Confirm Password"
                              required
                              type="password">
                </v-text-field>
              </div>
<<<<<<< HEAD
=======
              <div class="d-flex flex-row">
                <v-text-field v-model="number"
                              label="Número de Telefono"
                              required type="number">
                </v-text-field>
                <div class="d-flex flex-column">
                  <span class="ml-auto">Fecha de nacimiento</span>

                  <input type="date" class="float-left">
                </div>
              </div>
            </template>

            <template v-if="accountType==='vet'">
              <v-text-field v-model="codeVet"
                            :counter="12"
                            label="Codigo de Veterinario"
                            type="number" >
              </v-text-field>

              <v-text-field v-model="yearsExperience"
                            :counter="2"
                            type="number"
                            label="Años de experiencia"
              >
              </v-text-field>
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
            </template>

          </v-form>
          <v-btn
              color="primary"
              @click="e6 = e6+1"
          >
            Continue
          </v-btn>
          <v-btn
              color="error"
              class="ml-3"
              @click="e6 = e6-1"
          >
            Atrás
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
            :complete="e6 > 3"
            step="3"
        >
          Elije un plan
        </v-stepper-step>

        <v-stepper-content step="3">
<<<<<<< HEAD
          <template v-if="user.userTypeVet">
=======
          <template v-if="accountType==='vet'">
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
            <div class="d-flex flex-row plans">
              <v-card
                  class="vet d-flex flex-column justify-space-between"
                  v-for="plan in plansVet" :key="plan.title"
              >
                <h2 class="text-center font-italic">{{plan.title}}</h2>
                <h4 id="vetPrice">S/ {{plan.price}}</h4>
                <div v-for="benefit in plan.benefits" :key="benefit">
                  <p class="benefit">{{benefit}}</p>
                </div>
                <v-btn
                    color="success"
<<<<<<< HEAD
                    @click="handleRegister"
=======
                    @click="goToTarget"
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
                >
                  ELEGIR ->
                </v-btn>
              </v-card>
            </div>
          </template>
          <template v-else>
            <div class="d-flex flex-row plansOwner">
              <v-card
                  class="owner d-flex flex-column justify-space-between"
                  v-for="plan in plansOwner" :key="plan.title"
              >
                <h2 class="text-center font-italic">{{plan.title}}</h2>
                <h4 id="ownerPrice">S/ {{plan.price}}</h4>
                <div v-for="benefit in plan.benefits" :key="benefit">
                  <p class="benefit">{{benefit}}</p>
                </div>
                <v-btn
                    id="btnOwner"
<<<<<<< HEAD
                    @click="handleRegister"
=======
                    @click="goToTarget"
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274

                >
                  ELEGIR ->
                </v-btn>
              </v-card>
            </div>
          </template>
          <v-btn
              color="error"
              class="ml-3"
              @click="e6 = e6-1"
          >
            Atrás
          </v-btn>
        </v-stepper-content>

      </v-stepper>
    </template>

    <v-divider></v-divider>

    <div class="pre-register" >
      <p>¿Ya tienes una cuenta?</p>

      <v-btn color="blue dark" @click="goToLogin">
        LOG IN
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
    margin-top: 180px;
  }
}
.pre-register {
  margin-top: 50px;
  text-align: center;
}
</style>

<script>
import User from "@/models/user";

export default {
  name: "register",
  props:{
  },
  data() {
    return {
      e6:1,
      valid: true,
<<<<<<< HEAD
      user: new User('','','',''),
      pass2: '',
      message:'',
=======
      name: '',
      number: '',
      pass: '',
      pass2: '',
      email: '',
      codeVet:'',
      accountType:'',
      yearsExperience:'',
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
      plansVet:[{title:'Basic',price:0.00,benefits:[
            'Crea y personaliza tu perfil','Hazte colaborador de un dueño de veterinario','Accede al perfil del negocio de veterinaria al cual estás colaborando'

        ]},
        {title:'Lite',price:5.99,benefits:[
              'Todas las funciones de Basic','Obtén hasta 3 espacios en la agenda de citas','Crea un perfil para tu negocio','Asigna a un colaborador para tu veterinaria'
          ]},
        {title:'Advanced',price:14.99,benefits:[
      'Todas las funciones de Basic','Obtén hasta 7 espacios en la agenda de citas','Crea hasta 2 perfiles de tus veterinarias','Asigna hasta 3 colaboradores para tu veterinaria'
    ]},
        {title:'Premium',price:19.99,benefits:[
            'Todas las funciones de Basic','Obtén espacios ilimitados en la agenda de citas','Crea perfiles ilimitados para tus veterinarias','Asigna colaboradores de forma ilimitada para tu veterinaria'
          ]}],

      plansOwner:[{title:'Basic',price:0.00,benefits:[
            'Crea y personaliza tu perfil','Vincula a una mascota a tu cuenta','Registra y gestiona la informacion de tu mascota','Visualiza las veterinarias cercanas a tu hogar en nuestro mapa.']},
        {title:'Premium',price:5.99,benefits:[
            'Todas las funciones de Basic','Vincula a todas tus mascotas a tu cuenta','Vincula tus mascotas con tus familiares']}],

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      confirmPassword: [
      ]
    }
  },
  methods: {
<<<<<<< HEAD
    handleRegister(){
      this.message ='';
      if(this.valid){
        this.$store.dispatch('auth/register',this.user).then(
            data=>{
              this.message=data.message;
              this.goToLogin();
            },
            error=>{
              this.message=(error.response && error.response.data)
                  || error.message || error.toString();
            }
        )
      }
    },
    validate() {

    },
    passwordValidate() {
      if(this.user.password !== this.pass2){
=======
    validate() {
      this.goToTarget(this.vet);
    },
    passwordValidate() {
      if(this.pass !== this.pass2){
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
        alert('Ambas contraseñas deben ser iguales!')
      }
      else
        return 1
    },
    goToLogin() {
<<<<<<< HEAD
      this.$router.push({name: 'login'});
    },
    goToTarget(){
      this.$router.push({name: 'login'});
    },
    setAccountType(type){
        this.accountType=type;
=======
      this.$router.push({name: 'login'})
    },
    goToTarget(){
      if(this.accountType==='vet')
        this.$router.push({name: 'vet-profile'});
      else
        this.$router.push({name: 'owner'});
    },
    setAccountType(type){
      this.accountType=type;
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
    },
  }
}
</script>


<style scoped>

#userType{
  width: 70%;
  margin: auto;
}

.plans{
  width: 90%;
  justify-content: space-between;
  margin-bottom: 3%;
}

.vet{
  border-radius: 10px;
  border: 2px solid #95DB80;
  width: 20%;
  text-align: center;
}

.owner{
  width: 40%;
}

#vetPrice{
  color: #95DB80;
  font-style: italic;
}

.benefit{
  font-size: 15px;
}

.plansOwner{
  width: 60%;
  justify-content: space-between;
  margin: auto;
}

#ownerPrice{
  color: #6ACBFB;
  font-style: italic;
}

#btnOwner{
  background-color: #6ACBFB;
  color: white;
}

</style>