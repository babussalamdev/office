<template>
  <section id="kelas">
    <div class="kelas animate__animated animate__fadeInUp">
      <div class="row">
        <!-- left side -->
        <!-- Kelas -->
        <div class="col-12 col-lg-6">
          <KelasTable />
        </div>

        <!-- right side -->
        <div class="col-12 col-lg-6">
          <!-- Jurusan -->
          <JurusanTable />

          <!-- Eskul -->
          <EkskullTable />
        </div>
      </div>
    </div>

    <!-- Modal Kelas -->
    <ModalKelas />
  </section>
</template>

<script>
export default {
  data() {
    return {
      btn: true,
    };
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kelas/changeUnit`, program);
  },
};
</script>

<style scoped>
@import url(~/assets/css/setting/setting.css);
</style>
