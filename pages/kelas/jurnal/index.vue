<template>
  <section id="jurnal">
    <div class="jurnal">
      <JurnalTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'root',
  meta: {
    roots: 'root'
  },
  async asyncData({ store }) {
    store.dispatch('jurnal/changeUnit')
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
@import url(~/assets/css/kelas/kelas.css);
</style>
