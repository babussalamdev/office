<template>
  <div>
    <div>
      <div class="head d-flex align-items-center mb-3 justify-content-start">
        <h2 class="mb-3 mb-md-0">Absensi Operator Laundry</h2>
        <!-- <select v-if="select.length > 0" class="form-select" name="Kelas" @change="getAbsensi" v-model="selectKelas">
          <option value="" selected>-- Kelas --</option>
          <option v-for="(data, index) in select" :key="index" :value="data">
            {{ data }}
          </option>
        </select> -->
      </div>
      <div class="table-responsive">
        <!-- Modal -->
        <LaundryAbsensiModal />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col" class="text-center">Pagi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in pegawai" :key="index">
              <td class="text-capitalize align-middle">{{ data.Nama }}</td>
              <!-- laundry -->
              <td class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'absen', 'laundry', data.laundry?.status, data.laundry?.time?.split(' ')[0])"
                      :class="(!data.laundry?.status || (data.laundry?.status === '' && data.laundry?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.laundry?.status && data.laundry?.time?.split(' ')[0] !== date) ? 'bg-white' : data.laundry?.status === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.laundry?.status && data.laundry?.time?.split(' ')[0] === date && (data.laundry?.status !== '' && data.laundry?.status !== 'absen')) ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'terlambat', 'laundry', data.laundry?.status, data.laundry?.time?.split(' ')[0])"
                      :class="(!data.laundry?.status || (data.laundry?.status === '' && data.laundry?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.laundry?.status && data.laundry?.time?.split(' ')[0] !== date) ? 'bg-white' : data.laundry?.status === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.laundry?.status && data.laundry?.time?.split(' ')[0] === date && (data.laundry?.status !== '' && data.laundry?.status !== 'terlambat')) ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'sakit', 'laundry', data.laundry?.status, data.laundry?.time?.split(' ')[0])"
                      :class="(!data.laundry?.status || (data.laundry?.status === '' && data.laundry?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.laundry?.status && data.laundry?.time?.split(' ')[0] !== date) ? 'bg-white' : data.laundry?.status === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.laundry?.status && data.laundry?.time?.split(' ')[0] === date && (data.laundry?.status !== '' && data.laundry?.status !== 'sakit')) ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'izin', 'laundry', data.laundry?.status, data.laundry?.time?.split(' ')[0])"
                      :class="(!data.laundry?.status || (data.laundry?.status === '' && data.laundry?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.laundry?.status && data.laundry?.time?.split(' ')[0] !== date) ? 'bg-white' : data.laundry?.status === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.laundry?.status && data.laundry?.time?.split(' ')[0] === date && (data.laundry?.status !== '' && data.laundry?.status !== 'izin')) ? true : false">Izin</button>
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
    ...mapState("laundry/absensi", ["pegawai", "permissions", "select", 'date', 'updateData']),
  },
  methods: {
    ...mapActions('laundry/absensi', ['setStatus', 'deleteStatus']),
    ...mapMutations('laundry/absensi', { changeStep: 'setAbsensi' }),
    setAbsensi(sk, type, time, condition, dateTime ) {
      const obj = {
        sk, type, time, condition
      }
      if (condition && dateTime === this.date) {
        this.deleteStatus(obj)
      } else {
        this.changeStep(obj)
      }
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
