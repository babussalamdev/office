<template>
  <div>
    <div class="mb-3 d-flex align-items-center gap-3">
      <nuxt-link to="/laundry/nota">
        <i class='bx bx-left-arrow-alt p-2 text-white rounded-circle bg-primary'></i>
      </nuxt-link>
      <h2 class="fw-bold">Detail Nota</h2>
    </div>
    <div class="row mb-3">
      <div class="col-6">
        <p class="mb-2">No Keranjang : {{ keranjang }}</p>
        <p class="mb-0">Tanggal : {{ tanggal }}</p>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center">
        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Tambah Data
        </button>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="nowrap">Nama Santri</th>
            <th scope="col" class="nowrap">Asrama</th>
            <th scope="col">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in filteredData" :key="index">
            <td class="text-capitalize align-middle">{{ index + 1 }}</td>
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle">{{ data.Asrama }}</td>
            <td class="text-capitalize align-middle">{{ data.Jumlah }}</td>
            <td class="text-capitalize align-middle nowrap">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="data.Keterangan === 'Lunas'"
                  id="defaultCheck1">
              </div>
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
  props: ['id'],
  data() {
    return {
      // dummy: [
      //   {
      //     No: 1,
      //     Receipt: '2h54d8',
      //     Keranjang: 1,
      //     Tanggal: '08/08/24'
      //   },
      // ],
    };
  },
  computed: {
    ...mapState('laundry/input', ['dummyData']),
    ...mapState('laundry/nota', ['dummy']),
    keranjang() {
      return this.id.split('#')[0]
    },
    tanggal() {
      const index = this.dummy.findIndex((x) => x.Receipt === this.id)
      const tanggal = this.dummy[index].Tanggal
      return tanggal
    },
    filteredData() {
      const data = this.dummyData.filter((x) => x.Receipt === this.id)
      return data
    }
  },
  methods: {
    // ...mapMutations('mutabaah', ['showDetail'])
    showDetail(sk, subject) {
      this.$store.commit('mutabaah/showDetail', { sk, subject })
    },
    detailView(receipt) {
      this.$router.push(`/laundry/nota/${receipt}`)
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

button {
  font-size: 12px;
}
</style>
