<template>
  <section id="kelas">
    <div class="kelas animate__animated animate__fadeInUp">
      <div class="row">
        <!-- left side -->
        <!-- Kelas -->
        <div class="col-12 col-lg-6">
          <KelasTable :kelas="kelas" @deleteKelas="deleteKelas" />
        </div>

        <!-- right side -->
        <div class="col-12 col-lg-6">
          <!-- Jurusan -->
          <JurusanTable :jurusan="jurusan" @deleteJurusan="deleteJurusan" />

          <!-- Eskul -->
          <EkskullTable :ekskull="ekskull" @deleteEkskull="deleteEkskull" />
        </div>
      </div>
    </div>

    <!-- Modal Kelas -->
    <ModalKelas
      @updateKelas="updatekelas"
      @updateJurusan="updateJurusan"
      @updateEkskull="updateEkskull"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      btn: true,
    };
  },
  async asyncData({ $axios }) {
    const { kelas, jurusan, ekskull } = await $axios.$get(
      "get-database?kelas=settings"
    );
    return { kelas, jurusan, ekskull };
  },

  methods: {
    updatekelas(data) {
      this.kelas.push(data);
      this.kelas.sort((a, b) => {
        return a.Sort - b.Sort;
      });
    },
    deleteKelas(key) {
      const i = this.kelas.findIndex((x) => x.SK === key);
      this.kelas.splice(i, 1);
    },
    updateJurusan(data) {
      this.jurusan.push(data);
      this.jurusan.sort((a, b) => {
        return a.Sort - b.Sort;
      });
    },
    deleteJurusan(key) {
      const i = this.jurusan.findIndex((x) => x.SK === key);
      this.jurusan.splice(i, 1);
    },
    updateEkskull(data) {
      this.ekskull.push(data);
      this.ekskull.sort((a, b) => {
        return a.Sort - b.Sort;
      });
    },
    deleteEkskull(key) {
      const i = this.ekskull.findIndex((x) => x.SK === key);
      this.ekskull.splice(i, 1);
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/setting/setting.css);
</style>
