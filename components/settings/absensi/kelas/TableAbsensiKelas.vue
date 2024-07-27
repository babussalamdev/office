<template>
  <div>
    <div>
      <!-- {{ firstData }} -->
        <!-- {{ scheduleMapel?.Hari?.split('-')[1]}} -->
      <div class="row mb-3">
        <div class="col-6 col-md-6 d-flex align-items-center">
          <h2 class="mb-3 mb-md-0">Absensi Kelas</h2>
        </div>
        <div class="col-6 col-md-6 d-flex align-items-center justify-content-end gap-2">
          <select class="form-select" v-model="selectedKelas" @change="applyFilter">
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">{{ data }}</option>
          </select>
          <div>
            <select class="form-select" v-model="selectedMapel">
              <option value="" selected disabled>Mapel</option>
              <option v-for="(data, index) in uniqueLesson" :key="index" :value="data.Nama">{{ data.Nama }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- <div class="head d-flex align-items-center mb-3 justify-content-start">
        <h2 class="mb-3 mb-md-0">Absensi Kelas</h2> -->
        <!-- <select v-if="select.length > 0" class="form-select" name="Kelas" @change="getAbsensi" v-model="selectKelas">
          <option value="" selected>-- Kelas --</option>
          <option v-for="(data, index) in select" :key="index" :value="data">
            {{ data }}
          </option>
        </select> -->
      <!-- </div> -->
      <!-- {{ uniqueClasses }} <br> <br> {{ filteredData }} <br> <br> {{ uniqueLesson }} <br><br> {{ selectedMapel }} -->
      <div class="table-responsive">
        <!-- Modal -->
        <ModalAbsensiKelas />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Asrama</th>
              <th scope="col" class="text-center" v-if="scheduleMapel?.Hari?.split('-')[1] === '1'">Mapel ke-1</th>
              <th scope="col" class="text-center"  v-if="scheduleMapel?.Hari?.split('-')[1] === '2'">Mapel ke-2</th>
              <th scope="col" class="text-center" v-if="scheduleMapel?.Hari?.split('-')[1] === '3'">Mapel ke-3</th>
              <!-- <th scope="col" class="text-center">Sore</th> -->
              <!-- <th scope="col" class="text-end">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-if="!selectedKelas || !selectedMapel">
              <td v-if="!selectedKelas" colspan="2" class="text-center text-danger fw-bold">
                Kelas Belum Dipilih
              </td>
              <td v-if="!selectedMapel && selectedKelas" colspan="2" class="text-center text-danger fw-bold">
                Mapel Belum Dipilih
              </td>
            </tr> -->
            <tr v-for="(data, index) in santri" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nis }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Logs?.asrama }}
              </td>
              <!-- mapel 1 -->
              <td class="text-capitalize py-2" v-if="scheduleMapel?.Hari?.split('-')[1] === '1'">
                <div v-if="data.Logs?.mapelSatuTime?.split(', ')[0] === date || !data.Logs?.mapelSatuTime"
                  class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'mapelSatu', data.Logs?.mapelSatu)"
                      :class="!data.Logs.mapelSatu || data.Logs.mapelSatu === '' ? 'bg-white' : data.Logs.mapelSatu === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelSatu && (data.Logs.mapelSatu !== '' && data.Logs.mapelSatu !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'mapelSatu', data.Logs?.mapelSatu)"
                      :class="!data.Logs.mapelSatu || data.Logs.mapelSatu === '' ? 'bg-white' : data.Logs.mapelSatu === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelSatu && (data.Logs.mapelSatu !== '' && data.Logs.mapelSatu !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'mapelSatu', data.Logs?.mapelSatu)"
                      :class="!data.Logs.mapelSatu || data.Logs.mapelSatu === '' ? 'bg-white' : data.Logs.mapelSatu === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelSatu && (data.Logs.mapelSatu !== '' && data.Logs.mapelSatu !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'mapelSatu', data.Logs?.mapelSatu)"
                      :class="!data.Logs.mapelSatu || data.Logs.mapelSatu === '' ? 'bg-white' : data.Logs.mapelSatu === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelSatu && (data.Logs.mapelSatu !== '' && data.Logs.mapelSatu !== 'izin') ? true : false">Izin</button>
                  </div>
                </div>
                <div v-else class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'mapelSatu', data.Logs?.mapelSatu)"
                      :class="!data.Logs.mapelSatu || data.Logs.mapelSatu === '' ? 'bg-white' : data.Logs.mapelSatu === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelSatu && (data.Logs.mapelSatu !== '' && data.Logs.mapelSatu !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'mapelSatu', data.Logs?.mapelSatu)"
                      :class="!data.Logs.mapelSatu || data.Logs.mapelSatu === '' ? 'bg-white' : data.Logs.mapelSatu === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelSatu && (data.Logs.mapelSatu !== '' && data.Logs.mapelSatu !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'mapelSatu', data.Logs?.mapelSatu)"
                      :class="!data.Logs.mapelSatu || data.Logs.mapelSatu === '' ? 'bg-white' : data.Logs.mapelSatu === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelSatu && (data.Logs.mapelSatu !== '' && data.Logs.mapelSatu !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'mapelSatu', data.Logs?.mapelSatu)"
                      :class="!data.Logs.mapelSatu || data.Logs.mapelSatu === '' ? 'bg-white' : data.Logs.mapelSatu === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelSatu && (data.Logs.mapelSatu !== '' && data.Logs.mapelSatu !== 'izin') ? true : false">Izin</button>
                  </div>
                </div>
              </td>

              <!-- mapel 2 -->
              <td class="text-capitalize py-2" v-if="scheduleMapel?.Hari?.split('-')[1] === '2'">
                <div v-if="data.Logs?.mapelDuaTime?.split(', ')[0] === date || !data.Logs?.mapelDuaTime"
                  class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'mapelDua', data.Logs?.mapelDua)"
                      :class="!data.Logs.mapelDua || data.Logs.mapelDua === '' ? 'bg-white' : data.Logs.mapelDua === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelDua && (data.Logs.mapelDua !== '' && data.Logs.mapelDua !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'mapelDua', data.Logs?.mapelDua)"
                      :class="!data.Logs.mapelDua || data.Logs.mapelDua === '' ? 'bg-white' : data.Logs.mapelDua === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelDua && (data.Logs.mapelDua !== '' && data.Logs.mapelDua !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'mapelDua', data.Logs?.mapelDua)"
                      :class="!data.Logs.mapelDua || data.Logs.mapelDua === '' ? 'bg-white' : data.Logs.mapelDua === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelDua && (data.Logs.mapelDua !== '' && data.Logs.mapelDua !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'mapelDua', data.Logs?.mapelDua)"
                      :class="!data.Logs.mapelDua || data.Logs.mapelDua === '' ? 'bg-white' : data.Logs.mapelDua === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelDua && (data.Logs.mapelDua !== '' && data.Logs.mapelDua !== 'izin') ? true : false">Izin</button>
                  </div>
                </div>
                <div v-else class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'mapelDua', data.Logs?.mapelDua)"
                      :class="!data.Logs.mapelDua || data.Logs.mapelDua === '' ? 'bg-white' : data.Logs.mapelDua === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelDua && (data.Logs.mapelDua !== '' && data.Logs.mapelDua !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'mapelDua', data.Logs?.mapelDua)"
                      :class="!data.Logs.mapelDua || data.Logs.mapelDua === '' ? 'bg-white' : data.Logs.mapelDua === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelDua && (data.Logs.mapelDua !== '' && data.Logs.mapelDua !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'mapelDua', data.Logs?.mapelDua)"
                      :class="!data.Logs.mapelDua || data.Logs.mapelDua === '' ? 'bg-white' : data.Logs.mapelDua === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelDua && (data.Logs.mapelDua !== '' && data.Logs.mapelDua !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'mapelDua', data.Logs?.mapelDua)"
                      :class="!data.Logs.mapelDua || data.Logs.mapelDua === '' ? 'bg-white' : data.Logs.mapelDua === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelDua && (data.Logs.mapelDua !== '' && data.Logs.mapelDua !== 'izin') ? true : false">Izin</button>
                  </div>
                </div>
              </td>

              <!-- mapel 3 -->
              <td class="text-capitalize py-2" v-if="scheduleMapel?.Hari?.split('-')[1] === '3'">
                <div v-if="data.Logs?.mapelTigaTime?.split(', ')[0] === date || !data.Logs?.mapelTigaTime"
                  class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'mapelTiga', data.Logs?.mapelTiga)"
                      :class="!data.Logs.mapelTiga || data.Logs.mapelTiga === '' ? 'bg-white' : data.Logs.mapelTiga === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelTiga && (data.Logs.mapelTiga !== '' && data.Logs.mapelTiga !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'mapelTiga', data.Logs?.mapelTiga)"
                      :class="!data.Logs.mapelTiga || data.Logs.mapelTiga === '' ? 'bg-white' : data.Logs.mapelTiga === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelTiga && (data.Logs.mapelTiga !== '' && data.Logs.mapelTiga !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'mapelTiga', data.Logs?.mapelTiga)"
                      :class="!data.Logs.mapelTiga || data.Logs.mapelTiga === '' ? 'bg-white' : data.Logs.mapelTiga === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelTiga && (data.Logs.mapelTiga !== '' && data.Logs.mapelTiga !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'mapelTiga', data.Logs?.mapelTiga)"
                      :class="!data.Logs.mapelTiga || data.Logs.mapelTiga === '' ? 'bg-white' : data.Logs.mapelTiga === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelTiga && (data.Logs.mapelTiga !== '' && data.Logs.mapelTiga !== 'izin') ? true : false">Izin</button>
                  </div>
                </div>
                <div v-else class="select-input mx-auto">
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'absen', 'mapelTiga', data.Logs?.mapelTiga)"
                      :class="!data.Logs.mapelTiga || data.Logs.mapelTiga === '' ? 'bg-white' : data.Logs.mapelTiga === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelTiga && (data.Logs.mapelTiga !== '' && data.Logs.mapelTiga !== 'absen') ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'terlambat', 'mapelTiga', data.Logs?.mapelTiga)"
                      :class="!data.Logs.mapelTiga || data.Logs.mapelTiga === '' ? 'bg-white' : data.Logs.mapelTiga === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelTiga && (data.Logs.mapelTiga !== '' && data.Logs.mapelTiga !== 'terlambat') ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'sakit', 'mapelTiga', data.Logs?.mapelTiga)"
                      :class="!data.Logs.mapelTiga || data.Logs.mapelTiga === '' ? 'bg-white' : data.Logs.mapelTiga === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelTiga && (data.Logs.mapelTiga !== '' && data.Logs.mapelTiga !== 'sakit') ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button @click="setAbsensi(data.SK, 'izin', 'mapelTiga', data.Logs?.mapelTiga)"
                      :class="!data.Logs.mapelTiga || data.Logs.mapelTiga === '' ? 'bg-white' : data.Logs.mapelTiga === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="data.Logs.mapelTiga && (data.Logs.mapelTiga !== '' && data.Logs.mapelTiga !== 'izin') ? true : false">Izin</button>
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
      selectedKelas: '',
    };
  },
  computed: {
    ...mapState("kelasAbsensi", ["permissions", "select", 'date', 'updateData']),
    ...mapGetters('kelasAbsensi', ['getSelectedMapel', 'getSantri']),
    hariIni() {
      const today = new Date();
      const hariIni = today.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
      return hariIni;
    },
    firstData() {
      return this.select.filter(item =>
        item.Hari.split(", ").some(day => day.includes(this.hariIni))
      );
    },
    selectedMapel: {
      get() {
        return this.getSelectedMapel
      },
      set(value) {
        this.$store.commit('kelasAbsensi/setSelectedMapel', value)
      }
    },
    santri: {
      get() {
        return this.getSantri
      },
      set(value) {
        this.$store.commit('kelasAbsensi/setSantri', value)
      }
    },
    uniqueClasses() {
      // Get unique classes from data
      const classes = this.firstData.map(item => item.Kelas);
      return [...new Set(classes)];
    },
    filteredData() {
      return this.firstData.filter(item => {
        const matchesClass = item.Kelas === this.selectedKelas;
        this.selectedMapel = ''
        this.santri = []
        // const matchesAsrama = item.Logs.asrama === this.selectedAsrama;
        // return matchesClass && matchesAsrama;
        return matchesClass
      });
    },
    uniqueLesson() {
      return this.filteredData
        .map(item => {
          const hariList = item.Hari.split(", ");
          const hariRelevan = hariList.find(hari => hari.includes(this.hariIni));
          if (hariRelevan) {
            return {
              Nama: item.Nama,
              SK: item.SK,
              Hari: hariRelevan.charAt(0).toUpperCase() + hariRelevan.slice(1)  // Capitalize the first letter
            };
          }
          return null;
        })
        .filter(item => item !== null); // Remove any null values
    },
    scheduleMapel() {
      return this.uniqueLesson.find((x) => x.Nama === this.selectedMapel)
    },
  },
  watch: {
    selectedMapel(value) {

      this.getDataSantri(this.selectedKelas)
    },
  },
  methods: {
    ...mapActions('kelasAbsensi', ['setStatus', 'deleteStatus', 'getDataSantri']),
    ...mapMutations('kelasAbsensi', { changeStep: 'setAbsensi' }),
    setAbsensi(sk, type, time, condition) {
      const obj = {
        sk, type, time
      }
      if (condition) {
        console.log('hapus')
        this.deleteStatus(obj)
      } else {
        this.changeStep(obj)
      }
    },
    getAbsensi() {
      const kelas = this.selectKelas;
      this.$store.dispatch("asramaAbsensi/getAbsensi", kelas);
    },
    applyFilter() {
      this.filteredData;
    }
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
