<template>
  <section id="kaldiksetup">
    <div class="kaldiksetup">
      <div class="nav-kaldik mb-0 mb-sm-3">
        <div class="mb-3 mb-sm-0">
          <h1>Kalender Akademik</h1>
        </div>
        <div class="cta-info mb-3 mb-sm-0">
          <span>0 Total Kegiatan</span>
          <div class="button-santri">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#InputKaldik"
            >
              Tambah
              <!-- <i class="material-icons"> add </i> -->
            </button>
          </div>
        </div>
      </div>
      <!-- table -->
      <SetupKaldik :kaldik="kaldik" />
    </div>
    <ModalInputKaldik />
  </section>
</template>

<script>
export default {
  data() {
    return {
      kaldik: [
        {
          kegiatan: "Awal KBM Semester Ganjil",
          TglAwal: "17 July 2023",
          TglAkhir: "sedang berjalan",
          WarnaLabel: "#0080ff",
        },
        {
          kegiatan: "Masuk Santri Baru ( MOS )",
          TglAwal: "13 July 2023",
          TglAkhir: "16 July 2023",
          WarnaLabel: "#fcca01",
        },
        {
          kegiatan: "Kembalinya santri lama",
          TglAwal: "16 July 2023",
          TglAkhir: "sedang berjalan",
          WarnaLabel: "#d98d00",
        },
        {
          kegiatan: "Kembalinya santri Baru",
          TglAwal: "16 July 2023",
          TglAkhir: "sedang berjalan",
          WarnaLabel: "#87A922",
        },
      ],
    };
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
