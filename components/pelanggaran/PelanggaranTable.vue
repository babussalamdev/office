<template>
  <div class="animate__animated animate__fadeInUp">
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-3 mb-md-0 d-flex align-items-center">
        <h2>Table Data Pelanggaran</h2>
      </div>
      <div class="col-12 col-md-6 d-flex flex-wrap flex-md-nowrap gap-2 gap-md-0 justify-content-end">
        <div class="input-group order-2 order-md-1" v-if="santri.length > 0">
          <label for="search" class="input-group-text">
            <i class="material-icons">search</i>
          </label>
          <input id="search" type="text" class="form-control" v-model="search" placeholder="Cari Nama Santri">
        </div>
        <select v-if="select.length > 0" class="form-select" name="Kelas" @change="getPelanggaran"
          v-model="selectKelas">
          <option value="" selected>-- Kelas --</option>
          <option v-for="(data, index) in select" :key="index" :value="data">
            {{ data }}
          </option>
        </select>
      </div>
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
          <tr v-for="(data, index) in filteredDatas" :key="index">
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
              {{ data.Poin ? data.Poin : "-" }}
            </td>
            <td class="text-capitalize align-middle">
              {{ data.Pelanggaran ? data.Pelanggaran : "-" }}
            </td>
            <td class="text-capitalize align-middle text-end">
              <nuxt-link :to="`pelanggaran/${data.SK.replace('#', '%23')}`"
                class="btn btn-sm btn-warning text-xss me-1 text-white rounded-2">
                Record
              </nuxt-link>
              <i @click="input(index)" v-if="hasRequiredPermission('input')" class="btn btn-sm btn-primary text-xs text-white rounded-2">Input</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn-group text-center float-end mt-3 mb-5" role="group">
      <button @click="page = 1" :disabled="page === 1" type="button" class="btn btn-primary btn-sm">
        &laquo;
      </button>
      <button @click="page--" :disabled="page === 1" type="button" class="btn btn-primary  btn-sm">
        Prev
      </button>
      <button class="btn btn-dark  btn-sm disabled">{{ `${page ? page : 1}` }}</button>
      <button @click="page++" :disabled="page >= Math.ceil(santri?.length / perPage)" class="btn btn-primary  btn-sm">
        Next
      </button>
      <button @click="page = Math.ceil(santri.length / perPage)" :disabled="page >= Math.ceil(santri.length / perPage)"
        type="button" class="btn btn-primary  btn-sm">
        &raquo;
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      btn: true,
    };
  },
  computed: {
    ...mapState("pelanggaran", ["santri", "select", "permissions", 'perPage']),
    ...mapGetters('pelanggaran', ['getSelectKelas', 'filteredDatas', 'getSearch', 'getPage']),
    selectKelas: {
      get() {
        return this.getSelectKelas
      },
      set(value) {
        const obj = { key: 'selectKelas', value }
        this.$store.commit('pelanggaran/setState', obj)
      }
    },
    page: {
      get() {
        return this.getPage
      },
      set(value) {
        const obj = { key: 'page', value }
        this.$store.commit('pelanggaran/setState', obj)
      }
    },
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        const obj = { key: 'search', value }
        this.$store.commit('pelanggaran/setState', obj)
      }
    },
  },
  methods: {
    ...mapActions('pelanggaran', ['getPelanggaran']),
    async input(index) {
      $("#inputModal").modal("show");
      const updateData = this.santri[index];
      this.$store.commit("pelanggaran/updateData", updateData);
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

select {
  font-size: 12px;
  width: 100px;
}

.input-group label,
.input-group input,
.input-group i {
  font-size: 12px !important;
}

@media screen and (max-width: 576px) {
  select {
    width: 100% !important;
  }
}
</style>
