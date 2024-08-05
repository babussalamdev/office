<template>
  <div>
    <div class="mb-3">
      <h2>Data Finance Laundry</h2>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">No</th>
            <th scope="col" class="">UUID</th>
            <th scope="col" class="">Tanggal</th>
            <th scope="col" class="">Type</th>
            <th scope="col" class="">Transaksi</th>
            <th scope="col" class="">Debet</th>
            <th scope="col" class="">Kredit</th>
            <th scope="col" class="">Sisa Saldo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dummy" :key="index">
            <td class="text-capitalize align-middle">{{ data.Sort }}</td>
            <td class="text-capitalize align-middle">{{ data.UUID }}</td>
            <td class="text-capitalize align-middle">{{ data.Tanggal }}</td>
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
            </td>
            <td class="text-capitalize align-middle">{{ data.Awal }}</td>
            <td class="text-capitalize align-middle">{{ data.Akhir }}</td>
            <td class="text-capitalize align-middle">{{ data.TotalLembur }} Jam</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions} from 'vuex'
export default {
  data() {
    return {
      dummy: [
        {
          Sort: 1,
          UUID: '959204',
          Tanggal: '07/08/2024',
          Type: 'Debt',
          Transaksi: 'Uang buat beli mesin cuci',
          Debt: '100000'
        },
      ],
    };
  },
  computed: {
    ...mapState('mutabaah', ['santri'])
  },
  methods: {
    // ...mapMutations('mutabaah', ['showDetail'])
    showDetail(sk, subject) {
      this.$store.commit('mutabaah/showDetail', { sk, subject })
    }
  },
};
</script>

<style lang="scss" scoped></style>
