<template>
  <div id="app" class="app">
    <div class="header">
      <h1>Las Delicias Cafetería</h1>
      <nav>
        <button v-if="is_auth" v-on:click="loadHome">Inicio</button>
        <button v-if="is_auth" v-on:click="loadMenu">Menú</button>
        <button v-if="is_auth"  v-on:click="loadProfile">Mi Perfil</button>
        <button v-on:click="loadNosotros">Sobre Nosotros</button>
        <button v-if="is_auth"  v-on:click="logOut">Cerrar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>

    <div class="footer">
      <h2>Misión TIC 2022</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data: function () {
    return {
      is_auth: false,
    };
  },
  components: {},
  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;
      if (this.is_auth == false) this.$router.push({ name: "logIn" });
    },
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },
    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
    loadHome: function () {
      this.$router.push({ name: "home" });
    },
    loadMenu: function () {
      this.$router.push({ name: "menu" });
    },
    loadProfile: function () {
      this.$router.push({ name: "profile" });
    },
    loadNosotros: function () {
      this.$router.push({ name: "nosotros" });
    },
    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
    },
    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.$router.push({ name: "home" });
      this.verifyAuth();
    },
    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
  },
  created: function () {
    this.verifyAuth();
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
body {
  margin: 0 0 0 0;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.header {
  margin: 0;
  padding: 10px;
  height: 40px;
  background-color: #112031;
  color: #D9CAB3;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  text-align: center;
  font-family: 'Courgette', cursive;
}
.header nav {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}
.header nav button {
  font-weight: bold;
  font-size: 18px;
  margin-left: 5px;
  color: #D9CAB3;
  background: #112031;
  padding: 10px 20px;
  border: none;
  font-family: 'Courgette', cursive;
}
.header nav button:hover {
  color: #112031;
  background: #D9CAB3;
  border: 1px solid #112031;
}
.main-component {
  height: calc(100vh - 120px) ;
}
.footer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 60px;
  background-color: #112031;
  color: #D9CAB3;
}
.footer h2 {
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>