<template>
  <div class="animate__animated animate__fadeInUp">
    <h2 class="mb-3 mb-md-3">Penilaian Kelas</h2>
    <div class="head row mb-3">
      <div class="col-12 col-md-6 d-flex">
        <div class="input-group w-75">
          <select class="form-select" aria-label="Default select example">
            <option selected>Kelas</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select class="form-select" aria-label="Default select example">
            <option selected>Mapel</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <span class="input-group-text">Jurusan</span>
          <button type="button" class="btn btn-primary">Primary</button>
          <select class="form-select" aria-label="Default select example">
            <option selected>TA</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div
        class="col-12 col-md-6 d-flex align-items-center justify-content-end gap-3"
      >
        <div class="form-check d-flex align-items-center mb-0 gap-1">
          <input
            v-model="radio"
            class="form-check-input mb-1"
            type="radio"
            value="hadir"
          />
          <label class="form-check-label mb-0" for="flexRadioDefault1">
            Hadir & Akhlak
          </label>
        </div>
        <div class="form-check d-flex align-items-center mb-0 gap-1">
          <input
            class="form-check-input mb-1"
            type="radio"
            v-model="radio"
            value="harian"
          />
          <label class="form-check-label mb-0" for="flexRadioDefault1">
            Harian
          </label>
        </div>
        <div class="form-check d-flex align-items-center mb-0 gap-1">
          <input
            class="form-check-input mb-1"
            type="radio"
            v-model="radio"
            value="uts"
          />
          <label class="form-check-label mb-0" for="flexRadioDefault1">
            UTS
          </label>
        </div>
        <div class="form-check d-flex align-items-center mb-0 gap-1">
          <input
            class="form-check-input mb-1"
            type="radio"
            v-model="radio"
            value="uas"
          />
          <label class="form-check-label mb-0" for="flexRadioDefault1">
            UAS
          </label>
        </div>
        <div class="form-check d-flex align-items-center mb-0 gap-1">
          <input
            v-model="radio"
            class="form-check-input mb-1"
            type="radio"
            value="none"
            checked
          />
          <label class="form-check-label mb-0" for="flexRadioDefault2">
            None
          </label>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Hadir & Akhlak</th>
            <th scope="col">Nilai Harian</th>
            <th scope="col">UTS</th>
            <th scope="col">UAS</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dummy" :key="index">
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
            </td>
            <td class="text-capitalize align-middle">
              <span v-if="radio === 'hadir'">
                <input
                  type="number"
                  class="form-control position-absolute"
                  v-model="data.Hadir"
                  @change="update(index, 'Hadir')"
                />
              </span>
              <span v-else>
                {{ data.Hadir ? data.Hadir : "0" }}
              </span>
            </td>
            <td class="text-capitalize align-middle">
              <span v-if="radio === 'harian'">
                <input
                  type="number"
                  class="form-control position-absolute"
                  v-model="data.Harian"
                  @change="update(index, 'Harian')"
                />
              </span>
              <span v-else>
                {{ data.Harian ? data.Harian : "0" }}
              </span>
            </td>
            <td class="text-capitalize align-middle">
              <span v-if="radio === 'uts'">
                <input
                  type="number"
                  class="form-control position-absolute"
                  v-model="data.UTS"
                  @change="update(index, 'UTS')"
                />
              </span>
              <span v-else>
                {{ data.UTS ? data.UTS : "0" }}
              </span>
            </td>
            <td class="text-capitalize align-middle">
              <span v-if="radio === 'uas'">
                <input
                  type="number"
                  class="form-control position-absolute"
                  v-model="data.UAS"
                  @change="update(index, 'UAS')"
                />
              </span>
              <span v-else>
                {{ data.UAS ? data.UAS : "0" }}
              </span>
            </td>
            <td class="text-capitalize align-middle">
              {{ data.Total ? data.Total : "0" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      btn: true,
      selectKelas: "",
      radio: "none",
      hadir: "",
      overlay: false,
      dummy: [
        {
          Nama: "Fauzan Gunawan",
          Hadir: "90",
          Harian: "91",
          UTS: "92",
          UAS: "95",
          Total: "92.6",
        },
        {
          Nama: "Fauzan Gunawan",
          Hadir: "90",
          Harian: "91",
          UTS: "92",
          UAS: "95",
          Total: "92.6",
        },
        {
          Nama: "Fauzan Gunawan",
          Hadir: "90",
          Harian: "91",
          UTS: "92",
          UAS: "95",
          Total: "92.6",
        },
      ],
    };
  },
  computed: {
    ...mapState("pelanggaran", ["santri", "select", "permissions"]),
  },
  methods: {
    async input(index) {
      $("#inputModal").modal("show");
      const updateData = this.santri[index];
      this.$store.commit("pelanggaran/updateData", updateData);
    },
    async update(index, field) {
      const data = {
        index: index,
        field: field,
        value: this.dummy[index][field],
      };
      console.log(data);
    },
    // kelasLoad() {
    //   const program = localStorage.getItem("program");
    //   const data = {
    //     program: program,
    //     kelas: this.kelas,
    //   };
    //   this.$store.dispatch(`santri/asrama/loadAsrama`, data);
    // },
    // async editItem(index) {
    //   $("#updateDataSantriKelas").modal("show");
    //   this.updateData = this.santri[index];
    // },
    // selectAllCheckbox() {
    //   for (const item of this.santri) {
    //     this.$set(this.selectedItems, item.SK, this.selectAll);
    //   }
    //   this.getCheckedNames();
    // },
    // getCheckedNames() {
    //   const checkedNames = Object.keys(this.selectedItems).filter(
    //     (key) => this.selectedItems[key]
    //   );
    //   this.data = checkedNames;
    // },
    // async editBulk(index) {
    //   $("#updateDataSantriAsrama").modal("show");
    //   this.updateData = this.data;
    // },
    // resetSelect() {
    //   this.data = [];
    //   this.selectAll = false;
    //   this.selectedItems = {};
    // },
  },
};
</script>

<style scoped>
a {
  font-size: 12px;
}
select {
  font-size: 12px;
  width: 100px;
}
span {
  font-size: 12px;
}
button {
  font-size: 12px;
}
.form-check-label {
  font-size: 12px;
}
.form-control {
  font-size: 12px;
  width: 70px;
  margin-top: -15px;
}
@media screen and (max-width: 576px) {
  select {
    width: 100% !important;
  }
}
</style>
