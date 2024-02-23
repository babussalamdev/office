<template>
  <section id="home">
    <div class="home animate__animated animate__fadeIn">
      <!-- navbar -->
      <Navbar />
      <hr class="mb-4" />
      <Chart />
      <div class="row">
        <div class="col-12 col-lg-6">
          <!-- kelas -->
          <ChartClass />
        </div>
        <div class="col-12 col-lg-6">
          <!-- pelanggaran -->
          <Violation />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      violation: [
        { name: "Fauzan Gunawan", jenis: "Bahasa" },
        { name: "Dean Syawafian", jenis: "Keamanan" },
        { name: "Sulthan Bahij", jenis: "Ibadah" },
        { name: "Abid Biaggy", jenis: "Kebersihan" },
        { name: "Hammam Musyafa", jenis: "Bahasa" },
      ],
    };
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
}

@media screen and (max-width: 992px) {
  .home {
    height: max-content;
  }
}
</style>
