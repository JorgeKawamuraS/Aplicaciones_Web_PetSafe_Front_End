<template>
  
  <v-card class="cont">
    <v-card-title>PROFILE</v-card-title>
      <div class="img-profile">
        <img class="img-user" src="../assets/vet.png">
      </div>


      <div class="data">
        <div>
          <h3>Firstname</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Lastname</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Cellphone</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Email</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Gender</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Description</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Birth Date</h3>
          <!-- atributos de vet -->
          <h4>{{}}</h4>
        </div>

        <div>
          <h3>Created</h3>
          <!--  vet -->
          <h4>{{}}</h4>
        </div>

      </div>

      <v-btn class="btn-edit" color="primary"> Edit <span class="material-icons"></span> </v-btn>
    
  </v-card>

  
</template>



<script>
export default {
  name: 'Profile'
}
</script>


<style>
.cont{
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 50px;
}
.img-profile{
    text-align: center;
    margin-bottom: 10px;
   
}


.btn-edit{
    float: right;
}
.img-user{
    width:300px;
    height:300px;
    border-radius:150px;
}

h3{
    font-size: 20px;
    background-color: #F1F2F8;
    
}

.data{
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20px;
    column-gap: 5px;
}
</style>