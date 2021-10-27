<template>
  <div class="greetings">
    <div class="home_text">
      <h1>
        ¡Bienvenido a nuestro mundo de sabores <span> {{ username }} </span>!
      </h1>
    </div>
    <div class="img_home">
      <img class="img0" src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=726&q=80" alt="coffe">
      <div class="img1">
        <img class="img2" src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmFrZXJ5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="coffe">
        <img class="img3" src="https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGJha2VyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="coffe">
      </div>      
    </div>
  </div>
  
</template>
<script>
export default {
  name: "Home",
  data: function () {
    return {
      username: localStorage.getItem("username") || "none"
    };
  },
};
</script>

<style>
.greetings {
  margin: 0;
  padding:0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home_text{
  width: 35%;
}
.greetings h1 {
  font-size: 50px;
  color: #283747;
  font-family: 'Courgette', cursive;
}
.greetings span {
  color: #283747;
  font-weight: bold;
}
.img_home{
  display: grid;
  width: 55%;
  height: 300px;
  grid-template-columns: repeat(2, 1fr);
  box-shadow: 5px  5px 10px black;
}
.img_home .img0{
  height: 300px;
  grid-column: 1;
}
.img_home .img1{
  display: flex;
  flex-direction: column;
  height: 300px;
  grid-column: 2;
}
.img_home .img2{
  height: 150px;
}
.img_home .img3{
  height: 150px;
}
</style>