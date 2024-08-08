<template>
  <div class="animate__animated animate__fadeInUp">
    <div class="head d-flex align-items-center mb-3 justify-content-between">
      <h2 class="mb-3 mb-md-0">Table Data Pelanggaran</h2>
      <select v-if="select.length > 0" class="form-select" name="Kelas" @change="getAbsensi" v-model="selectKelas">
        <option value="" selected>-- Kelas --</option>
        <option v-for="(data, index) in select" :key="index" :value="data">
          {{ data }}
        </option>
      </select>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nama / NIS</th>
            <th scope="col">Kelas</th>
            <th scope="col">Asrama</th>
            <th scope="col">Poin</th>
            <th scope="col">Jumlah</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
              <p class="text-secondary mt-1">{{ data.Nis }}</p>
            </td>
            <td class="text-capitalize align-middle">
              {{ data.Kelas ? data.Kelas : "-" }}
            </td>
            <td class="text-capitalize align-middle">
              {{ data.Asrama ? data.Asrama : "-" }}
            </td>
            <td class="text-capitalize align-middle">
              {{ data.PoinPelanggaran ? data.PoinPelanggaran : "-" }}
            </td>
            <td class="text-capitalize align-middle">
              {{ data.JumlahPelanggaran ? data.JumlahPelanggaran : "-" }}
            </td>
            <td class="text-capitalize align-middle text-end">
              <nuxt-link :to="`pelanggaran/${data.SK.split('#')[1]}`"
                class="btn btn-sm btn-warning text-xss me-1 text-white rounded-2">
                Record
              </nuxt-link>
              <!-- <i
                class="btn btn-sm btn-warning text-xs me-1 text-white rounded-2"
                >Record</i
              > -->
              <i @click="input(index)" class="btn btn-sm btn-primary text-xs text-white rounded-2">Input</i>
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

@media screen and (max-width: 576px) {
  select {
    width: 100% !important;
  }
}
</style>
