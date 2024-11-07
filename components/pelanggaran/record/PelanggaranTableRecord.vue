<template>
  <div>
    <div class="">
      <div class="head d-flex align-items-center mb-3 justify-content-between animate__animated animate__fadeInUp">
        <h2 class="mb-3 mb-md-0">
          <strong class="text-capitalize fw-bold">{{ nama }}</strong> - Record
          Pelanggaran
        </h2>
        <nuxt-link to="/pelanggaran" class="text-dark text-decoration-none"> Back</nuxt-link>
      </div>
      <div class="table-responsive animate__animated animate__fadeInUp">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Tanggal / Waktu</th>
              <th scope="col">Jenis Pelanggaran</th>
              <th scope="col">Level</th>
              <th scope="col">Poin</th>
              <th scope="col">Tindak Lanjut</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in record" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Date }}</h1>
                <p class="text-secondary mt-1">{{ data.Time }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Nama ? data.Nama : "-" }}
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Level ? data.Level : "-" }}
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Poin ? data.Poin : "-" }}
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Solusi ? data.Solusi : "-" }}
              </td>
              <td class="text-capitalize align-middle text-end">
                <i @click="editItem(data.SK)" v-if="hasRequiredPermission('edit')" class="btn btn-sm btn-warning text-xs me-1 text-white rounded-2">Edit</i>
                <i @click="deleteItem(data.SK)" v-if="hasRequiredPermission('delete')" class="btn btn-sm btn-danger text-xs text-white rounded-2">Delete</i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PelanggaranModalRecord />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: ["nama"],
  computed: {
    ...mapState("pelanggaran", ["santri", "select", "permissions", "record", 'updateData']),
  },
  methods: {
    ...mapActions('pelanggaran', { changeAction: 'deleteItem' }),
    ...mapMutations('pelanggaran', ['editItem']),
    deleteItem(sk) {
      const obj = { sk, id: this.$route.params.id }
      this.changeAction(obj)
    },
    hasRequiredPermission(permission) {
      if ( this.permissions ) {
        return this.permissions?.includes(permission)
      } else {
        return false
      }
    }
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

a:hover {
  color: red;
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
