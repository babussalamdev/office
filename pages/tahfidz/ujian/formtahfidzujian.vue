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
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">Nama</th>
            <th scope="col" class="text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in halaqahsantri" :key="index">
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
            </td>
            <td class="text-center align-middle">
              <a href="javascript:;" @click="showDetail(data.SK)">
                <i class="bi bi-pencil-square"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  export default {
    async asyncData({ store }) {
      store.dispatch("tahfidzujian/changeUnitPendaftaran");
    },
    computed: {
      ...mapState("tahfidzujian", ["halaqahsantri"]),
    },
    mounted() {
      this.closeAllModals();
    },
    methods: {
      ...mapMutations("tahfidzujian", ["move", "showDetail"]),
      showDetail(sk, subject) {
        this.$store.commit("tahfidzujian/showDetail", { sk, subject });
      },
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
  @import url(~/assets/css/santri/santri.css);
</style>
