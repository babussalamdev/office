<template>
  <div class="navbar">
    <div class="navbar-content d-flex align-items-center justify-content-between">
      <div>
        <h1 class="text-capitalize">
          Application >
          <span class="text-primary">
            {{
              $route.name === "index"
                ? "Dashboard"
                : $route.name === "kaldiksetup"
                  ? "Kalender"
                  : $route.name === "rekaptahfidz"
                    ? "Rekap Tahfidz"
                    : $route.name
            }}</span>
        </h1>
      </div>
      <!-- menu profil melayang -->
      <div class="d-flex align-items-center gap-3">
        <select class="form-select select" @change="setUnit" v-model="unit" required>
          <option value="" selected disabled>Unit</option>
          <option v-for="(program, i) in $auth.user.Program?.split(',')" :key="i" :value="program"
            class="text-uppercase">
            {{ program }}
          </option>
        </select>

        <!-- notification -->
        <div class="notification-bell" :class="{ active: notifications.length > 0 && !notificationOpened }"
          @click="toggleNotification()" ref="notif">
          <div class="bell-icon">
            <i class="bx bx-bell fw-lighter"></i>
            <div class="notification-badge"></div>
          </div>
          <transition name="slide-fade">
            <div v-if="notif" class="menu-notification shadow">
              <Notification />
            </div>
          </transition>
        </div>

        <!-- profile -->
        <div class="profile">
          <img @click="viewProfile()" src="~/assets/img/foto.jpeg" alt="foto profil" class="rounded-circle"
            ref="profile" />
          <transition name="slide-fade">
            <div v-if="profile" class="menu-profile">
              <Profile />
            </div>
          </transition>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState('navbar', ['profile', 'notif', 'notifications', 'notificationOpened', 'userType']),
    ...mapGetters('navbar', ['getUnit']),
    unit: {
      get() {
        return this.getUnit
      },
      set(value) {
        this.changeUnit(value)
      }
    }
  },
  mounted() {
    // Menambahkan event listener ke dokumen
    document.addEventListener("click", event => this.hideOutside(event, 'profile'));
    document.addEventListener("click", event => this.hideOutside(event, 'notif'));

    const program = localStorage.getItem("program");
    if (program) {
      this.changeUnit(program)
      this.setUnit(this.$route.name);
    }
  },
  destroyed() {
    // Menghapus event listener saat komponen dihancurkan
    document.removeEventListener("click", event => this.hideOutside(event, 'profile'));
    document.removeEventListener("click", event => this.hideOutside(event, 'notif'));
  },
  methods: {
    ...mapMutations('navbar', ['changeUnit', 'viewProfile', 'falseData', 'toggleNotification']),
    ...mapActions('navbar', ['setUnit']),
    hideOutside(event, data) {
      // Mengambil referensi elemen profile
      const dataOutside = this.$refs[data];

      // Memeriksa apakah elemen yang diklik berada di luar profile
      if (dataOutside && !dataOutside.contains(event.target)) {
        this.falseData(data);
      }
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/navbar.css);
</style>
