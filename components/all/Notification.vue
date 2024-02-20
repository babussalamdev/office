<template>
  <div class="notification">
    <div class="notification-content">
      <h1 class="text-capitalize">Notification</h1>

      <!-- list notification -->
      <ul>
        <li
          v-for="(notif, index) in notification"
          :key="index"
          class="list-notification d-flex align-items-center mb-2"
        >
          <div class="image-notification d-flex align-items-center">
            <!-- <img src="~/assets/img/foto.jpeg" /> -->
            <i class="bx bxs-user-circle"></i>
          </div>
          <div class="desc-notification d-flex flex-column gap-2">
            <div class="d-flex justify-content-between">
              <h2>{{ notif.user }}</h2>
              <h2 class="text-secondary">{{ notif.time }} PM</h2>
            </div>
            <div class="text-container">
              <p>
                {{ notif.text }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notification: [
        {
          user: "Sarah",
          time: "10:12",
          text: "Selamat! Transaksi Anda berhasil diproses",
        },
        {
          user: "Muhammad",
          time: "09:22",
          text: "Perhatian: Batas kuota internet Anda hampir habis",
        },
        {
          user: "Lisa",
          time: "01:34",
          text: "Pemberitahuan: Event spesial akan segera dimulai. Segera daftar!",
        },
        {
          user: "Andre",
          time: "05:35",
          text: "Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi.",
        },
        {
          user: "Maya",
          time: "06:13",
          text: "Harap segera update aplikasi untuk mendapatkan fitur terbaru.",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url(~/assets/css/notification.css);
</style>
