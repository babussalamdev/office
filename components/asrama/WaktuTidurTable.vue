<template>
  <div>
    <h2 v-if="waktuSiang && waktuMalam" style="font-size: 12px;" class="mb-2 text-capitalize">{{ isWithinTimeRangeSiang
      ? 'absensi tidur siang' : isWithinTimeRangeMalam ? 'absensi tidur malam' : 'tidak ada absensi' }}</h2>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div v-if="permissions.includes('setup absensi')">
          <div class="input-group mb-1" style="font-size: 12px;">
            <span class="input-group-text" style="font-size: 12px;">Siang</span>
            <input type="time" class="form-control" style="font-size: 12px;" v-if="waktuSiang" :value="waktuSiang.Start"
              @change="setDate($event.target.value, 'Tidur Siang', 'siang', 'Start')">
            <input type="time" class="form-control" style="font-size: 12px;" v-if="waktuSiang" :value="waktuSiang.End"
              @change="setDate($event.target.value, 'Tidur Siang', 'siang', 'End')">
          </div>
          <div class="input-group" style="font-size: 12px;">
            <span class="input-group-text" style="font-size: 12px;">Malam</span>
            <input type="time" class="form-control" style="font-size: 12px;" v-if="waktuMalam" :value="waktuMalam.Start"
              @change="setDate($event.target.value, 'Tidur Malam', 'malam', 'Start')">
            <input type="time" class="form-control" style="font-size: 12px;" v-if="waktuMalam" :value="waktuMalam.End"
              @change="setDate($event.target.value, 'Tidur Malam', 'malam', 'End')">
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex align-items-center justify-content-end" v-if="waktuSiang">
        <select class="form-select" v-if="isWithinTimeRangeSiang || isWithinTimeRangeMalam"
          style="font-size: 12px; max-width: max-content;" v-model="selectedAsrama" @change="getData()">
          <option value="">asrama</option>
          <option v-for="(data, index) in listAsrama" :key="index" :value="data">{{ data }}</option>
        </select>
      </div>
    </div>

    <!-- table siang -->
    <div class="table-responsive" v-if="waktuSiang">
      <table class="table table-hover table-striped" v-if="isWithinTimeRangeSiang">
        <thead>
          <tr>
            <th scope="col">Nama Santri</th>
            <th scope="col">Waktu</th>
            <th scope="col">Status</th>
            <th scope="col">PIC</th>
            <th scope="col" class="text-end">Action</th>
            <!-- <th scope="col">Ekskull</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td>{{ data.Nama }}</td>
            <td>{{ data.Logs?.tidur?.siang?.time }}</td>
            <!-- {{ dateNow === data.Logs?.tidur?.siang?.date }} -->
            <td>
              <span class="py-1 px-2 rounded-1"
                :class="data.Logs?.tidur?.siang?.status === 'istirahat' ? 'bg-success text-white' : 'bg-secondary text-white'">
                {{ !data.Logs?.tidur?.siang?.status ? 'aktivitas' : data.Logs?.tidur?.siang?.status }}
              </span>
            </td>
            <td>{{ data.Logs?.tidur?.siang?.pic }}</td>
            <td class="text-end">
              <a style="font-size: 12px;" href="javascript:;" class="btn btn-sm"
                :class="!data.Logs?.tidur?.siang?.status ? 'btn-success' : data.Logs?.tidur?.siang?.status === 'istirahat' ? 'btn-secondary' : 'btn-success'"
                @click="setTidur(data.SK, 'tidursiang', data.Logs?.tidur?.siang?.status)">{{
                  !data.Logs?.tidur?.siang?.status ? 'istirahat' : data.Logs?.tidur?.siang?.status === 'istirahat' ?
                'aktivitas' : 'istirahat' }}</a>
              <!-- <a style="font-size: 12px;" href="javascript:;" class="btn btn-secondary btn-sm"
                @click="setTidur(data.SK, 'tidursiang', 'aktivitas')">Aktivitas</a> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- table malam -->
    <div class="table-responsive" v-if="waktuMalam">
      <table class="table table-hover table-striped" v-if="isWithinTimeRangeMalam">
        <thead>
          <tr>
            <th scope="col">Nama Santri</th>
            <th scope="col">Waktu</th>
            <th scope="col">Status</th>
            <th scope="col">PIC</th>
            <th scope="col" class="text-end">Action</th>
            <!-- <th scope="col">Ekskull</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td>{{ data.Nama }}</td>
            <td>{{ data.Logs?.tidur?.malam?.time }}</td>
            <td>
              <span class="py-1 px-2 rounded-1"
                :class="data.Logs?.tidur?.malam?.status === 'istirahat' ? 'bg-success text-white' : 'bg-secondary text-white'">
                {{ !data.Logs?.tidur?.malam?.status ? 'aktivitas' : data.Logs?.tidur?.malam?.status }}
              </span>
            </td>
            <td>{{ data.Logs?.tidur?.malam?.pic }}</td>
            <td class="text-end">
              <a style="font-size: 12px;" href="javascript:;" class="btn btn-sm"
                :class="!data.Logs?.tidur?.malam?.status ? 'btn-success' : data.Logs?.tidur?.malam?.status === 'istirahat' ? 'btn-secondary' : 'btn-success'"
                @click="setTidur(data.SK, 'tidurmalam', data.Logs?.tidur?.malam?.status)">{{
                  !data.Logs?.tidur?.malam?.status ? 'istirahat' : data.Logs?.tidur?.malam?.status === 'istirahat' ?
                'aktivitas' : 'istirahat' }}</a>
              <!-- <a style="font-size: 12px;" href="javascript:;" class="btn btn-secondary btn-sm"
                @click="setTidur(data.SK, 'tidursiang', 'aktivitas')">Aktivitas</a> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('asrama/waktuTidur', ['listAsrama', 'santri']),
    ...mapState('index', ['permissions']),
    ...mapGetters('asrama/waktuTidur', ['getWaktuSiang', 'getWaktuMalam', 'getSelectedAsrama']),
    dateNow() {
      const today = new Date()
      const formattedDate = today.toISOString().split('T')[0]
      return formattedDate
    },
    waktuSiang() {
      return this.getWaktuSiang
    },
    waktuMalam() {
      return this.getWaktuMalam
    },
    selectedAsrama: {
      get() {
        return this.getSelectedAsrama
      },
      set(value) {
        this.$store.commit('asrama/waktuTidur/setState', { key: 'selectedAsrama', value })
      }
    },
    isWithinTimeRangeSiang() {
      const now = new Date();
      const startTime = new Date();
      const endTime = new Date();

      // Memecah waktu mulai dan berakhir menjadi jam dan menit
      const [startHour, startMinute] = this.waktuSiang.Start.split(':').map(Number);
      const [endHour, endMinute] = this.waktuSiang.End.split(':').map(Number);

      // Set waktu mulai dan berakhir
      startTime.setHours(startHour, startMinute, 0);
      endTime.setHours(endHour, endMinute, 0);

      console.log(now, startTime, endTime)

      // Periksa apakah waktu sekarang berada dalam rentang
      return now >= startTime && now < endTime;
    },
    isWithinTimeRangeMalam() {
      const now = new Date();
      const startTime = new Date();
      const endTime = new Date();

      // Memecah waktu mulai dan berakhir menjadi jam dan menit
      const [startHour, startMinute] = this.waktuMalam.Start.split(':').map(Number);
      const [endHour, endMinute] = this.waktuMalam.End.split(':').map(Number);

      // Set waktu mulai dan berakhir
      startTime.setHours(startHour, startMinute, 0);
      endTime.setHours(endHour, endMinute, 0);

      // Periksa apakah waktu sekarang berada dalam rentang
      return now >= startTime && now < endTime;
    }
  },
  methods: {
    ...mapActions('asrama/waktuTidur', ['getData']),
    setDate(date, time, sk, step) {
      this.$store.dispatch('asrama/waktuTidur/setTime', { date, time, sk, step })
    },
    setTidur(sk, type, status) {
      this.$store.dispatch('asrama/waktuTidur/setTidur', { sk, type, status })
    }
  },
}
</script>

<style scoped></style>
