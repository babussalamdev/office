<template>
  <section id="halaqoh">
    <div class="halaqoh animate__animated animate__fadeInUp">
      <div class="row">
        <!-- left side -->
        <!-- Halaqoh -->
        <div class="col-12 col-lg-6">
          <div class="row mt-3 animate__animated animate__fadeInUp">
            <div class="col-12 col-md-6"></div>
            <div class="col-12 col-md-6">
              <!-- Button trigger modal -->
              <div class="button-santri float-end">
                <button
                  type="button"
                  class="btn btn-sm btn-primary button-santri"
                  data-bs-toggle="modal"
                  data-bs-target="#InputDataHalaqoh"
                >
                  Tambah Halaqoh
                </button>
              </div>
            </div>
          </div>

          <!-- table -->
          <HalaqohTable :halaqah="halaqah" @deleteHalaqah="deleteHalaqah" />
        </div>
        <!-- right side -->
        <!-- Asrama -->
        <div class="col-12 col-lg-6">
          <div class="row mt-3 animate__animated animate__fadeInUp">
            <div class="col-12 col-md-6"></div>
            <div class="col-12 col-md-6">
              <!-- Button trigger modal -->
              <div class="button-santri float-end">
                <button
                  type="button"
                  class="btn btn-sm btn-primary button-santri"
                  data-bs-toggle="modal"
                  data-bs-target="#InputDataAsrama"
                >
                  Tambah Asrama
                </button>
              </div>
            </div>
          </div>

          <!-- table -->
          <AsramaTable :asrama="asrama" @deleteAsrama="deleteAsrama" />
        </div>
      </div>
    </div>

    <!-- modal -->
    <ModalKelompok
      @updateHalaqah="updateHalaqah"
      @updateAsrama="updateAsrama"
    />
  </section>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { halaqah, asrama } = await $axios.$get(
      "get-database?halaqah=settings"
    );
    return { halaqah, asrama };
  },
  methods: {
    updateHalaqah(data) {
      this.halaqah.push(data);
      this.halaqah.sort((a, b) => {
        return a.Sort - b.Sort;
      });
    },
    deleteHalaqah(key) {
      const i = this.halaqah.findIndex((x) => x.SK === key);
      this.halaqah.splice(i, 1);
    },
    updateAsrama(data) {
      this.asrama.push(data);
      this.asrama.sort((a, b) => {
        return a.Sort - b.Sort;
      });
    },
    deleteAsrama(key) {
      const i = this.asrama.findIndex((x) => x.SK === key);
      this.asrama.splice(i, 1);
    },
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
