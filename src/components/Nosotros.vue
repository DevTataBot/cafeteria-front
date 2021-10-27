<template>
  <h2 class="title">Nosotros</h2>
  <div class="nosotros">
    <div class="img_nosotros">
      <img
        class="img0"
        src="https://images.pexels.com/photos/5825346/pexels-photo-5825346.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="nosotros"
      />
    </div>
    <div class="nosotros-descripcion">
      <p>
        Las Delicias Cafetería es nuestra tienda on-line en la que ofrecemos
        nuestro portfolio de productos. Disponemos de variedad de productos
        para que cada uno pueda elegir el más adecuado e idoneo a su perfil
        y a sus gustos. Fundada en 2021 en Bogotá, buscamos posicionarnos entre 
        las mejores cafeterías a nivel nacional. En este momento, contamos con un
        equipo de más de 50 profesionales involucrados en el proyecto Las Delicias
        Cafetería y nuestra intención es continuar la expansión, tanto en el 
        ámbito nacional como en el internacional.
      </p>
    </div>
    <div class="nosotros-info">
      <div>
        <h3>NUESTROS HORARIOS</h3>
        <p>Lunes - Viernes -------------------------- 6:00AM - 7:00PM</p>
        <p>Sábados - Domingos - Festivos------- 7:00AM - 5:00PM</p>
      </div>
      <div>
        <h3>NUESTRAS SEDES</h3>
        <p>Bogotá - Av. Calle 53 y Av. Esmeralda</p>
        <p>Medellín - Cl. 9 #39-2 a 39-32</p>
        <p>Santa Marta - Cra. 1 #9-23</p>
      </div>
      <div>
        <h3>CONTACTO</h3>
        <p>Teléfono: 3010000000</p>
        <p>cafeteria@lasdelicias.com</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "Nosotros",
  data: function () {
    return {
      dataUser: "",
      dataOrder: "",
    };
  },
  mounted() {
    this.getDataUser();
    this.load = true;
  },
  methods: {
    getOrdersByUser: function () {
      axios
        .get(
          `https://cafeteria-tc3.herokuapp.com/getOrdersByUser/${this.dataUser.id}/`
        )
        .then((response) => {
          this.dataOrder = response.data;
        })
        .catch((e) => console.log(e));
    },
    getAllOrders() {
      axios
        .get("https://cafeteria-tc3.herokuapp.com/getAllOrders/")
        .then((response) => {
          this.dataOrder = response.data;
        })
        .catch((e) => console.log(e));
    },
    getDataUser: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        return;
      }
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      axios
        .get(`https://cafeteria-tc3.herokuapp.com/user/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.dataUser = result.data;
          if (this.dataUser.rol === "Cliente") {
            this.getOrdersByUser();
          } else if (this.dataUser.rol === "Admon") {
            this.getAllOrders();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.title {
  margin: 0;
  padding-top: 30px;
  text-align: center;
  font-family: "Courgette", cursive;
  font-size: 30px;
}
.nosotros {
  margin: 0;
  padding: 0;
  height: 90%;
  width: 100%;
  display: grid;
  grid-template-columns: 25% 30% 30%;
  justify-content: center;
  align-items: center;
}
h3 {
  font-family: "Courgette", cursive;
}
.img_nosotros {
  width: 100%;
  height: 420px;
}
.img_nosotros .img0 {
  height: 420px;
  box-shadow: 5px 5px 10px black;
}
.nosotros-info {
    margin-left: 50px;
  height: 420px;
}
.nosotros-descripcion p{
    text-align: justify;
  font-family: "Courgette", cursive;
    font-weight: lighter;
    font-size: 18px;
}
</style>