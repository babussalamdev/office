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
              data-bs-target="#InputDataMapel"
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
    <ModalMapel />
  </section>
</template>

<script>
export default {};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
