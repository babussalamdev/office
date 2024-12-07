<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 d-flex flex-column justify-content-center mb-3 mb-md-0">
        <h2 class="mb-3">Tag Register</h2>
        <select v-model="selectedAsrama" class="form-select" style="font-size: 12px; max-width: max-content;"
          @change="getDataByAsrama()">
          <option value="" selected disabled>asrama</option>
          <option v-for="(data, index) in listAsrama" :key="index" :value="data.Nama">{{ data.Nama }}</option>
        </select>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end align-items-end">
        <div class="input-group">
          <span style="font-size: 12px !important;" class="bi bi-search input-group-text"></span>
          <input style="font-size: 12px !important;" type="text" v-model="search" class="form-control"
            placeholder="Search">
          <button style="font-size: 12px !important;" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalAddDataBag">Input
            Data</button>
        </div>
      </div>
    </div>
    <LaundryRegisterModalUpdate />
    <LaundryRegisterModalAdd />
    <div class="table-responsive white-space-nowrap animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="nowrap">Nama Santri</th>
            <th scope="col" class="nowrap">Asrama</th>
            <th scope="col" class="nowrap">Bag</th>
            <th scope="col" class="nowrap">Status</th>
            <th scope="col" class="nowrap text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dataItem, index) in datas" :key="index">
            <td class="text-capitalize align-middle nowrap">{{ dataItem.Name }}</td>
            <td class="text-capitalize align-middle nowrap">{{ dataItem.Asrama }}</td>
            <td class="text-capitalize align-middle nowrap">{{ dataItem.BagID }}</td>
            <td class="text-capitalize align-middle nowrap">{{ dataItem.Status }}</td>
            <td class="text-capitalize align-middle text-end">
              <a href="javascript:;" @click="editItem(dataItem.BagID, dataItem.Status)">
                <button class="btn btn-sm" :class="{
                  'bg-primary': dataItem.Status === 'active',
                  'bg-secondary': dataItem.Status !== 'active',
                  'border-secondary': !(dataItem.Status === 'active' || dataItem.Status === 'lost')
                }" :disabled="dataItem.Status === 'lost' || dataItem.Status === 'active' ? false : true">
                  <i class='bx bx-power-off text-white'></i>
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/register', ['listAsrama', 'datas']),
    ...mapGetters('laundry/register', ['getSearch', 'getSelectedAsrama']),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('laundry/register/setState', { key: 'search', value })
      }
    },
    selectedAsrama: {
      get() {
        return this.getSelectedAsrama
      },
      set(value) {
        this.$store.commit('laundry/register/setState', { key: 'selectedAsrama', value })
      }
    }
  },
  methods: {
    ...mapActions('laundry/register', ['getDataByAsrama', 'editRegisterToActive', 'addDataBag']),
    ...mapMutations('laundry/register', ['editRegisterLaundry']),
    editItem(sk) {
      const data = this.datas.find((x) => x.BagID === sk)
      if ( data.Status === 'lost') {
        this.editRegisterToActive(sk)
      } else {
        this.editRegisterLaundry(sk)
      }
    }
  },
};
</script>

<style scoped></style>
