<template>
  <section id="utama">
    <div class="utama">
      <!-- mapel input -->
      <div class="row mt-3 animate__animated animate__fadeInUp">
        <div class="col-12 col-md-6"></div>
        <div class="col-12 col-md-6">
          <!-- Button trigger modal -->
          <div class="button-santri float-end">
            <button type="button" class="btn btn-sm btn-primary button-santri" data-bs-toggle="modal"
              data-bs-target="#InputDataUtama">
              Tambah Data
            </button>
          </div>
        </div>
      </div>
      <!-- table -->
      <TablePeriode />
    </div>
    <!-- modal -->
    <ModalPeriode />
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`periode/changeUnit`, program);
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
