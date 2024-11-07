<template>
  <div>
    <div class="d-flex justify-content-between flex-column flex-md-row mb-3 gap-2">
      <h2>Mutabaah Tahfidz</h2>
      <select v-if="listHalaqah.length > 0" class="form-select" style="font-size: 12px; max-width: max-content;" @change="getHalaqahKoordinator()" v-model="selectedHalaqah">
        <option value="" selected disabled>halaqah</option>
        <option v-for="(data, index) in listHalaqah" :value="data" :key="index">{{ data }}</option>
      </select>

    </div>
    <!-- <div class="row mb-3">
      <div class="col-12 col-md-6 d-flex align-items-center">
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
      </div>
    </div> -->
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
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
    ...mapState('mutabaah', ['santri', 'listHalaqah']),
    ...mapGetters('mutabaah', ['getSelectedHalaqah']),
    selectedHalaqah: {
      get() {
        return this.getSelectedHalaqah
      },
      set(value) {
        this.$store.commit('mutabaah/setState', { key: 'selectedHalaqah', value })
      }
    }
  },
  methods: {
    ...mapActions('mutabaah', ['getHalaqahKoordinator']),
    // ...mapMutations('mutabaah', ['showDetail'])
    showDetail(sk, subject) {
      this.$store.commit('mutabaah/showDetail', { sk, subject })
    }
  },
};
</script>

<style lang="scss" scoped></style>
