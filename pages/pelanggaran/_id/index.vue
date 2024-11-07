<template>
  <section id="pelanggaran">
    <div class="pelanggaran">
      <PelanggaranTableRecord :nama="nama" />
      <!-- <PelanggaranModalRecord /> -->
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store, params, redirect }) {
    if (store.state.pelanggaran.santri.length < 1) {
      return redirect("/pelanggaran");
    }
    const i = store.state.pelanggaran.santri.findIndex(
      (x) => x.SK === params.id
    );
    const nama = store.state.pelanggaran.santri[i].Nama;
    store.dispatch(`pelanggaran/getRecord`, params.id);
    return { nama };
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
@import url(~/assets/css/pelanggaran/pelanggaran.css);
</style>
