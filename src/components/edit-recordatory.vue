<template>
<v-container>
  <v-card >
    <v-card-title>
      <span class="headline">Edit Tutorial</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Tutorial Id"></v-text-field>
          </v-col>
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
</template>

<script>
import RecordatoriesApiService from '../services/recordatories-api.service'
export default {
  name: "edit-recordatory",
  data() {
    return {
      item: {
        id: 0,
        description: '',
      }
    }
  },
  methods: {
    retrieveRecordatory(id) {
      RecordatoriesApiService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      RecordatoriesApiService.update(this.item.id, this.item)
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
  },
  created() {
    this.retrieveRecordatory(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>