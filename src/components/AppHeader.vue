// Thanh tiêu đề trên cùng
<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
      <div>
        <router-link :to="{ name: 'contact.login' }">
          <button class="btn btn-sm btn-success" @click="goToLogin">
            Đăng nhập
          </button>
        </router-link>

        <router-link :to="{ name: 'contact.register' }">
          <button class="btn btn-sm btn-success" @click="goToRegister">
            Đăng ký
          </button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    // Khai báo đưởng link của RouterLink
    goToLogin() {
      this.$router.push({ name: "contact.login" });
    },

    goToRegister() {
      this.$router.push({ name: "contact.register" });
    },
  },
};
</script>
