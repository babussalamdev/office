<template>
  <section id="home">
    <div class="home animate__animated animate__fadeIn">
      <Chart />
      <div class="row">
        <div class="col-12 col-lg-6 mb-3">
          <!-- kelas -->
          <ChartClass />
        </div>
        <div class="col-12 col-lg-6 mb-3">
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
  height: min-content;
}

@media screen and (max-width: 992px) {
  .home {
    height: max-content;
  }
}
</style>
