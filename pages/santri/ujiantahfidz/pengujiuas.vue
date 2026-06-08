<template>
  <section id="nilai-quran">
    <div class="nilai-quran">
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="pendaftarantahfidzujian" autocomplete="off" checked />
        <label
          @click="move('pendaftarantahfidzujian')"
          class="btn btn-outline-dark text-white"
          style="background-color: #176b87"
          for="pendaftarantahfidzujian">
          Penguji Ujian Juz
        </label>

        <input type="radio" class="btn-check" name="btnradio" id="formtahfidzujian" autocomplete="off" />
        <label @click="move('formtahfidzujian')" class="btn btn-outline-dark" for="formtahfidzujian">Ujian Juz</label>

        <input type="radio" class="btn-check" name="btnradio" id="formtahfidzujiansemester" autocomplete="off" />
        <label @click="move('formtahfidzujiansemester')" class="btn btn-outline-dark" for="formtahfidzujiansemester">Penguji UAS</label>
      </div>
      <!-- <TableNilaiTahfidz /> -->
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      store.dispatch("ujiantahfidzsettings/changeUnit");
    },
    mounted() {
      this.closeAllModals();
    },
    methods: {
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
  @import url(~/assets/css/setting/setting.css);
</style>
