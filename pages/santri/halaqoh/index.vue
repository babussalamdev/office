<template>
  <section id="settings">
    <div class="settings">
      <HalaqahSantriTable />
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['halaqah']
  },
  async asyncData({ store }) {
    store.dispatch(`santri/halaqah/changeUnit`);
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
@import url(~/assets/css/santri/santri.css);
</style>
