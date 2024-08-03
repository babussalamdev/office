<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ dummy.length }} Santri</span>
          <button class="btn btn-success border-0">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">From</span>
          <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="start">
          <span class="input-group-text" id="basic-addon1">To</span>
          <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="end">
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" colspan="4">Hafalan Baru</th>
            <th scope="col" colspan="5">Ketidakhadiran</th>
          </tr>
          <tr>
            <th scope="col" class="text-start">Awal</th>
            <th scope="col" class="text-start">Akhir</th>
            <th scope="col" class="text-start">Baru</th>
            <th scope="col" class="text-start">Jumlah</th>
            <th scope="col" class="text-center bg-primary">T</th>
            <th scope="col" class="text-center bg-warning">S</th>
            <th scope="col" class="text-center bg-secondary">I</th>
            <th scope="col" class="text-center bg-danger">A</th>
            <th scope="col" class="text-center">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dummy" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle">{{ data.Awal }}</td>
            <td class="text-capitalize align-middle">{{ data.Akhir }}</td>
            <td class="text-capitalize align-middle">{{ data.Baru }}</td>
            <td class="text-capitalize align-middle">{{ juz(data.Baru) }} Juz</td>
            <td class="text-capitalize align-middle text-center">{{ data.T }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.S }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.I }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.A }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.T + data.S + data.A + data.I }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      dummy: [
        {
          Nama: "Muhammad Fauzan Gunawan",
          Awal: 'Annaba:30',
          Akhir: 'Annaziat:30',
          Baru: '23',
          T: 0,
          S: 2,
          I: 1,
          A: 3,
        },
        {
          Nama: "Yazid Gunawan",
          Awal: 'Annaba:29',
          Akhir: 'Annaziat:40',
          Baru: '42',
          T: 1,
          S: 3,
          I: 1,
          A: 0,
        },
      ],
    };
  },
  computed: {
    ...mapState('rekap', ['santri']),
    ...mapGetters('rekap', ['getStart', 'getEnd']),
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        const obj = { key: 'start', value}
        this.$store.commit('rekap/setState', obj)
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        const obj = { key: 'end', value}
        this.$store.commit('rekap/setState', obj)
      }
    }
  },
  methods: {
    // ...mapMutations('mutabaah', ['showDetail'])
    showDetail(sk, subject) {
      this.$store.commit('mutabaah/showDetail', { sk, subject })
    },
    juz(value) {
      const juz = value / 20
      return juz
    }
  },
};
</script>

<style lang="scss" scoped></style>
