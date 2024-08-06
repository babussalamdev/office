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
            <th scope="col" class="">Uraian / Transaksi</th>
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
            <td class="text-capitalize align-middle">{{ data.Type }}</td>
            <td class="text-capitalize align-middle" :class="data.Type === 'Kredet' ? 'ps-5' : ''">{{ data.Transaksi }}</td>
            <td class="text-capitalize align-middle">{{ data.Debt ? `Rp ${rupiah(data.Debt)}` : '' }}</td>
            <td class="text-capitalize align-middle">{{ data.Kredet ? `Rp ${rupiah(data.Kredet) }` : '' }}</td>
            <td class="text-capitalize align-middle">Rp {{ rupiah(data.SisaSaldo) }}</td>
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
          Transaksi: 'Dana Bos',
          Debt: '4000000',
          Kredet: '',
          SisaSaldo: '4000000'
        },
        {
          Sort: 2,
          UUID: '9ds404',
          Tanggal: '08/08/2024',
          Type: 'Kredet',
          Transaksi: 'Uang Beli Mesin Cuci',
          Debt: '',
          Kredet: '3500000',
          SisaSaldo: '500000'
        },
        {
          Sort: 3,
          UUID: 'sdg434',
          Tanggal: '09/08/2024',
          Type: 'Kredet',
          Transaksi: 'Makan Makan',
          Debt: '',
          Kredet: '350000',
          SisaSaldo: '150000'
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
    },
    rupiah(a) {
      return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(a);
    },
  },
};
</script>

<style lang="scss" scoped></style>
