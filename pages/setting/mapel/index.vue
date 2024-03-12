<template>
  <section id="mapel">
    <div class="mapel">
      <!-- mapel input -->
      <div class="row mt-3 animate__animated animate__fadeInUp">
        <div class="col-12 col-md-6"></div>
        <div class="col-12 col-md-6">
          <!-- Button trigger modal -->
          <div class="button-santri float-end">
            <button
              type="button"
              class="btn btn-sm btn-primary button-santri"
              data-bs-toggle="modal"
              @click="modalShow"
            >
              Tambah Mapel
            </button>
          </div>
        </div>
      </div>
      <!-- table -->
      <TableMapel />
    </div>
    <!-- modal -->
    <ModalMapel :kelas="kelas" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      kelas: "",
    };
  },
  methods: {
    async modalShow() {
      const unit = localStorage.getItem("program");
      const data = await this.$axios.$get(
        `get-database?subject=kelas&program=${unit}`
      );
      this.kelas = data;
      $("#InputDataMapel").modal("show");
    },
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
