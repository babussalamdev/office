<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri ? santri.length : 0 }} Santri</span>
          <button class="btn btn-success border-0">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <select class="form-select" v-model="selectedKelas" @change="getSantri()">
          <option selected disabled value="">Kelas</option>
          <option v-for="(data, index) in listKelas" :key="index" :value="data">{{ data.Nama }}</option>
        </select>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" colspan="4">Hafalan Baru</th>
          </tr>
          <tr>
            <th scope="col" class="text-start">Awal</th>
            <th scope="col" class="text-start">Akhir</th>
            <th scope="col" class="text-start">Baru</th>
            <th scope="col" class="text-start">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle" style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 12px; font-weight: 600">{{ data.From }}</td>
            <td class="text-capitalize align-middle" style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 12px; font-weight: 600">{{ data.To }}</td>
            <td class="text-capitalize align-middle">{{ data.Page }} Hal</td>
            <td class="text-capitalize align-middle">{{ data.Juz }} Juz</td>
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
    ...mapState('report/tahfidz/hafalan', ['santri', 'listKelas']),
    ...mapGetters('report/tahfidz/hafalan', ['getSelectedKelas']),
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        this.$store.commit('report/tahfidz/hafalan/setState', { key: 'selectedKelas', value })
      }
    }
  },
  methods: {
    ...mapActions('report/tahfidz/hafalan', ['changeUnit', 'getSantri']),
    // ...mapMutations('mutabaah', ['showDetail'])
    juz(value) {
      const juz = value / 20
      return juz
    }
  },
};
</script>

<style scoped>
tr th, tr td {
  white-space: nowrap;
}

select {
  font-size: 12px;
  width: max-content;
}
</style>
