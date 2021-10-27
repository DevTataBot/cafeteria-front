<template>
  <h2 class="title">Mi Perfil</h2>
  <div class="profile">
    <div class="user-information">
      <img src="../assets/user.jpg" alt="" />
      <!-- <a href='https://www.freepik.es/vectores/personas'>Vector de Personas creado por pikisuperstar - www.freepik.es</a> -->
      <p class="label">Nombre:</p>
      <span>{{ dataUser.name }}</span>
      <p class="label">UserName:</p>
      <span>{{ dataUser.username }}</span>
      <p class="label">Email:</p>
      <span>{{ dataUser.email }}</span>
      <p class="label">Rol:</p>
      <span>{{ dataUser.rol }}</span>
    </div>
    <div class="orders-information">
      <div v-if="dataUser.rol === 'Admon'" class="inventario">
        <h3>INVENTARIO</h3>
        <p>
          <img class="img-user" src="../assets/mug-hot-solid.svg" /> Total de
          productos vendidos:
        </p>
        <li>{{ cantidadProductos }}</li>
        <p>
          <img class="img-user" src="../assets/money-bill-1-wave-solid.svg" />
          Monto total acumulado:
        </p>
        <li>{{ monto }}</li>
        <p>
          <img class="img-user" src="../assets/users-solid.svg" /> Número de
          clientes
        </p>
        <li>{{ cantidadClientes.length }}</li>
      </div>
      <div class="user-order">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Precio total de factura</th>
              <th scope="col">Cantidad total de productos</th>
              <th scope="col">ID Usuario</th>
              <th scope="col">Fecha de facturación</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataOrder" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>$ {{ item.totalPrice }}</td>
              <td>{{ item.cantidad }}</td>
              <td>{{ item.idUsuario }}</td>
              <td>
                {{
                  new Date(item.dateOrder).getFullYear() +
                  "-" +
                  (new Date(item.dateOrder).getMonth() + 1) +
                  "-" +
                  new Date(item.dateOrder).getDate()
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "Profile",
  data: function () {
    return {
      dataUser: "",
      load: false,
      dataOrder: "",
      monto: 0,
      cantidadProductos: 0,
      cantidadClientes: 0,
    };
  },
  mounted() {
    this.getDataUser();
    this.load = true;
  },
  methods: {
    getOrdersByUser() {
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
          this.inventario();
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
    inventario() {
      let listUsers = [];
      let montoNoFormat = 0;
      let options = { style: "currency", currency: "COP" };
      var numberFormat = new Intl.NumberFormat("co-CO", options);
      for (let item in this.dataOrder) {
        montoNoFormat += parseInt(this.dataOrder[item].totalPrice);
        this.monto = numberFormat.format(montoNoFormat);
        this.cantidadProductos += this.dataOrder[item].cantidad;
        listUsers.push(this.dataOrder[item].idUsuario);
        this.cantidadClientes = [...new Set(listUsers)];
      }
    },
  },
};
</script>

<style>
.title {
  margin: 0;
  padding-top: 25px;
  text-align: center;
  font-family: "Courgette", cursive;
  font-size: 30px;
}
.profile {
  margin: 0;
  padding: 0;
  height: 90%;
  width: 100%;
  display: grid;
  grid-template-columns: 20% 65%;
  column-gap: 70px;
  justify-content: center;
  align-items: center;
}
.profile .user-information {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 360px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px black;
  border: 2px solid #112031;
  padding: 20px;
}
h3 {
  font-size: 24px;
  margin: 0;
  font-family: "Courgette", cursive;
  text-align: center;
  background-color: #bde0cd;
  border-radius: 5px;
}
.inventario p {
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 14px;
}
.inventario span {
  font-weight: lighter;
}
.img-user {
  height: 20px;
}
.profile .user-information img {
  display: flex;
  margin: auto;
  width: 120px;
}
.profile .user-information .label {
  font-weight: bold;
  margin-bottom:.5px;
  padding: 0;
  text-align: center;
  font-family: "Courgette", cursive;
  background-color: #bde0cd;
  border-radius: 3px;
}
.profile .user-information span {
  font-weight: normal;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.profile .orders-information {
  display: flex;
  width: 100%;
  height: 400px;
}
.profile .inventario {
  max-height: 400px;
  padding: 20px;
  width: 45%;
  border-radius: 5px;
  border: 2px solid #112031;
  box-shadow: 1px 1px 5px black;
}
.profile .user-order {
  height: 395px;
  width: 100%;
  overflow-y: scroll;
  margin-left: 20px;
  border-radius: 5px;
  border: 2px solid #112031;
  box-shadow: 1px 1px 5px black;
}
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  overflow-y: scroll;
}

th,
td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}
</style>