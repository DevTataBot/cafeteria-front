<template>
  <div class="signUp_user">
    <div class="img_signIn">
      <img class="img0" src="https://cdn.pixabay.com/photo/2016/11/29/05/07/breads-1867459_960_720.jpg" alt="coffe">
      <div class="img1">
        <img class="img2" src="https://cdn.pixabay.com/photo/2021/07/23/09/32/bread-6486963_960_720.jpg" alt="coffe">
        <img class="img3" src="https://cdn.pixabay.com/photo/2015/03/26/09/46/donuts-690281_960_720.jpg" alt="coffe">
      </div>      
    </div>
    <div class="container_signUp_user">
      <h2>Registrarse</h2>
      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Username" />
        <br />
        <input type="password" v-model="user.password" placeholder="Password" />
        <br />
        <input type="text" v-model="user.name" placeholder="Name" />
        <br />
        <input type="email" v-model="user.email" placeholder="Email" />
        <br />
        <select name="select" v-model="user.rol" >
          <option value="" disabled>--Rol--</option>
          <option value="Cliente">Cliente</option>
          <option value="Admon" selected>Administrador</option>
        </select>
        <br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SignUp",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        email: "",
        rol:""
      },
    };
  },
  methods: {
    processSignUp: function () {
      if(this.user.username && this.user.password && this.user.name && this.user.email && this.user.rol){
        axios
          .post("https://cafeteria-tc3.herokuapp.com/user/", this.user, {
            headers: {},
          })
          .then((result) => {
            let dataSignUp = {
              username: this.user.username,
              token_access: result.data.access,
              token_refresh: result.data.refresh,
            };
  
            this.$emit("completedSignUp", dataSignUp);
          })
          .catch((error) => {
            console.log(error);
  
            alert("ERROR: Fallo en el registro.");
          });
      }else{
        alert('Formulario incompleto')
      }
    }  
  },
};
</script>
<style>

.signUp_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_signUp_user {
  background-color: #112031;
  border-radius: 10px;
  width: 25%;
  height: 350px  ;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px black;
}
.signUp_user .img_signIn{
  display: grid;
  width: 60%;
  height: 350px;
  grid-template-columns: repeat(2, 1fr);
  margin-right: 30px;
  box-shadow: 5px  5px 10px black;
}
.img_signIn .img0{
  height: 350px;
  grid-column: 1;
}
.img_signIn .img1{
  display: flex;
  flex-direction: column;
  height: 350px;
  grid-column: 2;
}
.img_signIn .img2{
  height: 175px;
}
.img_signIn .img3{
  height: 175px;
}
.signUp_user h2 {
  font-family: 'Courgette', cursive;
  color: #D9CAB3  ;
}
.signUp_user form {
  width: 70%;
}
.signUp_user input {
  height: 30px  ;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
}

.signUp_user select {
  width: 100%;
  height: 30px  ;
  background-color: #fff;
  margin: 5px 0;
  border: 1px solid #D9CAB3  ;
}
.signUp_user button {
  font-family: 'Courgette', cursive;
  width: 100%;
  height: 30px;
  color: #112031  ;
  background: #D9CAB3  ;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
  border: none  ;
}
.signUp_user button:hover {
  color: #D9CAB3  ;
  background: #345B63  ;
}
</style>