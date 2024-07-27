<template>
  <div>
    <div class="mb-3">
      <h2>Rekap Tahfidz</h2>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">Nama / Nis</th>
            <th scope="col">Hafalan Baru</th>
            <th scope="col">Murojaah</th>
            <th scope="col">Tilawah / Murojaah mandiri</th>
            <th scope="col">Tahsin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
              <p class="text-secondary mt-1">{{ data.Nis }}</p>
            </td>
            <td class="text-center">
              <a href="javascript:;" @click="showDetail(data.SK, 'ziyadah')">
                <i class="material-icons bg-primary p-2 text-white rounded-circle">library_add</i>
              </a>
            </td>
            <td class="text-center">
              <a href="javascript:;" @click="showDetail(data.SK, 'murojaah')">
                <i class="material-icons bg-warning p-2 text-white rounded-circle">restart_alt</i>
              </a>
            </td>
            <td class="text-center">
              <a href="javascript:;" @click="showDetail(data.SK, 'tilawah')">
                <i class="material-icons bg-success p-2 text-white rounded-circle">auto_stories</i>
              </a>
            </td>
            <td class="text-center align-middle">
              <a href="javascript:;" @click="showDetail(data.SK, 'tahsin')">
                <i class="material-icons bg-danger p-2 text-white rounded-circle">mic</i>
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
          Nama: "Fauzan Gunawan",
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
