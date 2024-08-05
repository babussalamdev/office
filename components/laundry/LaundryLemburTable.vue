<template>
  <div>
    <div class="mb-3">
      <h2>Data lembur Laundry</h2>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">No</th>
            <th scope="col" class="">UUID</th>
            <th scope="col" class="">Tanggal</th>
            <th scope="col" class="">Nama</th>
            <th scope="col" class="">Awal</th>
            <th scope="col" class="">Akhir</th>
            <th scope="col" class="">Total Lembur</th>
            <th scope="col" class="text-end">Action</th>
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
            <td class="text-capitalize align-middle text-end">
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
import { mapState, mapMutations, mapActions} from 'vuex'
export default {
  data() {
    return {
      dummy: [
        {
          Sort: 1,
          UUID: '959204',
          Tanggal: '07/08/2024',
          Nama: "Fauzan Gunawan",
          Awal: '07.00',
          Akhir: '10.00',
          TotalLembur: '3',
          Nis: "3423321",
        },
        {
          Sort: 1,
          UUID: '959204',
          Tanggal: '07/08/2024',
          Nama: "Fauzan Gunawan",
          Awal: '07.00',
          Akhir: '10.00',
          TotalLembur: '3',
          Nis: "3423321",
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
