<template>
  <section id="mapel">
    <div class="mapel">
      <!-- mapel input -->
      <div class="row mt-3 animate__animated animate__fadeInUp">
        <h2 class="mb-3 mb-md-3">Nilai Mapel</h2>

        <div class="col-12 col-md-6">
          <div class="d-flex justify-content-between mb-3 w-auto">
            <div class="d-flex">
              <select name="Mapel" id="mapel" v-model="listKelas" @change="kelasLoad()" class="form-select select" required>
                <option value="" selected disabled>Kelas</option>
                <option v-for="(data, index) in kelas" :key="index" :value="data">
                  {{ data.Nama }}
                </option>
              </select>
              <select
                class="form-select select"
                aria-label="Default select example"
                v-model="selectedSemester"
                @change="kelasLoadSemester()"
                :disabled="!listKelas">
                <option value="" selected disabled>Semester</option>
                <option value="ganjil">Ganjil</option>
                <option value="genap">Genap</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <!-- Button trigger modal -->
          <div class="button-santri float-end">
            <button type="button" class="btn btn-sm btn-primary button-santri" @click="inputModal" :disabled="isMapelSemesterEmpty">
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
    // middleware: 'permission',
    // meta: {
    //   permissions: ['setup mapel']
    // },
    data() {
      return {
        listKelas: "",
        selectedSemester: "",
        isMapelSemesterEmpty: true,
      };
    },
    computed: {
      ...mapState("mapel", ["kelas", "mapel"]),
    },
    async asyncData({ store }) {
      const program = localStorage.getItem("program");
      store.dispatch(`mapel/changeUnit`, program);
    },
    mounted() {
      this.closeAllModals();
    },
    methods: {
      ...mapMutations("mapel", ["inputModal"]),
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
      kelasLoad() {
        this.selectedSemester = "";
        this.isMapelSemesterEmpty = true;
        this.$store.commit(`mapel/setSelectKelas`, this.listKelas.Nama);
      },
      kelasLoadSemester() {
        const program = localStorage.getItem("program");
        const data = {
          program: program,
          kelas: this.listKelas.Nama,
          semester: this.selectedSemester,
        };
        console.log(this.selectedSemester);
        this.isMapelSemesterEmpty = false;
        this.$store.commit(`mapel/setSelectSemester`, this.selectedSemester);
        this.$store.dispatch(`mapel/getKelas`, data);
      },
    },
  };
</script>

<style>
  @import url(~/assets/css/setting/setting.css);
</style>
