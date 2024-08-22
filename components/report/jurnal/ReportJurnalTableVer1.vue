<template>
  <div>
    <div>
      <div class="animate__animated animate__fadeInUp">
        <h2 class="mb-2">Jurnal Page</h2>
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex">
            <select class="form-select" v-model="selectedKelas" @change="getMapel">
              <option value="" selected disabled>Kelas</option>
              <option v-for="(data, index) in listKelas" :key="index" :value="data.Nama">{{ data.Nama }}</option>
            </select>
            <select class="form-select" v-model="selectedMapel" @change="getData">
              <option value="" selected disabled>Mapel</option>
              <option v-for="(data, index) in listMapel" :key="index" :value="data">{{ data }}</option>
            </select>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" class="text-capitalize">Waktu</th>
                <th scope="col" class="text-capitalize">judul / pembahasan</th>
                <th scope="col" class="text-capitalize">catatan kejadian / solusi</th>
                <th scope="col" class="text-capitalize">Jam Mengajar</th>
                <th scope="col" class="text-capitalize">Pengajar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in values" :key="index">
                <td class="text-capitalize" scope="col">{{ data.SK.split('#')[2] }}</td>
                <td class="text-capitalize" scope="col">{{ data.Description }}</td>
                <td class="text-capitalize" scope="col">{{ data.Occurrence }}</td>
                <td class="text-capitalize" scope="col">{{ data.Session }}</td>
                <td class="text-capitalize" scope="col">{{ data.PIC }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="btn-group text-center float-end mt-3 mb-5" role="group">
        <button @click="page = 1" :disabled="page === 1" type="button" class="btn btn-primary btn-sm">
          &laquo;
        </button>
        <button @click="page--" :disabled="page === 1" type="button" class="btn btn-primary  btn-sm">
          Prev
        </button>
        <button class="btn btn-dark  btn-sm disabled">{{ `${page ? page : 1}` }}</button>
        <button @click="page++" :disabled="page >= Math.ceil(santri?.length / perPage)" class="btn btn-primary  btn-sm">
          Next
        </button>
        <button @click="page = Math.ceil(santri.length / perPage)" :disabled="page >= Math.ceil(santri.length / perPage)"
          type="button" class="btn btn-primary  btn-sm">
          &raquo;
        </button>
      </div> -->
      </div>
      <JurnalModal />
      <JurnalModalUpdate />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('report/jurnal', ['listKelas', 'listMapel', 'values']),
    ...mapGetters('report/jurnal', ['getSelectedKelas', 'getSelectedMapel']),
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        this.$store.commit('report/jurnal/setState', { key: 'selectedKelas', value })
      }
    },
    selectedMapel: {
      get() {
        return this.getSelectedMapel
      },
      set(value) {
        this.$store.commit('report/jurnal/setState', { key: 'selectedMapel', value })
      }
    }
  },
  methods: {
    ...mapActions('report/jurnal', ['getMapel', 'getData'])
  },
}
</script>

<style scoped>
tr td {
  padding: 20px !important;
}
a {
  font-size: 12px;
}

select {
  font-size: 12px;
  width: max-content !important;
}

.input-group label,
.input-group input,
.input-group i,
.input-group span,
button {
  font-size: 12px;
}

button {
  white-space: nowrap;
}
</style>
