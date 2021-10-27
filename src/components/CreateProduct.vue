<template>
  <div class="registerProduct">
    <div class="container_registerProduct">
      <h2>Panel de productos</h2>
      <div>
        <span class="info">Inrese ID únicamente si va a actualizar productos</span>
        <input
          type="text"
          v-model="idProduct"
          placeholder="ID Producto"
        />
        <br />
        <input
          type="text"
          v-model="product.nombre"
          placeholder="Nombre del producto"
        />
        <br />
        <input
          type="number"
          v-model="product.unitPrice"
          placeholder="Precio unitario"
        />
        <br />
        <input
          type="number"
          v-model="product.unidadesTotales"
          placeholder="Unidades totales"
        />
        <br />
        <div class="btns">
          <button @click="processRegister">Registrar producto</button>
          <button @click="updateProduct">Actualizar producto</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CreateProduct",
  data: function () {
    return {
      product: {
        nombre: "",
        unitPrice: "",
        unidadesTotales: "",
      },
      idProduct:'',
    };
  },
  methods: {
    updateProduct: function(){
      this.product.id = this.idProduct
      if(this.product.id  && this.product.nombre && this.product.unitPrice && this.product.unidadesTotales){
        axios
          .put(
            "https://cafeteria-tc3.herokuapp.com/productUpdate/",
            this.product
          )
          .then(() => {
            alert('Actualización exitosa, actualice el menú')
          })
          .catch((e) => console.log(e));
      }else{
        alert('No puede actualizar un producto sin referenciar su ID')
        alert('No puede dejar ningun campo vacio')
      }
    },
    processRegister: function () {
      if(!this.idProduct && this.product.nombre && this.product.unitPrice && this.product.unidadesTotales){
        axios
        .post("https://cafeteria-tc3.herokuapp.com/product/", this.product, {
          headers: {},
        })
        .then(() => {
          alert("Produdcto registrado éxitosamente, actualice el menú");
        })
        .catch(() => {
          alert("ERROR: Fallo en el registro del producto.");
        });
      }else{
        alert('Elimine la información del campo ID del producto para su creación')
        alert('Debe suministrar nombre, precio y unidades totales')
      }
    },
  },
};
</script>
<style>
.container_registerProduct {
  margin-left: 60px;
  width: 90%;
  background-color: #112031;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px black;
}
.registerProduct h2 {
  color: #d9cab3;
  font-family: 'Courgette', cursive;
}
.registerProduct div {
  width: 85%;
}
.registerProduct input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
}

.info{
  color: #D9CAB3
}
.registerProduct select {
  width: 100%;
  height: 40px;
  background-color: #fff;
  border: 1px solid #d9cab3;
  margin: 5px 0;
}
.btns{
  min-width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: space-evenly;
}
.registerProduct button {
  width: 100%;
  height: 40px;
  color: #112031;
  background: #d9cab3;
  border-radius: 5px;
  margin-right: 5px;
  border: none;
  font-family: 'Courgette', cursive;
  font-weight: lighter;
}
.registerProduct button:hover {
  color: #d9cab3;
  background: #345b63;
}
</style>