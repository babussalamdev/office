<template>
  <section id="pendaftarantahfidzujian">
    <div class="pendaftarantahfidzujian">
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="pendaftarantahfidzujian" autocomplete="off" />
        <label @click="move('pendaftarantahfidzujian')" class="btn btn-outline-dark" for="pendaftarantahfidzujian">Pendaftaran</label>

        <input type="radio" class="btn-check" name="btnradio" id="formtahfidzujian" autocomplete="off" checked />
        <label @click="move('formtahfidzujian')" class="btn btn-outline-dark text-white" style="background-color: #176b87" for="formtahfidzujian">
          Form Ujian
        </label>
      </div>
      <formtahfidzujian />
    </div>
  </section>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  export default {
    async asyncData({ store }) {
      store.dispatch("tahfidzujian/changeUnit");
    },
    mounted() {
      this.closeAllModals();
    },
    methods: {
      ...mapMutations("tahfidzujian", ["move"]),
      closeAllModals() {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
        // Menghapus kelas dan style dari body
        document.body.classList.remove("modal-open"); // Menghapus kelas
        document.body.style.overflow = ""; // Menghapus gaya inline
        document.body.style.paddingRight = ""; // Menghapus gaya inline
      },
    },
  };
</script>

<style>
  @import url(~/assets/css/kelas/kelas.css);
</style>
