<template>
  <div>
    <div>
      <div class="head d-flex align-items-center mb-3 justify-content-start">
        <h2 class="mb-3 mb-md-0">Absensi Pengampu</h2>
        <!-- <select v-if="select.length > 0" class="form-select" name="Kelas" @change="getAbsensi" v-model="selectKelas">
          <option value="" selected>-- Kelas --</option>
          <option v-for="(data, index) in select" :key="index" :value="data">
            {{ data }}
          </option>
        </select> -->
      </div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalAbsensiPengampu />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIP</th>
              <th scope="col" class="text-center">Pagi</th>
              <th scope="col" class="text-center">Sore</th>
              <!-- <th scope="col" class="text-end">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in pegawai" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nis }}</p>
              </td>
              <!-- pagi -->
              <td class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'absen', 'pagi', data.pagi?.status, data.pagi?.time?.split(' ')[0])"
                      :class="(!data.pagi?.status || (data.pagi?.status === '' && data.pagi?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.pagi?.status && data.pagi?.time?.split(' ')[0] !== date) ? 'bg-white' : data.pagi?.status === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.pagi?.status && data.pagi?.time?.split(' ')[0] === date && (data.pagi?.status !== '' && data.pagi?.status !== 'absen')) ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'terlambat', 'pagi', data.pagi?.status, data.pagi?.time?.split(' ')[0])"
                      :class="(!data.pagi?.status || (data.pagi?.status === '' && data.pagi?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.pagi?.status && data.pagi?.time?.split(' ')[0] !== date) ? 'bg-white' : data.pagi?.status === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.pagi?.status && data.pagi?.time?.split(' ')[0] === date && (data.pagi?.status !== '' && data.pagi?.status !== 'terlambat')) ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'sakit', 'pagi', data.pagi?.status, data.pagi?.time?.split(' ')[0])"
                      :class="(!data.pagi?.status || (data.pagi?.status === '' && data.pagi?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.pagi?.status && data.pagi?.time?.split(' ')[0] !== date) ? 'bg-white' : data.pagi?.status === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.pagi?.status && data.pagi?.time?.split(' ')[0] === date && (data.pagi?.status !== '' && data.pagi?.status !== 'sakit')) ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'izin', 'pagi', data.pagi?.status, data.pagi?.time?.split(' ')[0])"
                      :class="(!data.pagi?.status || (data.pagi?.status === '' && data.pagi?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.pagi?.status && data.pagi?.time?.split(' ')[0] !== date) ? 'bg-white' : data.pagi?.status === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.pagi?.status && data.pagi?.time?.split(' ')[0] === date && (data.pagi?.status !== '' && data.pagi?.status !== 'izin')) ? true : false">Izin</button>
                  </div>
                </div>
              </td>

              <!-- sore -->
              <td class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'absen', 'sore', data.sore?.status, data.sore?.time?.split(' ')[0])"
                      :class="(!data.sore?.status || (data.sore?.status === '' && data.sore?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.sore?.status && data.sore?.time?.split(' ')[0] !== date) ? 'bg-white' : data.sore?.status === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.sore?.status && data.sore?.time?.split(', ')[0] === date && (data.sore?.status !== '' && data.sore?.status !== 'absen')) ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'terlambat', 'sore', data.sore?.status, data.sore?.time?.split(' ')[0])"
                      :class="(!data.sore?.status || (data.sore?.status === '' && data.sore?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.sore?.status && data.sore?.time?.split(' ')[0] !== date) ? 'bg-white' : data.sore?.status === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.sore?.status && data.sore?.time?.split(', ')[0] === date && (data.sore?.status !== '' && data.sore?.status !== 'terlambat')) ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'sakit', 'sore', data.sore?.status, data.sore?.time?.split(' ')[0])"
                      :class="(!data.sore?.status || (data.sore?.status === '' && data.sore?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.sore?.status && data.sore?.time?.split(' ')[0] !== date) ? 'bg-white' : data.sore?.status === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.sore?.status && data.sore?.time?.split(', ')[0] === date && (data.sore?.status !== '' && data.sore?.status !== 'sakit')) ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'izin', 'sore', data.sore?.status, data.sore?.time?.split(' ')[0])"
                      :class="(!data.sore?.status || (data.sore?.status === '' && data.sore?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.sore?.status && data.sore?.time?.split(' ')[0] !== date) ? 'bg-white' : data.sore?.status === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.sore?.status && data.sore?.time?.split(', ')[0] === date && (data.sore?.status !== '' && data.sore?.status !== 'izin')) ? true : false">Izin</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      selectKelas: "",
    };
  },
  computed: {
    ...mapState("pengampu", ["pegawai", "permissions", "select", 'date', 'updateData']),
  },
  methods: {
    ...mapActions('pengampu', ['setStatus', 'deleteStatus']),
    ...mapMutations('pengampu', { changeStep: 'setAbsensi' }),
    setAbsensi(sk, type, time, condition, dateTime) {
      const obj = {
        sk, type, time, condition
      }
      if (condition && dateTime === this.date) {
        this.deleteStatus(obj)
      } else {
        this.changeStep(obj)
      }
    },
    getAbsensi() {
      const kelas = this.selectKelas;
      this.$store.dispatch("asramaAbsensi/getAbsensi", kelas);
    },
  },
};
</script>

<style scoped>
.select-input {
  width: 162px !important;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.box-radio button {
  width: 80px;
  height: 25px;
  border: 1px solid grey;
  cursor: pointer;
  border-radius: 2px;
}

.box-radio button {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .box-radio input:checked+label {
  background: grey;
  color: #fff;
} */
</style>
