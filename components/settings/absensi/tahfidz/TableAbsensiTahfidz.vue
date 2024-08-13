<template>
  <div>
    <div>
      <div class="head d-flex align-items-center mb-3 justify-content-start">
        <h2 class="mb-3 mb-md-0">Absensi Tahfidz</h2>
        <!-- <select v-if="select.length > 0" class="form-select" name="Kelas" @change="getAbsensi" v-model="selectKelas">
          <option value="" selected>-- Kelas --</option>
          <option v-for="(data, index) in select" :key="index" :value="data">
            {{ data }}
          </option>
        </select> -->
      </div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalAbsensiTahfidz />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Asrama</th>
              <th scope="col" class="text-center">Pagi</th>
              <th scope="col" class="text-center">Sore</th>
              <!-- <th scope="col" class="text-end">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in santri" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nis }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Logs?.asrama }}
              </td>
              <!-- pagi -->
              <td class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'absen', 'pagi', data.Logs?.halaqahPagi, data.Logs?.halaqahPagiTime?.split(' ')[0])"
                      :class="(!data.Logs?.halaqahPagi || (data.Logs?.halaqahPagi === '' && data.Logs?.halaqahPagiTime?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqahPagi && data.Logs?.halaqahPagiTime?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqahPagi === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqahPagi && data.Logs?.halaqahPagiTime?.split(' ')[0] === date && (data.Logs?.halaqahPagi !== '' && data.Logs?.halaqahPagi !== 'absen')) ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'terlambat', 'pagi', data.Logs?.halaqahPagi, data.Logs?.halaqahPagiTime?.split(' ')[0])"
                      :class="(!data.Logs?.halaqahPagi || (data.Logs?.halaqahPagi === '' && data.Logs?.halaqahPagiTime?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqahPagi && data.Logs?.halaqahPagiTime?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqahPagi === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqahPagi && data.Logs?.halaqahPagiTime?.split(' ')[0] === date && (data.Logs?.halaqahPagi !== '' && data.Logs?.halaqahPagi !== 'terlambat')) ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'sakit', 'pagi', data.Logs?.halaqahPagi, data.Logs?.halaqahPagiTime?.split(' ')[0])"
                      :class="(!data.Logs?.halaqahPagi || (data.Logs?.halaqahPagi === '' && data.Logs?.halaqahPagiTime?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqahPagi && data.Logs?.halaqahPagiTime?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqahPagi === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqahPagi && data.Logs?.halaqahPagiTime?.split(' ')[0] === date && (data.Logs?.halaqahPagi !== '' && data.Logs?.halaqahPagi !== 'sakit')) ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'izin', 'pagi', data.Logs?.halaqahPagi, data.Logs?.halaqahPagiTime?.split(' ')[0])"
                      :class="(!data.Logs?.halaqahPagi || (data.Logs?.halaqahPagi === '' && data.Logs?.halaqahPagiTime?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqahPagi && data.Logs?.halaqahPagiTime?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqahPagi === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqahPagi && data.Logs?.halaqahPagiTime?.split(' ')[0] === date && (data.Logs?.halaqahPagi !== '' && data.Logs?.halaqahPagi !== 'izin')) ? true : false">Izin</button>
                  </div>
                </div>
              </td>

              <!-- sore -->
              <td class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'absen', 'sore', data.Logs?.halaqahSore, data.Logs?.halaqahSoreTime?.split(' ')[0])"
                      :class="(!data.Logs?.halaqahSore || (data.Logs?.halaqahSore === '' && data.Logs?.halaqahSoreTime?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqahSore && data.Logs?.halaqahSoreTime?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqahSore === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqahSore && data.Logs?.halaqahSoreTime?.split(', ')[0] === date && (data.Logs?.halaqahSore !== '' && data.Logs?.halaqahSore !== 'absen')) ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'terlambat', 'sore', data.Logs?.halaqahSore, data.Logs?.halaqahSoreTime?.split(' ')[0])"
                      :class="(!data.Logs?.halaqahSore || (data.Logs?.halaqahSore === '' && data.Logs?.halaqahSoreTime?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqahSore && data.Logs?.halaqahSoreTime?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqahSore === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqahSore && data.Logs?.halaqahSoreTime?.split(', ')[0] === date && (data.Logs?.halaqahSore !== '' && data.Logs?.halaqahSore !== 'terlambat')) ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'sakit', 'sore', data.Logs?.halaqahSore, data.Logs?.halaqahSoreTime?.split(' ')[0])"
                      :class="(!data.Logs?.halaqahSore || (data.Logs?.halaqahSore === '' && data.Logs?.halaqahSoreTime?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqahSore && data.Logs?.halaqahSoreTime?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqahSore === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqahSore && data.Logs?.halaqahSoreTime?.split(', ')[0] === date && (data.Logs?.halaqahSore !== '' && data.Logs?.halaqahSore !== 'sakit')) ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'izin', 'sore', data.Logs?.halaqahSore, data.Logs?.halaqahSoreTime?.split(' ')[0])"
                      :class="(!data.Logs?.halaqahSore || (data.Logs?.halaqahSore === '' && data.Logs?.halaqahSoreTime?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqahSore && data.Logs?.halaqahSoreTime?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqahSore === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqahSore && data.Logs?.halaqahSoreTime?.split(', ')[0] === date && (data.Logs?.halaqahSore !== '' && data.Logs?.halaqahSore !== 'izin')) ? true : false">Izin</button>
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
    ...mapState("tahfidzAbsensi", ["santri", "permissions", "select", 'date', 'updateData']),
  },
  methods: {
    ...mapActions('tahfidzAbsensi', ['setStatus', 'deleteStatus']),
    ...mapMutations('tahfidzAbsensi', { changeStep: 'setAbsensi' }),
    setAbsensi(sk, type, time, condition, dateTime) {
      const obj = {
        sk, type, time
      }
      if (condition && dateTime === this.date) {
        console.log('hapus')
        this.deleteStatus(obj)
      } else {
        console.log('update')
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
