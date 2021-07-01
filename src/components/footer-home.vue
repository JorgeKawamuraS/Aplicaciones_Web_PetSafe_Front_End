<template>
  <footer>
    <div class="top_footer"></div>
    <div class="contenedor">
      <div class="center_footer">
        <div>
          <div class="div-seccion-footer">
            <a class="p-titulo-footer" href="https://petsafefrontend.web.app/">HOME</a>
            <a class="p-titulo-footer" href="https://jorgekawamuras.github.io/Aplicaciones_Web_Landing_Page/AboutUs.html">SOBRE NOSOTROS</a>
            <a class="p-titulo-footer" href="https://jorgekawamuras.github.io/Aplicaciones_Web_Landing_Page/Help.html">AYUDA</a>
          </div>
          <div class="div-seccion-footer">
            <p class="p-titulo-footer">INFO</p>
            <a class="p-cont-footer" href="#">FAQ</a>
            <a class="p-cont-footer" href="#">Políticas de privacidad</a>
            <a class="p-cont-footer" href="#">Métodos de pago</a>
            <a class="p-cont-footer" href="#">Términos y condiciones</a>
          </div>
        </div>
        <div>
          <div class="div-seccion-footer">
            <p class="p-titulo-footer">ATENCION AL CLIENTE</p>
            <p class="p-cont-footer">(01) 292 - 2525 /292-4565</p>
            <p class="p-cont-footer">1-8000-000-0000</p>
            <p class="p-cont-footer">HuellitasSeguras@petsafe.com</p>
          </div>
          <div class="div-seccion-footer">
            <p class="follow">SIGUENOS</p>
            <div>
              <v-btn icon color="white"><v-icon>mdi-facebook</v-icon></v-btn>
              <v-btn icon color="white"><v-icon>mdi-instagram</v-icon></v-btn>
              <v-btn icon color="white"><v-icon>mdi-twitter</v-icon></v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_footer">
      <p>&copy; Todos los derechos reservados</p>
    </div>
  </footer>

</template>

<script>
export default {
  name: "footer-home",

  data(){
    return {
      icons: [
        'fab fa-instagram',
        'fab fa-facebook',
        'fab fa-twitter'
      ],
      links: [
        'Home',
        'About Us',
        'Payment methods',
        'Services',
        'Help',
        'Terms and Conditions',
        'Contact Us'
      ]
    }
  }
}
</script>

<style scoped>

@media screen and (max-width:950px){
  footer{
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  footer>.contenedor{
    height: 100%;
  }
  .center_footer{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .center_footer>div{
    width: 100%;
    height: 45%;
  }
}

@media screen and (min-width:950px){
  .center_footer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .center_footer>div{
    width: 45%;
  }
}

footer{
  padding: 2.5rem 0;
  color: white;
  font-family: Arial Rounded MT;
  text-align: center;
  background-color: #8E8E8E; /*#959595*/  /*#6b6b6b*/
}

footer > .contenedor{
  width: 75%;
}

.center_footer{
  padding-bottom: 40px;
}

.center_footer>div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.div-seccion-footer{
  display: flex;
  flex-direction: column;
  text-align: left;
}

.div-seccion-footer > a {
  text-decoration: none;
  color: white;
  margin-top: 10px;
}

.p-titulo-footer{
  font-weight: bold;
}

.p-cont-footer{
  margin-top: 10px;
  font-weight: lighter;
}

.follow{
  margin-left: 8%;
  font-weight: bold;
}

.div-seccion-footer > div{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}

.contenedor{
  width: 100%;
  max-width: 90%;
  margin: auto;
}


</style>