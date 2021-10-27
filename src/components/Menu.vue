<template>
    <h2 class="title">Nuestro Menú</h2>
  <div class="container-menu">
    <div class="table-menu">
      <!-- Tabla de productos en la base de datos -->
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio/u</th>
            <th scope="col">Unidades disponibles</th>
            <!-- Si el usuario logeado es cliente se muestra columna para añadir
            productos al carrito -->
            <th scope="col" v-if="dataUser.rol === 'Cliente'">
              Agregar al carrito
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in menu" :key="item.id">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.nombre }}</td>
            <td>$ {{ item.unitPrice }}</td>
            <td>{{ item.unidadesTotales }}</td>
            <td v-if="dataUser.rol == 'Cliente'">
              <button
                @click="decrement(index)"
                v-bind:disabled="item.unidadesTotales <= 0"
              >
                +
              </button>
              {{ item.count }}
              <button v-if="item.count > 0" @click="increment(index)">-</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Si el usuario es administrador muestra formulario para insertar prodcto -->
    <div v-if="dataUser.rol == 'Admon'">
      <CreateProduct />
      <button class="updateMenu" @click="reloadPage">Actualizar menú</button>
    </div>
    <!-- Si el usuario es cliente se muestra el carrito de compras, se mostrara losproductos que vaya seleccionando -->
    <div v-if="dataUser.rol == 'Cliente'" class="card-total">
      <h3>Carrito de compras:</h3>
      <div class="card-info-total">
        <p v-if="load">Usuario: {{ dataUser.name }}</p>
        <p v-if="load">Items totales añadidos: {{ productoTotal }}</p>
        <p v-if="load">Precio total de su pedido: {{ sumaProductos }}</p>
        <p v-if="load">Lista de productos</p>
        <p v-if="load" v-show="false">{{ carrito }}</p>
        <ul v-for="item in listaTotal" :key="item.nombre">
          <li>{{ item.nombre }} x {{ item.cantidad }}</li>
        </ul>
      </div>      
      <!-- Muestra lista de productos -->
      <button class="updatePedido" @click="processOrder">
        Realizar pedido
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
import CreateProduct from "./CreateProduct.vue";
export default {
  name: "Menu",
  data: function () {
    return {
      menu: null,
      load: false,
      dataUser: "",
      order: {
        cantidad: 0,
        totalPrice: 0,
        idUsuario: 0,
        listProduct: null,
      },
      listItem: [],
      listaTotal: [],
      unique: [],
      productosMinimos: []      
    };
  },
  components: {
    CreateProduct,
  },
  computed: {
    // Suma precios y muestra precio total de la orden
    sumaProductos: function () {
      let suma = 0;
      for (let menu of this.menu) {
        suma += menu.count * menu.unitPrice;
        this.order.totalPrice = suma;
      }
      return "$ " + suma + " CO";
    },
    // Muestra la cantidad de productos añadidos al carrito
    productoTotal: function () {
      let sumaProd = 0;
      for (let menu of this.menu) {
        sumaProd += menu.count;
        this.order.cantidad = sumaProd;
      }
      return sumaProd;
    },
    // Muestra lista de productos y cantidad de cada uno
    carrito: function () {
      this.unique = [
        ...new Map(this.listItem.map((item) => [item["id"], item])).values(),
      ];
      this.listaTotal = this.unique.map((producto) => ({
        nombre: producto.nombre,
        cantidad: producto.count,
      }));
      this.order.listProduct = this.unique.map((producto) => ({
        idProducto: producto.id,
        cantidad: producto.count,
      }));
      return this.listaTotal;
    },
  },
  // Cada que carga la pagina se ejecutan estos metodos
  mounted() {
    this.getDataUser();
    this.load = true;
  },
  methods: {
    reloadPage(){
      this.$router.go(0);
    },
    processOrder: function () {
      let dataProduct = Object.assign({}, this.unique);
      let dataProductList = Object.assign({}, this.order);
      if(dataProductList.cantidad !== 0){
        axios
        .post("https://cafeteria-tc3.herokuapp.com/order/", dataProductList, {
          headers: {},
        })
        .then(() => {
          alert('Orden registrada correctamente')
          this.reloadPage()
        })
        .catch((e) => console.log(e));     

        for (let prod in dataProduct) {
          axios
            .put(
              "https://cafeteria-tc3.herokuapp.com/productUpdate/",
              dataProduct[prod]
            )
            .then(() => {
              this.reloadPage();
            })
            .catch((e) => console.log(e));
        }
      }else{
        alert('Agrege al menos un producto al carrito')
      }
    },
    getDataUser: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();

      axios
        .get(`https://cafeteria-tc3.herokuapp.com/user/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        .then((result) => {
          this.dataUser = result.data;
          this.order.idUsuario = result.data.id;
          this.getMenu();
        })
        .catch((e) => console.log(e));
    },
    verifyToken: function () {
      return axios
        .post(
          "https://cafeteria-tc3.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch((e) => console.log(e));
    },

    getMenu() {
      axios
        .get("https://cafeteria-tc3.herokuapp.com/menu/")
        .then((response) => {
          this.menu = response.data;
          for(let item in this.menu){
            if(this.menu[item].unidadesTotales <= 10){
              this.productosMinimos.push([this.menu[item].nombre, this.menu[item].unidadesTotales])
            }
          }
          if(this.productosMinimos.length> 0 && this.load && this.dataUser.rol === 'Admon'){
            alert(`Actualice su inventario, los siguientes productos tienen cantidades mínimas: ${this.productosMinimos}`)
          }
          this.menu.forEach((element) => {
            element.count = 0;
          });
        })
        .catch((e) => {
          console.log(e);
        });
      
    },
    increment(index) {
      this.menu[index].unidadesTotales++;
      this.menu[index].count--;
      this.listProduct(this.menu[index]);
    },
    decrement(index) {
      if (this.menu[index].unidadesTotales == 0) return;
      this.menu[index].unidadesTotales--;
      this.menu[index].count++;
      this.listProduct(this.menu[index]);
    },
    listProduct(producto) {
      this.listItem.push(producto);
    },
  },
};
</script>
<style>
.title{
  margin: 0;
  padding-top: 30px;
  text-align: center;
  font-family: 'Courgette', cursive;
  font-size: 30px;
}
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
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
.updateMenu{
  width: 85%;
  height: 30px;
  margin-top: 10px;
  margin-left: 60px;
  border: none;
  color: #D9CAB3;
  border-radius: 5px;
  background-color: #112031;
  box-shadow: 1px 1px 5px black;
  font-family: 'Courgette', cursive;
  font-weight: lighter;
}
.updateMenu:hover {
  background-color: #345B63;
  color: #D9CAB3;
}

.updatePedido {
  width: 100%;
  height: 30px;
  border: none;
  color: #D9CAB3;
  border-radius: 5px;
  background-color: #112031;
  box-shadow: 1px 1px 5px black;
}
.updatePedido:hover{
  background-color: #345B63;
  color: #D9CAB3;
}

.container-menu {
  max-height: 400px;
  display: flex;
  justify-content: left;
  padding: 20px 50px 50px 50px;
}
.container-menu .table-menu {
  height: 400px;
  width: 60%;
  overflow-y: scroll;
  border-radius: 5px;
  border: 2px  solid #112031;
}
.container-menu .card-total {
  margin-left: 50px;
  width: 25%;
  padding: 20px;
    border: 2px  solid #112031;

  border-radius: 5px;
}
.container-menu .card-info-total{
  height: 250px;
  margin-bottom: 10px;
  overflow-y: scroll;
}
.container-menu .card-total h3 {
  margin: 0;
  margin-bottom: 20px;
}
</style>


