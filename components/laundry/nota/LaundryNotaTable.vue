<template>
  <div>
    <div class="row">
      <div class="col-8 d-flex align-items-center">
        <h2 class="mb-0">Nota</h2>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <button type="button" class="btn btn-primary btn-sm add" @click="dataNotaLaundryAdd">
          Tambah Data
        </button>
      </div>
    </div>
    <div class="mb-3">
    </div>
    <LaundryNotaModalAdd />
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="nowrap">ID</th>
            <th scope="col" class="nowrap">Nama Keranjang</th>
            <th scope="col" class="nowrap">Volume</th>
            <th scope="col" class="nowrap">Status</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in datas" :key="index">
            <td class="align-middle">{{ data.SK.split('#')[1] }}</td>
            <td class="align-middle">{{ data.Name }}</td>
            <td class="align-middle">{{ data.Volume }}</td>
            <td class="align-middle">{{ data.Status }}</td>
            <td
              class="text-capitalize align-middle text-end w-auto d-flex align-items-center gap-1 justify-content-end">
              <a href="javascript:;" @click="detailView(data.SK)">
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
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/nota', ['datas'])
  },
  methods: {
    ...mapActions('laundry/nota', ['dataNotaLaundryAdd']),
    detailView(receipt) {
      this.$router.push(`/laundry/nota/${receipt.replace('#', '%23')}`)
    },
  },
};
</script>

<style scoped>
input {
  width: 17px;
  height: 17px;
}

.nowrap {
  white-space: nowrap;
}

.add {
  font-size: 12px;
}
</style>
