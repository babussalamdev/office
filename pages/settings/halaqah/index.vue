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
    <ModalUpdateHalaqah />
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['setup halaqah']
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kelompok/changeUnitHalaqah`, program);
  },
  mounted() {
    this.closeAllModals();;
  },
  methods: {
    closeAllModals() {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      // Menghapus kelas dan style dari body
      document.body.classList.remove('modal-open'); // Menghapus kelas
      document.body.style.overflow = ''; // Menghapus gaya inline
      document.body.style.paddingRight = ''; // Menghapus gaya inline
    }
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
