<template>
  <div>
    <div>
      <div class="head d-flex align-items-center mb-3 justify-content-start">
        <h2 class="mb-3 mb-md-0">Absensi Kelas</h2>
        <!-- <select v-if="select.length > 0" class="form-select" name="Kelas" @change="getAbsensi" v-model="selectKelas">
          <option value="" selected>-- Kelas --</option>
          <option v-for="(data, index) in select" :key="index" :value="data">
            {{ data }}
          </option>
        </select> -->
      </div>
      {{  }}
      <div class="table-responsive">
        <!-- Modal -->
        <ModalAbsensiKelas />
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
                <div v-if="data.Logs?.halaqahPagiTime?.split(', ')[0] === date || !data.Logs?.halaqahPagiTime"
                  class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'Pagi', data.Logs?.halaqahPagi)"
                      :class="!data.Logs.halaqahPagi || data.Logs.halaqahPagi === '' ? 'bg-white' : data.Logs.halaqahPagi === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahPagi && (data.Logs.halaqahPagi !== '' && data.Logs.halaqahPagi !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'Pagi', data.Logs?.halaqahPagi)"
                      :class="!data.Logs.halaqahPagi || data.Logs.halaqahPagi === '' ? 'bg-white' : data.Logs.halaqahPagi === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahPagi && (data.Logs.halaqahPagi !== '' && data.Logs.halaqahPagi !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'Pagi', data.Logs?.halaqahPagi)"
                      :class="!data.Logs.halaqahPagi || data.Logs.halaqahPagi === '' ? 'bg-white' : data.Logs.halaqahPagi === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahPagi && (data.Logs.halaqahPagi !== '' && data.Logs.halaqahPagi !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'Pagi', data.Logs?.halaqahPagi)"
                      :class="!data.Logs.halaqahPagi || data.Logs.halaqahPagi === '' ? 'bg-white' : data.Logs.halaqahPagi === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahPagi && (data.Logs.halaqahPagi !== '' && data.Logs.halaqahPagi !== 'izin') ? true : false">Izin</button>
                  </div>
                </div>
                <div v-else class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'Pagi', data.Logs?.halaqahPagi)"
                      :class="!data.Logs.halaqahPagi || data.Logs.halaqahPagi === '' ? 'bg-white' : data.Logs.halaqahPagi === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahPagi && (data.Logs.halaqahPagi !== '' && data.Logs.halaqahPagi !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'Pagi', data.Logs?.halaqahPagi)"
                      :class="!data.Logs.halaqahPagi || data.Logs.halaqahPagi === '' ? 'bg-white' : data.Logs.halaqahPagi === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahPagi && (data.Logs.halaqahPagi !== '' && data.Logs.halaqahPagi !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'Pagi', data.Logs?.halaqahPagi)"
                      :class="!data.Logs.halaqahPagi || data.Logs.halaqahPagi === '' ? 'bg-white' : data.Logs.halaqahPagi === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahPagi && (data.Logs.halaqahPagi !== '' && data.Logs.halaqahPagi !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'Pagi', data.Logs?.halaqahPagi)"
                      :class="!data.Logs.halaqahPagi || data.Logs.halaqahPagi === '' ? 'bg-white' : data.Logs.halaqahPagi === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahPagi && (data.Logs.halaqahPagi !== '' && data.Logs.halaqahPagi !== 'izin') ? true : false">Izin</button>
                  </div>
                </div>
              </td>

              <!-- sore -->
              <td class="text-capitalize py-2">
                <div v-if="data.Logs?.halaqahSoreTime?.split(', ')[0] === date || !data.Logs?.halaqahSoreTime"
                  class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'Sore', data.Logs?.halaqahSore)"
                      :class="!data.Logs.halaqahSore || data.Logs.halaqahSore === '' ? 'bg-white' : data.Logs.halaqahSore === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahSore && (data.Logs.halaqahSore !== '' && data.Logs.halaqahSore !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'Sore', data.Logs?.halaqahSore)"
                      :class="!data.Logs.halaqahSore || data.Logs.halaqahSore === '' ? 'bg-white' : data.Logs.halaqahSore === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahSore && (data.Logs.halaqahSore !== '' && data.Logs.halaqahSore !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'Sore', data.Logs?.halaqahSore)"
                      :class="!data.Logs.halaqahSore || data.Logs.halaqahSore === '' ? 'bg-white' : data.Logs.halaqahSore === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahSore && (data.Logs.halaqahSore !== '' && data.Logs.halaqahSore !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'Sore', data.Logs?.halaqahSore)"
                      :class="!data.Logs.halaqahSore || data.Logs.halaqahSore === '' ? 'bg-white' : data.Logs.halaqahSore === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahSore && (data.Logs.halaqahSore !== '' && data.Logs.halaqahSore !== 'izin') ? true : false">Izin</button>
                  </div>
                </div>
                <div v-else class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'Sore', data.Logs?.halaqahSore)"
                      :class="!data.Logs.halaqahSore || data.Logs.halaqahSore === '' ? 'bg-white' : data.Logs.halaqahSore === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahSore && (data.Logs.halaqahSore !== '' && data.Logs.halaqahSore !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'Sore', data.Logs?.halaqahSore)"
                      :class="!data.Logs.halaqahSore || data.Logs.halaqahSore === '' ? 'bg-white' : data.Logs.halaqahSore === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahSore && (data.Logs.halaqahSore !== '' && data.Logs.halaqahSore !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'Sore', data.Logs?.halaqahSore)"
                      :class="!data.Logs.halaqahSore || data.Logs.halaqahSore === '' ? 'bg-white' : data.Logs.halaqahSore === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahSore && (data.Logs.halaqahSore !== '' && data.Logs.halaqahSore !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'Sore', data.Logs?.halaqahSore)"
                      :class="!data.Logs.halaqahSore || data.Logs.halaqahSore === '' ? 'bg-white' : data.Logs.halaqahSore === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.halaqahSore && (data.Logs.halaqahSore !== '' && data.Logs.halaqahSore !== 'izin') ? true : false">Izin</button>
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
      // datas: [
      //   {
      //     name: 'Fauzan Gunawan',
      //     nis: 154814841,
      //     sk: 'santri#21546'
      //   }
      // ]
    };
  },
  computed: {
    ...mapState("tahfidzAbsensi", ["santri", "permissions", "select", 'date', 'updateData']),
    // today() {
    //   const days = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];
    //   const today = new Date();
    //   return days[today.getDay() - 1]; // getDay() returns 0 for Sunday, 1 for Monday, etc.
    // },
    // // Fungsi untuk memfilter data berdasarkan hari
    // filteredData() {
    //   return this.data.filter(item => {
    //     const hariArray = item.Hari.split(", ").map(h => h.split("-")[0]);
    //     return hariArray.includes(this.today);
    //   });
    // }
    // ...mapGetters('tahfidzAbsensi', ['getAbsenPagi', 'getSore']),
    // pagi: {
    //   get() {
    //     return this.getAbsenPagi
    //   },
    //   set(value) {
    //     const obj = {
    //       name: 'pagi',
    //       value
    //     }
    //     this.$store.commit('tahfidzAbsensi/setStatus', obj)
    //   }
    // },
    // sore: {
    //   get() {
    //     return this.getSore
    //   },
    //   set(value) {
    //     const obj = {
    //       name: 'sore',
    //       value
    //     }
    //     this.$store.commit('tahfidzAbsensi/setStatus', obj)
    //   }
    // }
  },
  watch: {
    // absenPagi() {
    //   // this.setStatus('pagi')
    //   // absen(index, type) {
    //   this.absenPagi = false
    //   $("#modalAbsen").modal("show");
    //   // this.updateData = {
    //   //   santri: this.santri[index],
    //   //   type: type,
    //   // };
    // // },
    // },
    // sore() {
    //   this.setStatus('sore')
    // }
  },
  methods: {
    ...mapActions('tahfidzAbsensi', ['setStatus', 'deleteStatus']),
    ...mapMutations('tahfidzAbsensi', { changeStep: 'setAbsensi' }),
    setAbsensi(sk, type, time, condition) {
      const obj = {
        sk, type, time
      }
      if (condition) {
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
  max-width: 162px;
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
