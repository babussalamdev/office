<template>
  <div>
    <div>
      <div class="animate__animated animate__fadeInUp">
        <div class="head row mb-3 row">
          <div class="col-12 col-md-6">
            <h2 class="mb-3 mb-md-3">Jurnal Page</h2>
            <div class="d-flex flex-column flex-md-row gap-4 gap-md-0 mb-3 mb-md-0">
              <div class="input-group">
                <select class="form-select" aria-label="Default select example" v-model="selectedLabel">
                  <option value="" selected disabled>Label</option>
                  <option v-for="(data, index) in label" :key="index" :value="index">{{ index }}</option>
                </select>
                <select class="form-select" aria-label="Default select example" v-model="selectedSemester" @change="changeGetMapelSemester">
                  <option value="" selected disabled>Semester</option>
                  <option v-for="(data, index) in semester" :key="index" :value="data">{{ data.Semester }}</option>
                </select>
                <select
                  v-if="kelas.length > 0"
                  class="form-select"
                  aria-label="Default select example"
                  v-model="selectedKelas"
                  @change="changeGetMapel">
                  <option value="" selected disabled>Kelas</option>
                  <option v-for="(data, index) in kelas" :key="index" :value="data">{{ data }}</option>
                </select>
                <select class="form-select" aria-label="Default select example" v-model="selectedMapel" @change="addNewData">
                  <option value="" selected disabled>Mapel</option>
                  <option v-for="(data, index) in mapel" :key="index" :value="data">{{ data.Nama }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" class="text-capitalize">Waktu</th>
                <th scope="col" class="text-capitalize">judul / pembahasan</th>
                <th scope="col" class="text-capitalize">catatan kejadian / solusi</th>
                <th scope="col" class="text-capitalize">Jam Mengajar</th>
                <th scope="col" class="text-capitalize">Pengajar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in values" :key="index">
                <td class="text-capitalize" scope="col">{{ data.SK.split("#")[2] }}</td>
                <td class="text-capitalize" scope="col">{{ data.Description }}</td>
                <td class="text-capitalize" scope="col">{{ data.Occurrence }}</td>
                <td class="text-capitalize" scope="col">{{ data.Session }}</td>
                <td class="text-capitalize" scope="col">{{ data.PIC }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <JurnalModal />
      <JurnalModalUpdate />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
  export default {
    computed: {
      ...mapState("report/jurnal", ["mapel", "kelas", "label", "semester", "th", "values"]),
      ...mapGetters("report/jurnal", ["getSelectedMapel", "getSelectedKelas", "getSelectedLabel", "getSelectedSemester"]),
      walas() {
        const program = localStorage.getItem("program");
        return this.$auth.user.Kelas[program] !== "off";
      },
      selectedMapel: {
        get() {
          return this.getSelectedMapel;
        },
        set(value) {
          const obj = { key: "selectedMapel", value };
          this.$store.commit("report/jurnal/setState", obj);
        },
      },
      selectedKelas: {
        get() {
          return this.getSelectedKelas;
        },
        set(value) {
          this.$store.commit("report/jurnal/setState", { key: "selectedKelas", value });
        },
      },
      selectedLabel: {
        get() {
          return this.getSelectedLabel;
        },
        set(value) {
          this.$store.commit("report/jurnal/setState", { key: "selectedLabel", value });
        },
      },
      selectedSemester: {
        get() {
          return this.getSelectedSemester;
        },
        set(value) {
          this.$store.commit("report/jurnal/setState", { key: "selectedSemester", value });
        },
      },
      // selectedKelas: {
      //   get() {
      //     return this.getSelectedKelas;
      //   },
      //   set(value) {
      //     this.$store.commit("report/jurnal/setState", { key: "selectedKelas", value });
      //   },
      // },
      // selectedMapel: {
      //   get() {
      //     return this.getSelectedMapel;
      //   },
      //   set(value) {
      //     this.$store.commit("report/jurnal/setState", { key: "selectedMapel", value });
      //   },
      // },
    },
    methods: {
      ...mapActions("report/jurnal", ["getMapel", "changeGetMapelSemester", "changeUnit", "getData"]),
      changeGetMapel() {
        this.getMapel();
      },
      addNewData() {
        this.getData();
      },
    },
  };
</script>

<style scoped>
  tr td {
    padding: 20px !important;
  }
  a {
    font-size: 12px;
  }

  select {
    font-size: 12px;
    width: max-content !important;
  }

  .input-group label,
  .input-group input,
  .input-group i,
  .input-group span,
  button {
    font-size: 12px;
  }

  button {
    white-space: nowrap;
  }
</style>
