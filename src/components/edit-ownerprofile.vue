<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="profile.id" label="Profile Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="profile.name" label = "Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="profile.email" label = "Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="profile.birthday" label = "Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="profile.occupation" label = "Name"></v-text-field>
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
</template>

<script>
import OwnerProfileApiService from "@/services/owner-profile-api.service";

export default{
  name: "edit-ownerProfile",
  data() {
    return {
      profile: {
        id: 0,
        name: '',
        email: '',
        birthday: '',
        age: 0,
        occupation: ''
      }
    }
  },
  methods: {
    retrieveProfile(id){
      OwnerProfileApiService.get(id)
          .then((response)=>{
            this.profile = response.data;
          })
          .catch(e=>{
            console.log((e));
          })
    },
    save(){
      OwnerProfileApiService.update(this.profile.id,this.profile)
          .then(() => {
            this.navigateToProfiles();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToProfiles();
    },
    navigateToProfiles(){
      this.$router.push({name: 'profiles'});
    }
  },
  created(){
    this.retrieveProfile(this.$route.params.id);
  }
}


</script>

<style scoped>

</style>