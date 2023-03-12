
<template>
  <div class="page">
    <h4>Đăng nhập</h4>
    <RegisterForm
      :infoRegister="infoRegister"
      @submit:infoRegister="register"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

import UserService from "@/services/user.service.js";
export default {
  components: {
    RegisterForm,
  },


  data() {
    return {
      infoRegister: {
        userName:"",
        password:"",
      },
      message: "",
    };
  },
  methods: {
    async register(data) {
      try {
        const res = await UserService.register(data);

      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.message = "";
  },
};
</script>
