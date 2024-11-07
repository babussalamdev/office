<template>
  <div>
    <div class="row">
      <div class="col-8 d-flex align-items-center">
        <h2 class="mb-0">Data Rekap Nota</h2>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <button type="button" class="btn btn-primary btn-sm add" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Tambah Data
        </button>
      </div>
    </div>
    <div class="mb-3">
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">No</th>
            <th scope="col" class="nowrap">Receipt No</th>
            <th scope="col" class="nowrap">No Keranjang</th>
            <th scope="col">Tanggal</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dummy" :key="index">
            <td class="text-capitalize align-middle">{{ index + 1 }}</td>
            <td class="text-capitalize align-middle">{{ data.Receipt }}</td>
            <td class="text-capitalize align-middle">{{ data.Keranjang }}</td>
            <td class="text-capitalize align-middle">{{ data.Tanggal }}</td>
            <td
              class="text-capitalize align-middle text-end w-auto d-flex align-items-center gap-1 justify-content-end">
              <a href="javascript:;" @click="detailView(data.Receipt)">
                <button class="btn btn-sm btn-primary">
                  <i class="bx bx-detail text-white"></i>
                </button>
              </a>
              <a href="javascript:;">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil text-dark"></i>
                </button>
              </a>
              <a href="javascript:;">
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
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/nota', ['dummy'])
  },
  methods: {
    // ...mapMutations('mutabaah', ['showDetail'])
    showDetail(sk, subject) {
      this.$store.commit('mutabaah/showDetail', { sk, subject })
    },
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
