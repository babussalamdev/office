<template>
  <section id="nilai-quran">
    <div class="nilai-quran">
      <div class="row animate__animated animate__fadeInUp">
        <!-- left side -->
        <!-- Halaqoh -->
          <div class="col-12 col-md-6 d-flex align-items-center">
            <h3>Setting Nilai Quran</h3>
          </div>
          <div class="col-12 col-md-6">
            <!-- Button trigger modal -->
            <div class="button-santri float-end">
              <button type="button" class="btn btn-sm btn-primary button-santri" data-bs-toggle="modal"
                data-bs-target="#inputnilaiquran">
                tambah data
              </button>
            </div>
          </div>

        <!-- table -->
      </div>
      <TableNilaiQuran />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store}) {
    store.dispatch('setupnilaiquran/changeUnit')
  }
}
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
