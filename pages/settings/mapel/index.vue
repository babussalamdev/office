<template>
  <section id="mapel">
    <div class="mapel">
      <!-- mapel input -->
      <div class="row mt-3 animate__animated animate__fadeInUp">
        <div class="col-12 col-md-6">
          <select name="Mapel" id="mapel" v-model="listKelas" @change="kelasLoad()" class="form-select select" required>
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in kelas" :key="index" :value="data">
              {{ data.Nama }}
            </option>
          </select>
        </div>
        <div class="col-12 col-md-6">
          <!-- Button trigger modal -->
          <div class="button-santri float-end">
            <button type="button" class="btn btn-sm btn-primary button-santri"
              @click="inputModal" :disabled="isMapelEmpty">
              Tambah Mapel
            </button>
          </div>
        </div>
      </div>
      <!-- table -->
      <TableMapel />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  middleware: 'permission',
  meta: {
    permissions: ['setup mapel']
  },
  data() {
    return {
      listKelas: "",
      isMapelEmpty: true,
    };
  },
  computed: {
    ...mapState("mapel", ["kelas", "mapel"]),
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`mapel/changeUnit`, program);
  },
  methods: {
    ...mapMutations('mapel', ['inputModal']),
    kelasLoad() {
      const program = localStorage.getItem("program");
      const data = {
        program: program,
        kelas: this.listKelas.Nama,
      };
      this.isMapelEmpty = false;
      this.$store.dispatch(`mapel/getKelas`, data);
      this.$store.commit(`mapel/setSelectKelas`, this.listKelas.Nama);
    },
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
