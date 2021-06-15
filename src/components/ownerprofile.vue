<template>
  <v-card>
    <v-card-title>
      Profile
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-card-table :headers="headers"
                    :items="displayProfiles"
                    class="elevation-1" ref="profileTable">
        <template v-slot:[`profile.actions`]="{ profile }">
          <v-icon small class="mr-2" @click="editProfile(profile)">mdi-pencil</v-icon>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
            </v-card>
          </v-dialog>
        </template>
      </v-card-table>
    </v-card-text>
  </v-card>
</template>

<script>
import OwnerProfileApiService from '../services/owner-profile-api.service';
export default {
  name: "profiles",
  dara(){
    return{
      dialog: false,
      dialogDelete: false,
      headers:[
        {text: 'Id', value:'id'},
        {text: 'Name', value:'name'},
        {text: 'Email', value: 'email'},
        {text: 'Birthday', value: 'birthday'},
        {text: 'Age', value: 'age'},
        {text: 'Occupation', value: 'occupation'}
      ],
      profiles: [],
      displayProfiles: [],
      editedIndex: -1,
      editedProfile: {
        id: 0,
        name: '',
        email: '',
        birthday: '',
        age: 0,
        occupation: ''
      },
      defaultProfile: {
        id: 0,
        name: '',
        email: '',
        birthday: '',
        age: 0,
        occupation: ''
      },
    }
  },
  computed:{
    formTitle(){
      return this.editedIndex === -1 ? 'New Profile' : 'Edit Profile'
    },
  },

  watch:{
    dialog(val){
      val || this.close()
    }
  },
  methods:{
    getDisplayProfile(profile){
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        birthday: profile.birthday,
        age: profile.age,
        occupation: profile.occupation
      }
    },
    editProfile(profile){
      this.editedIndex = this.displayProfiles.indexOf(profile);
      console.log(profile);
      this.editedProfile = this.profiles[this.editedIndex];
      this.dialog = true;
    },
    close(){
      this.dialog = false
      this.$nextTick(()=>{
        this.editedProfile = Object.assign({}, this.defaultProfile)
        this.editedIndex = -1
      })
    },
    save(){
      if (this.editedIndex > -1){
        this.profiles[this.editedIndex] = this.editedProfile;
        this.displayProfiles[this.editedIndex] = this.getDisplayProfile(this.profiles[this.editedIndex]);
        OwnerProfileApiService.update(this.editedProfile.id, this.editedProfile)
            .catch(e => {
              console.log(e);
            });
      }
      this.close()
    },
  },

}
</script>

<style scoped>

</style>