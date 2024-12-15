<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
        <h2>Inventory Table</h2>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <span style="font-size: 12px !important;" class="bi bi-search input-group-text"></span>
          <input style="font-size: 12px !important;" v-model="search" type="text" class="form-control"
            placeholder="Search">
          <button style="font-size: 12px !important;" class="btn btn-sm btn-primary" data-bs-toggle="modal"
            data-bs-target="#laundryInventoryModal">Input Data</button>
        </div>
      </div>
    </div>
    <LaundryInventoryModalAdd />
    <LaundryInventoryModalEdit />
    <div class="table-responsive white-space-nowrap animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="nowrap">CreatedAt</th>
            <th scope="col" class="nowrap">Supplier</th>
            <th scope="col" class="nowrap">Item</th>
            <th scope="col" class="nowrap text-center">Kuantitas</th>
            <th scope="col" class="nowrap">Amount</th>
            <th scope="col" class="nowrap text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in filteredDatas" :key="index">
            <td class="text-capitalize align-middle nowrap">{{ data.CreatedAt }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Supplier }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Name }}</td>
            <td class="text-capitalize align-middle nowrap text-center">{{ data.Qty }}</td>
            <td class="text-capitalize align-middle nowrap">{{ rupiah(data.Amount) }}</td>
            <td class="text-capitalize align-middle text-end">
              <a href="javascript:;" @click="editItem(data.SK)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil text-dark"></i>
                </button>
              </a>
              <a href="javascript:;" @click="deleteItem(data.SK)">
                <button class="btn btn-sm btn-danger">
                  <i class="bx bx-trash text-white"></i>
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
import formatSet from '~/mixins/formatSet';
export default {
  mixins: [formatSet],
  computed: {
    ...mapState('laundry/inventory', ['datas']),
    ...mapGetters('laundry/inventory', ['getSearch', 'filteredDatas']),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('laundry/inventory/setState', { key: 'search', value })
      }
    }
  },
  methods: {
    ...mapActions('laundry/inventory', ['deleteItem']),
    ...mapMutations('laundry/inventory', ['editItem'])
  },
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
