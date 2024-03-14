<template>
  <main>
    <Sidebar :isSidebar="isSidebar" />
    <!-- menu mobile  -->
    <div class="menu-mobile" :class="!isSidebar ? 'menu-mobile-open' : ''">
      <div
        class="logo justify-content-between animate__animated animate__zoomIn"
      >
        <img src="~/assets/img/logo-1.png" />
        <span @click="toggleSidebar">
          <i v-if="isSidebar" class="bx bx-menu-alt-right"></i>
          <i v-else class="bx bx-window-close"></i>
        </span>
      </div>
    </div>

    <!-- content -->
    <div class="content" :class="!isSidebar ? 'fix' : ''">
      <!-- <div class="animate__animated animate__fadeInUp"> -->
      <Navbar />
      <hr class="mb-4" />
      <!-- </div> -->
      <div class="position-relative">
        <nuxt />
      </div>
    </div>

    <div class="overlay" v-if="!isSidebar"></div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isSidebar: true,
    };
  },

  methods: {
    toggleSidebar() {
      this.isSidebar = !this.isSidebar;
    },
  },
};
</script>

<style>
@import url(~/assets/css/reset.css);
@import url(~/assets/css/style.css);
main {
  background-color: #176b87;
  padding-left: 208px;
}
.content {
  background: #f1f5f9;
  min-height: 100vh;
  padding: 10px 20px;
}

/* khusus  */
@media screen and (min-width: 576px) {
  .menu-mobile {
    display: none;
  }
}
@media screen and (max-width: 1200px) {
  main {
    padding-left: 68px;
  }
}

/* mobile */
@media screen and (max-width: 576px) {
  main {
    padding-left: 0;
    padding-top: 20px;
  }
  .content {
    margin-top: 50px;
  }
  .overlay {
    /* Gaya untuk overlay */
    content: "";
    background-color: rgba(0, 0, 0, 0.615);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    height: max-content;
    width: 100vh;
    height: 100vh;
  }

  .menu-mobile {
    position: fixed;
    top: 0;
    z-index: 88;
    width: 100%;
    padding: 0 20px;
    background: #176b87d7;
  }
  .fix {
    height: 75vh !important;
    overflow-y: hidden;
  }

  .menu-mobile-open {
    background-color: rgba(0, 0, 0, 0);
  }
  .menu-mobile .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .menu-mobile .logo img {
    width: 30px;
    display: block;
  }
  .menu-mobile .logo i {
    font-size: 28px;
    color: white;
    display: block;
    cursor: pointer;
  }
}
</style>
