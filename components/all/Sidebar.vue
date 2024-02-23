<template>
  <div class="sidebar" :class="!isSidebar ? 'sidebar-open' : ''" ref="sidebar">
    <!-- Logo -->
    <div class="logo animate__animated animate__zoomIn">
      <img src="~/assets/img/logo-1.png" />
      <span>Sistem Ma'had</span>
    </div>

    <!-- Menu -->
    <nav class="menu">
      <!-- Menu Utama -->
      <ul>
        <!-- Dashboard -->
        <li
          :class="{
            active: isRouteActive('/'),
            hoverable: !isRouteActive('/'),
          }"
        >
          <nuxt-link
            to="/"
            class="text-decoration-none d-flex align-items-center gap-2 animate__animated animate__fadeInRight"
          >
            <i class="material-icons" :class="{ active: isRouteActive('/') }">
              space_dashboard
            </i>
            <span class="text" :class="{ active: isRouteActive('/') }"
              >Dashboard</span
            >
          </nuxt-link>
          <!-- lengkungan -->
          <div v-if="isRouteActive('/')" class="curved-div-one"></div>
          <div v-if="isRouteActive('/')" class="curved-div-two"></div>
        </li>

        <!-- Help -->
        <li
          :class="{
            active: isRouteActive('/help'),
            hoverable: !isRouteActive('/help'),
          }"
        >
          <nuxt-link
            to="/help"
            class="text-decoration-none d-flex align-items-center gap-2 animate__animated animate__fadeInRight"
          >
            <i
              class="material-icons"
              :class="{ active: isRouteActive('/help') }"
            >
              quiz
            </i>
            <span class="text" :class="{ active: isRouteActive('/help') }"
              >Help</span
            >
          </nuxt-link>
          <!-- lengkungan -->
          <div v-if="isRouteActive('/help')" class="curved-div-one"></div>
          <div v-if="isRouteActive('/help')" class="curved-div-two"></div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import "animate.css";

export default {
  props: ["isSidebar"],
  data() {
    return {
      activeMenu: null, // Menyimpan menu yang sedang aktif (untuk menampilkan sub-menu)
    };
  },
  methods: {
    // Method untuk menampilkan/menyembunyikan sub-menu saat menu utama diklik
    isRouteActive(route) {
      const currentPath = this.$route.path;
      return currentPath === route;
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/sidebar.css);
</style>
