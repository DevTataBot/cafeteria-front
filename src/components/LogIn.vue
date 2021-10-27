<template>
  <div class="logIn_user">
    <div class="img_logIn">
      <img class="img0" src="https://cdn.pixabay.com/photo/2021/07/13/18/58/coffee-6464307_960_720.jpg" alt="coffe">
      <div class="img1">
        <img class="img2" src="https://cdn.pixabay.com/photo/2017/04/25/08/02/coffee-beans-2258839_960_720.jpg" alt="coffe">
        <img class="img3" src="https://cdn.pixabay.com/photo/2013/11/05/23/55/coffee-206142_960_720.jpg" alt="coffe">
      </div>      
    </div>
    <div class="container_logIn_user">
      <h2>Iniciar sesión</h2>
      <form v-on:submit.prevent="processLogInUser">
        <input type="text" v-model="user.username" placeholder="Username" />
        <br />
        <input type="password" v-model="user.password" placeholder="Password" />
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LogIn",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    processLogInUser: function () {
      if(this.user.username && this.user.password){
        axios
        .post("https://cafeteria-tc3.herokuapp.com/login/", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };

          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Credenciales Incorrectas.");
        });
      }else{
        alert('Credenciales incompletas')
      }   
    },
  },
};
</script>
<style>
.logIn_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_logIn_user {
  background-color: #112031;
  border-radius: 10px;
  width: 25%;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px black;
}
.logIn_user .img_logIn{
  display: grid;
  width: 60%;
  height: 350px;
  grid-template-columns: repeat(2, 1fr);
  margin-right: 30px;
  box-shadow: 5px  5px 10px black;
}
.img_logIn .img0{
  height: 350px;
  grid-column: 1;
}
.img_logIn .img1{
  display: flex;
  flex-direction: column;
  height: 350px;
  grid-column: 2;
}
.img_logIn .img2{
  height: 175px;
}
.img_logIn .img3{
  height: 175px;
}
.logIn_user h2 {
  font-family: 'Courgette', cursive;
  color: #D9CAB3;
}
.logIn_user form {
  width: 70%;
}
.logIn_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #D9CAB3;
}
.logIn_user button {
  font-family: 'Courgette', cursive;
  width: 100%;
  height: 40px;
  color: #112031;
  background: #D9CAB3;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
  border: none;
}
.logIn_user button:hover {
  color: #D9CAB3;
  background: #345B63;
}
</style>