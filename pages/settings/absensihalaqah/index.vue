<template>
  <section id="halaqoh">
    <div class="halaqoh animate__animated animate__fadeInUp">
      <h3 class="mb-3">Settings Absensi Halaqah</h3>

      <div class="mb-4">
        <label for="typeSelection" class="form-label font-weight-bold">Pilih Kategori:</label>
        <select id="typeSelection" class="form-select w-auto" v-model="selectedType" @change="fetchData">
          <option value="session">Halaqah</option>
          <option value="sessionidhofi">Idhofi</option>
        </select>
      </div>

      <TableSetupAbsensiHalaqah />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store }) {
      // This will fetch the default 'session' data on page load
      await store.dispatch("setupabsensihalaqah/changeUnit");
    },
    computed: {
      // Two-way binding for Vuex state
      selectedType: {
        get() {
          return this.$store.state.setupabsensihalaqah.selectedType;
        },
        set(value) {
          this.$store.commit("setupabsensihalaqah/setState", { key: "selectedType", value: value });
        },
      },
    },
    methods: {
      // Re-fetch the data when the dropdown changes
      fetchData() {
        this.$store.dispatch("setupabsensihalaqah/changeUnit");
      },
    },
  };
</script>

<style>
  @import url(~/assets/css/setting/setting.css);
</style>
