<template>
  <div>
    <!-- profil desc -->
    <div class="profil-description">
      <h1 class="text-white fw-semibold mb-2 text-capitalize">
        {{ $auth.user.name }}
      </h1>
      <p class="text-white fw-light mb-4 text-capitalize">
        {{ $auth.user.role.split(',').join(', ') }}
      </p>
      <hr class="text-white" />
    </div>

    <!-- menu profile -->
    <nav class="menu">
      <!-- Menu Utama -->
      <ul>
        <!-- Profil -->
        <li>
          <nuxt-link to="/user/profile" class="text-decoration-none d-flex align-items-center gap-2">
            <i class="bx bx-user"></i>
            <span class="text">Profile</span>
          </nuxt-link>
        </li>
        <!-- Change Password -->
        <li>
          <nuxt-link to="/user/password" class="text-decoration-none d-flex align-items-center gap-2">
            <i class="bx bx-lock-alt"></i>
            <span class="text">Change Password</span>
          </nuxt-link>
        </li>
        <!-- Help -->
        <li>
          <nuxt-link to="/help" class="text-decoration-none d-flex align-items-center gap-2">
            <i class="bx bx-help-circle"></i>
            <span class="text">Help</span>
          </nuxt-link>
        </li>
        <hr class="text-white" />
        <!-- Logout-->
        <li>
          <a href="javascript:;" @click="logout" class="text-decoration-none d-flex align-items-center gap-2">
            <i class="bx bx-door-open"></i>
            <span class="text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$cookies.remove("AccessToken");
      localStorage.removeItem("program");
      localStorage.removeItem("subject")
      this.$store.commit("index/removeAll");
      this.$store.commit("navbar/removeUnit")
      this.$auth.logout();
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/profile.css);
</style>
