<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text bg-secondary text-white" id="basic-addon1">{{ santri.length }} Santri</span>
          <button class="btn btn-success border-0">Export</button>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <select class="form-select" @change="getSantri()" v-model="selectedKelas">
          <option value="">-- kelas --</option>
          <option v-for="(data, index) in kelas" :key="index" :value="data">{{ data.Nama }}</option>
        </select>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" rowspan="2" class="text-start">Nama</th>
            <th scope="col" rowspan="2" class="text-start">Halaqah</th>
            <th scope="col" colspan="5">Ketidakhadiran</th>
            <th scope="col" rowspan="2" class="text-end">Action</th>
          </tr>
          <tr>
            <th scope="col" class="text-center bg-primary">T</th>
            <th scope="col" class="text-center bg-warning">S</th>
            <th scope="col" class="text-center bg-secondary">I</th>
            <th scope="col" class="text-center bg-danger">A</th>
            <th scope="col" class="text-center">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle">{{ data.Halaqah }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.terlambat }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.sakit }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.izin }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.absen }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.terlambat + data.izin + data.sakit + data.absen
              }}</td>
            <td class="text-end align-middle">
              <nuxt-link :to="`/report/tahfidz/absensi/${data.SK.replace('#', '%23')}`">
                <button class="btn btn-primary">
                  <i class="material-symbols-outlined">
                    info
                  </i>
                </button>
              </nuxt-link>
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
  computed: {
    ...mapState('report/tahfidz/absensi', ['santri', 'kelas']),
    ...mapGetters('report/tahfidz/absensi', ['getKelas']),
    selectedKelas: {
      get() {
        return this.getKelas
      },
      set(value) {
        const obj = { key: 'selectedKelas', value }
        this.$store.commit('report/tahfidz/absensi/setState', obj)
      }
    },
  },
  methods: {
    ...mapActions('report/tahfidz/absensi', ['getSantri']),
    // ...mapMutations('mutabaah', ['showDetail'])
    juz(value) {
      const juz = value / 20
      return juz
    }
  },
};
</script>

<style scoped>
tr th,
tr td {
  white-space: nowrap;
}

select {
  font-size: 12px;
  width: max-content;
}

/* button {
  padding: 2px 5px 0.5px !important;
}

button i {
  font-size: 14px !important;
  padding: -5px !important;
} */
</style>
