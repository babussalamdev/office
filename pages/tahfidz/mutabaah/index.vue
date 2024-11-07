<template>
  <section id="rekaptahfidz">
    <div class="rekaptahfidz">
      <!-- table -->
      <ModalZiyadah />
      <ModalZiyadahInsert />
      <mutabaahTable />
    </div>
  </section>
</template>

<script>
export default {
  name: "mutabaah",
  async asyncData({ store }) {
    store.dispatch('mutabaah/changeUnit')
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
