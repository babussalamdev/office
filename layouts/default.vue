<template>
  <main>
    <div class="global-loader" v-if="globalLoad">
      <div class="loading-area">
        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
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
  background-color: #f1f5f9;
  padding-left: 208px;
  padding-left: 213px;
}

.content {
  background: #f1f5f9;
  min-height: 100vh;
  padding: 10px 15px 10px 20px;
}

.overlay {
  position: absolute;
  background: #00000077;
  top: 0;
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
  background: rgba(40, 40, 40, 0.312);
  left: 0;
}

.loading-area {
	display: grid;
	place-items: center;
	height: 100vh;
}
.loader div {
	height: 30px;
	width: 30px;
	border-radius: 50%;
	transform: scale(0);
	animation: animate 1.5s ease-in-out infinite;
	display: inline-block;
	margin: .5rem;
}
.loader div:nth-child(0) {
	animation-delay: 0s;
}
.loader div:nth-child(1) {
	animation-delay: 0.2s;
}
.loader div:nth-child(2) {
	animation-delay: 0.4s;
}
.loader div:nth-child(3) {
	animation-delay: 0.6s;
}
.loader div:nth-child(4) {
	animation-delay: 0.8s;
}
.loader div:nth-child(5) {
	animation-delay: 1s;
}
.loader div:nth-child(6) {
	animation-delay: 1.2s;
}
.loader div:nth-child(7) {
	animation-delay: 1.4s;
}
@keyframes animate {
	0%, 100% {
		transform: scale(0.2);
		background-color: #96C9F4;
	}
	40% {
		transform: scale(1);
		background-color: #3FA2F6;
	}
	50% {
		transform: scale(1);
		background-color: #3FA2F6;
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
