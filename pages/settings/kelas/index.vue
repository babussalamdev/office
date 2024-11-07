<template>
  <section id="kelas">
    <div class="kelas animate__animated animate__fadeInUp">
      <div class="row">
        <!-- left side -->
        <!-- Kelas -->
        <div class="col-12 col-lg-6">
          <TableKelas />
        </div>

        <!-- right side -->
        <div class="col-12 col-lg-6">
          <!-- Jurusan -->
          <TableJurusan />

          <!-- Ekskull -->
          <TableEkskull />
        </div>
      </div>
    </div>

    <!-- Modal Kelas -->
    <ModalKelas />
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['setup kelas']
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kelas/changeUnit`, program);
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

<style scoped>
@import url(~/assets/css/setting/setting.css);
</style>
