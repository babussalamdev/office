<template>
  <section id="kaldik">
    <div class="kaldik animate__animated animate__fadeIn">
      <Calendar :transformedData="transformedData" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kaldik/changeUnit`, program);
  },
  mounted() {
    this.closeAllModals();;
  },
  computed: {
    ...mapGetters("kaldik", ["getKaldik"]),
    transformedData: {
      get() {
        return this.getKaldik;
      },
    },
  },
  methods: {
    handleDateClick: function (arg) {
      alert("date click! " + arg.dateStr);
    },
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
@import url('~/assets/css/kaldik/kladik.css');
</style>
