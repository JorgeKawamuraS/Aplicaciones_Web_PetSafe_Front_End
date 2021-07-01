<template>
  <v-app>
    <header-home></header-home>
  <header class="flex-row"></header>
  <div>
<<<<<<< HEAD
=======

>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  <div>
    <v-container grid-list-md>
      <v-layout row wrap justify-center>
        <v-flex xs24 sm12>
            <v-img src = "../images/fondo.png" height="600px">
              <span class = "headline white--text">
                <br/><br/><br/><br/><br/><br/>
                &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; "Huellitas seguras" es una empresa que busca renovar los metodos tradicionales<br/>
                &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; del servicio de veterinaria como lo es la logistica, seguridad y publicidad.Además,<br/>
                &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; de generar un valor importante para los dueños de mascotas y veterinarios. Es así <br/>
                &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; que nuestra empresa busca conectar de manera eficaz a los protagosnistas de <br/>
                &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; este servicio, asi como satisfacer de manera óptima sus necesidades.
              </span>
            </v-img>
        </v-flex>
      </v-layout>
    </v-container>


  </div>

  <div>
    <br/><h1 align="center" >Últimas Veterinarias Afiliadas</h1>
  <v-container grid-list>
    <v-layout row wrap>
        <veterinaries-home></veterinaries-home>
    </v-layout >
  </v-container>
  </div>

  <div>
    <br/><h1 align="center" >Testimoniales</h1>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs8 sm4>
          <v-card >
            <v-img src = "../images/us2.jpg" height="350px"></v-img>

            <v-card-title >Josias Fernandez</v-card-title>

            <v-card-text align="justify" class="black--text">
              <span class="blue--text" >Dueño de mascota</span><br><br>
              Este es un corto testimonial del usuario usando nuestra aplicacion, para ello
              asumiremos que tiene una buena impresion de nuestra plataforma
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs8 sm4>
          <v-card  >

            <v-img src = "../images/us1.jpg" height="350px"></v-img>
            <v-card-title>Ernesto Suarez</v-card-title>

            <v-card-text align="justify" >
              <span class="blue--text" >Veterinario principal</span><br><br>
              Este es un corto testimonial del usuario usando nuestra aplicacion, para ello
              asumiremos que tiene una buena impresion de nuestra plataforma
            </v-card-text>

          </v-card>
        </v-flex>

        <v-flex xs8 sm4>
          <v-card>
            <v-img src = "../images/us3.jpg" height="350px"></v-img>

            <v-card-title>Camila Rio Roca</v-card-title>

            <v-card-text align="justify">
              <span class="blue--text" >Dueño de mascota</span><br><br>
              Este es un corto testimonial del usuario usando nuestra aplicacion, para ello
              asumiremos que tiene una buena impresion de nuestra plataforma
            </v-card-text>

          </v-card>
        </v-flex>
      </v-layout>
      <br/><br/><br/>
    </v-container>
  </div>
  <div>
    <h1 align="center">About The Product</h1>
  </div>

  <div>
    <v-container align="center" grid-list-md>
      <v-layout justify-center>
        <iframe width="800" height="500" src="https://www.youtube.com/embed/6MVARCZQeEU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </v-layout>
      <br/><h>Video Referencial del Producto</h>
    </v-container>
    <br/><br/><br/><br/><br/><br/>
  </div>
</div>

  <footer-home/>

  </v-app>
</template>

<script>

import FooterHome from "./footer-home";
import HeaderHome from "./header-home";
<<<<<<< HEAD
import VeterinariesHome from "@/components/profiles/veterinaries-home";
export default {
  name: "home",
  components: {VeterinariesHome, HeaderHome, FooterHome},
=======
export default {
  name: "home",
  components: {HeaderHome, FooterHome},
>>>>>>> 0b5be586f02df676d17eec4dd69377ca68998274
  data(){
  },

}
</script>

<style scoped>

#logoAndButton{
  display: flex;
  flex-direction: row;
}

</style>