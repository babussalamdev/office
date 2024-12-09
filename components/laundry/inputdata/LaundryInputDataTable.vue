<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
        <h2>Data Santri Laundry</h2>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <span style="font-size: 12px !important;" class="bi bi-search input-group-text"></span>
          <input style="font-size: 12px !important;" type="text" v-model="search" class="form-control"
            placeholder="Search">
          <button @click="addDataLaundry" style="font-size: 12px !important;" class="btn btn-sm btn-primary">Input Data</button>
        </div>
      </div>
    </div>
    <LaundryModalEdit />
    <!-- <LaundryModalAdd /> -->
    <div class="table-responsive white-space-nowrap animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="nowrap">Nama Santri</th>
            <th scope="col" class="nowrap text-center">Asrama</th>
            <th scope="col" class="nowrap text-center">Jumlah Laundry</th>
            <th scope="col" class="nowrap text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dummyData" :key="index">
            <td class="text-capitalize align-middle nowrap">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle nowrap text-center">{{ data.Asrama }}</td>
            <td class="text-capitalize align-middle nowrap text-center">{{ data.Jumlah }}</td>
            <td class="text-capitalize align-middle text-end">
              <a href="javascript:;" @click="editDataLaundry(data.Nama)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil text-dark"></i>
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
    ...mapState('laundry/input', ['dummyData']),
    ...mapGetters('laundry/input', ['getSearch']),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('laundry/input/setState', { key: 'search', value })
      }
    }
  },
  methods: {
    ...mapActions('laundry/input', ['']),
    ...mapMutations('laundry/input', ['editDataLaundry', 'addDataLaundry'])
  },
};
</script>

<style scoped></style>
