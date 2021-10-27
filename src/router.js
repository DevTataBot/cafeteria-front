import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import LogIn from "./components/LogIn.vue";
import SignUp from "./components/SignUp.vue";
import Home from "./components/Home.vue";
import Menu from "./components/Menu.vue";
import Profile from "./components/Profile.vue";
import Nosotros from "./components/Nosotros.vue";
const routes = [
  {
    path: "/",
    name: "root",
    component: App,
  },
  {
    path: "/user/logIn",
    name: "logIn",
    component: LogIn,
  },
  {
    path: "/user/signUp",
    name: "signUp",
    component: SignUp,
  },
  {
    path: '/user/menu',
    name: "menu",
    component: Menu
  },
  {
    path: '/user/home',
    name: "home",
    component: Home
  },
  {
    path: '/user/profile',
    name: "profile",
    component: Profile
  },
  {
    path: '/nosotros',
    name: "nosotros",
    component: Nosotros
  },
  
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
