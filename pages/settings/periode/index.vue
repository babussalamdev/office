<template>
  <section id="utama">
    <div class="utama">
      <!-- mapel input -->
      <div class="row mt-3 animate__animated animate__fadeInUp">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h3>Settings Periode</h3>
        </div>
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
