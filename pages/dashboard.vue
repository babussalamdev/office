<template>
  <section id="home">
    <div class="home animate__animated animate__fadeIn">
      <Navbar />
      <hr class="mb-4" />
      <Chart />
      <div class="row">
        <div class="col-6">
          <ChartClass />
        </div>
        <div class="col-6">
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

<style scoped></style>
