<template>

  <v-footer
      height="auto"

  >
    <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-xs-center"
        align="center"
    >
      <v-card-text align="center">
        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon

        >
          <v-icon size="24px" >{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, beatae cum deleniti eaque eius esse, exercitationem ipsa laudantium maiores modi molestias omnis pariatur quidem quisquam quos tempore temporibus, tenetur vitae!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cumque eaque earum expedita illum, impedit inventore iusto odio perferendis quos. Atque commodi culpa, ipsa itaque libero nisi quibusdam quidem quis.
      </v-card-text>
      <v-layout justify-center
      >
            <v-btn
                v-for="link in links"
                :key="link"
                text
                flat
                round
                align="center"
            >

              {{ link }}
            </v-btn>
      </v-layout>
      <v-divider></v-divider>

      <v-card-text class="white--text" align="center">
        &copy;2021 — <strong>Todos los derechos reservados</strong>
      </v-card-text>
    </v-card>
  </v-footer>

</template>

<script>
export default {
  name: "Footer",

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

</style>