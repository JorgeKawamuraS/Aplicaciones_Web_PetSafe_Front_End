<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>
          <span class="headline">Add Tutorial</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.description" label="Description"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>

</template>

<script>
import RecordatoriesApiService from '../services/recordatories-api.service'
export default {
  name: "add-recordatory",
  data() {
    return {
      item: {
        id: 0,
        description: '',
      }
    }
  },
  methods: {

    save() {
      RecordatoriesApiService.create(this.item)
          .then(() => {
            this.navigateToRecordatories();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToRecordatories();
    },
    navigateToRecordatories() {
      this.$router.push({name: 'recordatories'});
    }
  }
}
</script>

<style scoped>

</style>