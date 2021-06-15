<template>
<div>

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
    <br/><h1 align="center" >Ultimas Veterinarias Afiliadas</h1>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs8 sm4>
        <v-card>
          <v-img src = "../images/vets.jpg" height="450px"></v-img>

          <v-card-title>Mascotas Felices</v-card-title>

          <v-card-text>
            Breve descripcion de la veterinario en cuestion
          </v-card-text>

          <v-card-actions >
            <v-btn color="info" flat> Ver Perfil </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs8 sm4>
        <v-card>
          <v-img src = "../images/vets2.jpg" height="450px"></v-img>

          <v-card-title>DogTor</v-card-title>

          <v-card-text>
            Breve descripcion de la veterinario en cuestion
          </v-card-text>

          <v-card-actions>
            <v-btn color="info" flat> Ver Perfil </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs8 sm4>
        <v-card>
          <v-img src = "../images/vets3.png" height="450px"></v-img>

          <v-card-title>Friendly Pets</v-card-title>

          <v-card-text>
            Breve descripcion de la veterinario en cuestion
          </v-card-text>

          <v-card-actions>
            <v-btn color="info" flat> Ver Perfil </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout >
    <br/><br/><br/>
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
    <v-img src = "../images/a.png" align="center" width="1000px" height="700px" ></v-img>

      </v-layout>
      <br/><h>Video Referencial del Producto</h>
    </v-container>
    <br/><br/><br/><br/><br/><br/>
  </div>
</div>

</template>

<script>
export default {
  name: "Home"
  //
}
</script>

<style scoped>

</style>