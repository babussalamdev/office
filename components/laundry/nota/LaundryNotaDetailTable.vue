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
        <p class="mb-2">Keranjang {{ keranjang }}</p>
        <p class="mb-0">{{ tanggal }}</p>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center">
        <nuxt-link :to="`/laundry/nota/form/${id.replace(/#/g, '%23')}`" style="font-size: 12px;" type="button"
          class="btn btn-primary btn-sm">
          Tambah Data
        </nuxt-link>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="nowrap">Nama Santri</th>
            <th scope="col" class="nowrap">Asrama</th>
            <th scope="col" class="text-center">Jumlah</th>
            <!-- <th scope="col" class="nowrap text-end">Action</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in datasDetail" :key="index">
            <td class="text-capitalize align-middle">{{ data.Name }}</td>
            <td class="text-capitalize align-middle">{{ data.Asrama ? data.Asrama : '-' }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.QTY }}</td>
            <!-- <td class="text-capitalize align-middle text-end">
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
            </td> -->
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
  computed: {
    ...mapState('laundry/nota', ['datasDetail']),
    keranjang() {
      const part2 = this.id.split("#")[1];
      const identity = part2.slice(-3);
      return identity
    },
    tanggal() {
      const today = new Date();
      const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(today);
      return formattedDate
    },
    // filteredData() {
    //   const data = this.dummyData.filter((x) => x.Receipt === this.id)
    //   return data
    // }
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
</style>
