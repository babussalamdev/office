<template>
  <section id="kaldiksetup">
    <div class="kaldiksetup">
      <div class="nav-kaldik mb-0 mb-sm-3">
        <div class="mb-3 mb-sm-0">
          <h1>Kalender Akademik</h1>
        </div>
        <div class="cta-info mb-3 mb-sm-0">
          <span>0 Total Kegiatan</span>
          <div class="button-santri">
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inputKaldik">
              Tambah
              <!-- <i class="material-icons"> add </i> -->
            </button>
          </div>
        </div>
      </div>
      <!-- table -->
      <TableKaldik />
    </div>
    <ModalKaldik />
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kaldik/changeUnit`, program);
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
