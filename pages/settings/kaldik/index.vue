<template>
  <section id="kaldiksetup">
    <div class="kaldiksetup">
      <div class="nav-kaldik mb-0 mb-sm-3">
        <div class="mb-3 mb-sm-0">
          <h1>Kalender Akademik</h1>
        </div>
        <div class="cta-info mb-3 mb-sm-0">
          <span
            ><span id="total-kegiatan" v-text="totalKegiatan"></span> Total
            Kegiatan</span
          >
          <div class="button-santri">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#inputKaldik"
            >
              Tambah
              <!-- <i class="material-icons"> add </i> -->
            </button>
          </div>
        </div>
      </div>
      <!-- table -->
      <TableKaldik />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kaldik/changeUnit`, program);
  },
  computed: {
    ...mapState("kaldik", ["kaldik"]),
    totalKegiatan() {
      return this.kaldik.length;
    },
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
