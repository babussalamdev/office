<template>
  <div class="navbar">
    <div
      class="navbar-content d-flex align-items-center justify-content-between"
    >
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
            }}</span
          >
          {{ $route.name }}
        </h1>
      </div>

      <!-- menu profil melayang -->
      <div class="d-flex align-items-center gap-3">
        <select
          name="Kelas"
          id="kelas"
          class="form-select select"
          required
          @change="setUnit"
          v-model="unit"
        >
          <option value="" selected disabled>Unit</option>
          <option value="SD">SD</option>
          <option value="SMP">SMP</option>
          <option value="SMA">SMA</option>
          <option value="Tahfidz">Tahfidz</option>
        </select>
        <!-- notification -->
        <div
          class="notification-bell"
          :class="{ active: notifications.length > 0 && !notificationOpened }"
          @click="toggleNotification()"
          ref="notification"
        >
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
          <img
            @click="viewProfle()"
            src="~/assets/img/foto.jpeg"
            alt="foto profil"
            class="rounded-circle"
            ref="profile"
          />
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      profile: false,
      notif: false,
      unit: "",
      // notifications: ["Notification 1", "Notification 2", "Notification 3"],
      notifications: ["notification"],
      notificationOpened: false,
    };
  },
  mounted() {
    // Menambahkan event listener ke dokumen
    document.addEventListener("click", this.hideProfileOnClickOutside);
    document.addEventListener("click", this.hideNotifOnClickOutside);

    const program = localStorage.getItem("program");
    if (program) {
      this.unit = program;
      this.setUnit();
    }
  },
  destroyed() {
    // Menghapus event listener saat komponen dihancurkan
    document.removeEventListener("click", this.hideProfileOnClickOutside);
    document.removeEventListener("click", this.hideNotifOnClickOutside);
  },
  methods: {
    setUnit() {
      localStorage.setItem("program", this.unit);
      this.$store.commit("navbar/changeUnit", this.unit);
      const name = this.$route.name;
      if (name === "setting-mapel") {
        this.$store.dispatch(`mapel/changeUnit`, this.unit);
      } else if (name === "setting-kelas") {
        this.$store.dispatch(`kelas/changeUnit`, this.unit);
      } else if (name === "setting-periode") {
        this.$store.dispatch(`periode/changeUnit`, this.unit);
      } else if (name === "setting-kelompok") {
        this.$store.dispatch(`kelompok/changeUnit`, this.unit);
      } else if (name === "setting-kaldiksetup" || name === "kaldik") {
        this.$store.dispatch(`kaldik/changeUnit`, this.unit);
      } else if (name === "setting-struktur") {
        this.$store.dispatch(`struktur/changeUnit`, this.unit);
      }
    },
    viewProfle() {
      this.profil = !this.profil;
    },
    hideProfileOnClickOutside(event) {
      // Mengambil referensi elemen profile
      const profileElement = this.$refs.profile;

      // Memeriksa apakah elemen yang diklik berada di luar profile
      if (profileElement && !profileElement.contains(event.target)) {
        this.profil = false; // Sembunyikan profile
      }
    },
    hideNotifOnClickOutside(event) {
      // Mengambil referensi elemen profile
      const notificationElement = this.$refs.notification;

      // Memeriksa apakah elemen yang diklik berada di luar profile
      if (notificationElement && !notificationElement.contains(event.target)) {
        this.notif = false; // Sembunyikan profile
      }
    },
    toggleNotification() {
      this.notif = !this.notif;
      this.notificationOpened = !this.notificationOpened;
      // Reset notification status when opened
      if (this.notificationOpened) {
        this.notifications = [];
      }
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/navbar.css);
</style>
