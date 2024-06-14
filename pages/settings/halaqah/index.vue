<template>
  <section id="halaqoh">
    <div class="halaqoh animate__animated animate__fadeInUp">
      <div class="row">
        <!-- left side -->
        <!-- Halaqoh -->
        <div class="col-12">
          <div class="row mt-3 animate__animated animate__fadeInUp">
            <div class="col-12 col-md-6 d-flex align-items-center">
              <h3>Settings Halaqah</h3>
            </div>
            <div class="col-12 col-md-6">
              <!-- Button trigger modal -->
              <div class="button-santri float-end">
                <button type="button" class="btn btn-sm btn-primary button-santri" data-bs-toggle="modal"
                  data-bs-target="#InputDataHalaqoh">
                  Tambah Halaqoh
                </button>
              </div>
            </div>
          </div>

          <!-- table -->
          <TableHalaqah />
        </div>
      </div>
    </div>

    <!-- modal -->
    <ModalKelompok />
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kelompok/changeUnitHalaqah`, program);
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
