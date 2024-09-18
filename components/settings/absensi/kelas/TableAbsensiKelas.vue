<template>
  <div>
    <div>
      <div class="row mb-3">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h2 class="mb-3 mb-md-0">Absensi Kelas  </h2>
        </div>
        <div class="col-12 col-md-6 d-flex align-items-center justify-content-end">
          <select class="form-select" v-model="selectedKelas" @change="applyFilter">
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">{{ data }}</option>
          </select>
          <select class="form-select" v-model="selectedMapel">
            <option value="" selected disabled>Mapel</option>
            <option v-for="(data, index) in uniqueLesson" :key="index" :value="data">{{ data.Nama }}</option>
          </select>
          <select class="form-select" v-model="selectedJam" style="width: max-content;">
            <option value="" selected disabled>Jam</option>
            <option v-for="(data, index) in selectedMapel?.Hari" :key="index" :value="data">{{ data }}</option>
          </select>
        </div>
      </div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalAbsensiKelas />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Asrama</th>
              <th scope="col" class="text-center" v-if="selectedJam">mapel {{ selectedJam }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="uniqueClasses.length === 0">
              <td colspan="2" class="text-center">Anda tidak mengajar apapun hari ini</td>
            </tr>
            <tr v-for="(data, index) in santri" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nis }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Logs?.asrama.status }}
              </td>
              <!-- mapel 1 -->
              <!-- <td class="text-capitalize py-2" v-if="scheduleMapel?.Hari?.split('-')[1] === '1a '"> -->
              <td class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'absen', `mapel${selectedJam}`, data.Logs?.mapel?.[selectedJam]?.status, data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0])"
                      :class="(!data.Logs?.mapel?.[selectedJam]?.status || (data.Logs?.mapel?.[selectedJam]?.status === '' && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.mapel?.[selectedJam]?.status && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.mapel?.[selectedJam]?.status === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.mapel?.[selectedJam]?.status && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] === date && (data.Logs?.mapel?.[selectedJam]?.status !== '' && data.Logs?.mapel?.[selectedJam]?.status !== 'absen')) ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'terlambat', `mapel${selectedJam}`, data.Logs?.mapel?.[selectedJam]?.status, data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0])"
                      :class="(!data.Logs?.mapel?.[selectedJam]?.status || (data.Logs?.mapel?.[selectedJam]?.status === '' && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.mapel?.[selectedJam]?.status && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.mapel?.[selectedJam]?.status === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.mapel?.[selectedJam]?.status && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] === date && (data.Logs?.mapel?.[selectedJam]?.status !== '' && data.Logs?.mapel?.[selectedJam]?.status !== 'terlambat')) ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'sakit', `mapel${selectedJam}`, data.Logs?.mapel?.[selectedJam]?.status, data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0])"
                      :class="(!data.Logs?.mapel?.[selectedJam]?.status || (data.Logs?.mapel?.[selectedJam]?.status === '' && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.mapel?.[selectedJam]?.status && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.mapel?.[selectedJam]?.status === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.mapel?.[selectedJam]?.status && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] === date && (data.Logs?.mapel?.[selectedJam]?.status !== '' && data.Logs?.mapel?.[selectedJam]?.status !== 'sakit')) ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'izin', `mapel${selectedJam}`, data.Logs?.mapel?.[selectedJam]?.status, data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0])"
                      :class="(!data.Logs?.mapel?.[selectedJam]?.status || (data.Logs?.mapel?.[selectedJam]?.status === '' && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.mapel?.[selectedJam]?.status && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.mapel?.[selectedJam]?.status === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.mapel?.[selectedJam]?.status && data.Logs?.mapel?.[selectedJam]?.time?.split(' ')[0] === date && (data.Logs?.mapel?.[selectedJam]?.status !== '' && data.Logs?.mapel?.[selectedJam]?.status !== 'izin')) ? true : false">Izin</button>
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
    ...mapGetters('kelasAbsensi', ['getSelectedMapel', 'getSantri', 'getSelectedJam']),
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
    selectedJam: {
      get() {
        return this.getSelectedJam
      },
      set(value) {
        this.$store.commit('kelasAbsensi/setSelectedJam', value)
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
        this.selectedMapel = '',
        this.selectedJam = ''
        this.santri = []
        return matchesClass
      });
    },
    uniqueLesson() {
      return this.filteredData
        .map(item => {
          const hariList = item.Hari.split(", ");
          const hariRelevan = hariList.find(hari => hari.includes(this.hariIni));
          if (hariRelevan) {
            const days = item?.Hari?.split(", ");
            // return
            return {
              Nama: item.Nama,
              SK: item.SK,
              Hari: days.filter(day => day.includes(this.hariIni))
            };
          }
          return null;
        })
        .filter(item => item !== null); // Remove any null values
    },
    scheduleMapel() {
      return this.uniqueLesson.find((x) => x.Nama === this.selectedMapel.Nama)
    },
  },
  watch: {
    selectedJam(value) {
      if (value) {
        this.getDataSantri(this.selectedKelas)
      }
    },
    selectedMapel(value) {
      if ( value ) {
        this.santri = []
        this.selectedJam = ''
      }
    }
  },
  methods: {
    ...mapActions('kelasAbsensi', ['setStatus', 'deleteStatus', 'getDataSantri']),
    ...mapMutations('kelasAbsensi', { changeStep: 'setAbsensi' }),
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
    applyFilter() {
      this.uniqueLesson;
    }
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

tr th,
tr td {
  white-space: nowrap;
}
</style>
