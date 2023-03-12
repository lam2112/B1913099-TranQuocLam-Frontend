import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import ContactLogin from "@/views/ContactLogin.vue";
import ContactRegister from "@/views/ContactRegister.vue";
const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/addContacts",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
  },
  {
    path: "/login",
    name: "contact.login",
    component: ContactLogin,
  },
  {
    path: "/register",
    name: "contact.register",
    component: ContactRegister,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
