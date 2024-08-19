<template>
  <section id="mapel">
    <div class="mapel">
      <div class="row mb-3">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h2 class="text-capitalize mb-3">setup mapel</h2>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end">
          <select name="Mapel" id="mapel" v-model="listKelas" @change="kelasLoad" class="form-select select" required>
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in kelas" :key="index" :value="data">
              {{ data.Nama }}
            </option>
          </select>
        </div>
      </div>
      <MapelSetupTable />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: 'permission',
  meta: {
    permissions: ['pengajar']
  },
  data() {
    return {
      listKelas: "",
    };
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/mapel/changeUnit`, program);
  },
  computed: {
    ...mapState("pegawai/mapel", ["kelas"]),
  },
  methods: {
    kelasLoad() {
      const program = localStorage.getItem("program");
      const data = {
        program: program,
        kelas: this.listKelas.Nama,
      };
      this.$store.dispatch(`pegawai/mapel/getKelas`, data);
    },
  },
};
</script>

<style>
@import url(~/assets/css/pegawai/pegawai.css);
</style>
