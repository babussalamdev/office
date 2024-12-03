<template>
  <main>
    <!-- <Loader /> -->
    <Sidebar />
    <!-- menu mobile  -->
    <div class="menu-mobile" :class="!isSidebarOpen ? 'menu-mobile-open' : ''">
      <div class="logo justify-content-between animate__animated animate__zoomIn">
        <div class="d-flex gap-3 align-items-center">
          <img src="~/assets/img/logo-1.png" />
          <h5 class="text-white">Sisalam {{ version }}</h5>
        </div>
        <div class="hamburger-menu-mobile">
          <span @click="toggleSidebar">
            <i v-if="isSidebarOpen" class="bx bx-menu-alt-right"></i>
            <i v-else class="material-icons text-dark"> close </i>
          </span>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="content" :class="!isSidebarOpen ? 'fix' : ''">
      <!-- <div class="animate__animated animate__fadeInUp"> -->
      <Navbar />
      <hr class="mb-4 d-block d-md-none" v-if="this.$route.path !== '/laundry/finance'" />
      <!-- </div> -->
      <div class="nuxt position-relative">
        <nuxt />
      </div>

      <div v-if="overlay" class="overlay d-flex align-items-center justify-content-center">
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <!-- <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> -->
      </div>
    </div>

    <!-- <div class="overlay" v-if="!isSidebar"></div> -->
  </main>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      version: 0
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);

    const program = localStorage.getItem('program')
    this.$connectSocket(`${this.$config.websocket}?sk=${this.$auth.user.preferred_username
      }&program=${program}`);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  created() {
    this.version = process.env.version;
  },
  methods: {
    // ...mapMutations('sidebar', ['toggleSidebar']),
    handleClickOutside(event) {
      this.$store.dispatch('sidebar/handleClickOutside', event);
    },
    toggleSidebar() {
      this.$store.dispatch('sidebar/toggleSidebar');
    }
  },

  computed: {
    ...mapState("mainkelas", ["overlay"]),
    ...mapState('sidebar', ['isSidebar', 'isSidebarOpen']),

  },
};
</script>

<style>
@import url(~/assets/css/reset.css);
@import url(~/assets/css/style.css);

main {
  /* background-color: #f1f5f9; */
  padding-left: 208px;
  padding-left: 213px;
}

/* .nuxt {
  background: #000 !;
} */

.content {
  /* background: #f1f5f9; */
  min-height: 100vh !important;
  padding: 10px 15px 10px 20px;
}

.overlay {
  position: absolute;
  background: #00000077;
  top: z;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

@media screen and (min-width: 577px) {
  .nuxt {
    padding-top: 100px !important;
  }
}

/* khusus  */
@media screen and (min-width: 576px) {
  .menu-mobile {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  main {
    padding-left: 0px !important;
    /*awalny 68px */
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

  /* .overlay { */
  /* Gaya untuk overlay */
  /* content: "";
    background-color: rgba(0, 0, 0, 0.615);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    height: max-content;
    width: 100vh;
    height: 100vh;
  } */

  .menu-mobile {
    position: fixed;
    top: 0;
    z-index: 88;
    width: 100%;
    padding: 0 20px;
    background: #176b87;
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
