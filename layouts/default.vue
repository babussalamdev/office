<template>
  <main>
    <div class="global-loader" v-if="globalLoad">
      <div class="loader">
        <div class="justify-content-center jimu-primary-loading"></div>
      </div>
    </div>
    <Sidebar />
    <!-- menu mobile  -->
    <div class="menu-mobile" :class="!isSidebar ? 'menu-mobile-open' : ''">
      <div class="logo justify-content-between animate__animated animate__zoomIn">
        <div class="d-flex gap-3 align-items-center">
          <img src="~/assets/img/logo-1.png" />
          <h5 class="text-white">Sisalam {{ version }}</h5>
        </div>
        <div>
          <span @click="toggleSidebar">
            <i v-if="isSidebar" class="bx bx-menu-alt-right"></i>
            <i v-else class="material-icons text-dark"> close </i>
          </span>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="content" :class="!isSidebar ? 'fix' : ''">
      <!-- <div class="animate__animated animate__fadeInUp"> -->
      <Navbar />
      <hr class="mb-4 d-block d-md-none" />
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
  created() {
    this.version = process.env.version;
  },
  methods: {
    ...mapMutations('sidebar', ['toggleSidebar'])
  },

  computed: {
    ...mapState("mainkelas", ["overlay"]),
    ...mapState('sidebar', ['isSidebar']),
    ...mapState('index', ['globalLoad'])
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

/* global loader */
.global-loader {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.79);
  left: 0;
  top: 0;
}

/* From Uiverse.io by Donewenfu */
.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.jimu-primary-loading:before,
.jimu-primary-loading:after {
  position: absolute;
  top: 0;
  content: '';
}

.jimu-primary-loading:before {
  left: -19.992px;
}

.jimu-primary-loading:after {
  left: 19.992px;
  -webkit-animation-delay: 0.32s !important;
  animation-delay: 0.32s !important;
}

.jimu-primary-loading:before,
.jimu-primary-loading:after,
.jimu-primary-loading {
  background: #076fe5;
  -webkit-animation: loading-keys-app-loading 0.8s infinite ease-in-out;
  animation: loading-keys-app-loading 0.8s infinite ease-in-out;
  width: 13.6px;
  height: 32px;
}

.jimu-primary-loading {
  text-indent: -9999em;
  margin: auto;
  position: absolute;
  right: calc(50% - 6.8px);
  top: calc(50% - 16px);
  -webkit-animation-delay: 0.16s !important;
  animation-delay: 0.16s !important;
}

@-webkit-keyframes loading-keys-app-loading {

  0%,
  80%,
  100% {
    opacity: .75;
    box-shadow: 0 0 #076fe5;
    height: 32px;
  }

  40% {
    opacity: 1;
    box-shadow: 0 -8px #076fe5;
    height: 40px;
  }
}

@keyframes loading-keys-app-loading {

  0%,
  80%,
  100% {
    opacity: .75;
    box-shadow: 0 0 #076fe5;
    height: 32px;
  }

  40% {
    opacity: 1;
    box-shadow: 0 -8px #076fe5;
    height: 40px;
  }
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
