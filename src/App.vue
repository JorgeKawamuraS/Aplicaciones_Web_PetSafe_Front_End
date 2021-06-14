<template>
  <v-app id="inspire">
    <v-card
        class="mx-auto overflow-hidden"
        height="100%"
        width="100%"
    >
      <v-app-bar
          color="blue"
          dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>PetSafe</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
      >
        <v-list
            nav
            dense
        >
          <template>
            <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Perfil</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title :to="{name: 'MisMascotas'}">
                  Mis Mascotas
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Agenda</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Recordatorios</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Veterinarios</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Mapa</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Tratamientos</v-list-item-title>
              </v-list-item>

            </v-list-item-group>
          </template>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-main>
      <MisMascotas/>
    </v-main>

  </v-app>
</template>

<script>

import MisMascotas from "@/components/MisMascotas";

export default {
  name: 'App',
  components: {MisMascotas},
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>
