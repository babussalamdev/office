<template>
  <div>
    <div>
      <div class="head d-flex align-items-center mb-3 justify-content-between">
        <h2 class="mb-0">Absensi Tahfidz</h2>
        <nuxt-link v-if="permissionsIndex.includes('report tahfidz')" to="/tahfidz/absensi/monitoring" style="font-size: 12px;" class="btn btn-sm btn-secondary text-decoration-none">
          <i class="bi bi-eye-fill me-2"></i>Monitoring
        </nuxt-link>
      </div>
      <!-- Modal -->
      <ModalAbsensiTahfidz />
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Asrama</th>
              <th scope="col" class="text-center">Pagi</th>
              <th scope="col" class="text-center">Sore</th>
              <th scope="col" class="text-end">Note</th>
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
                <span style="font-size: 10px" class="py-1 px-2 rounded-1"
                  :class="data.Logs?.asrama.status === 'rumah' ? 'text-bg-secondary' : data.Logs?.asrama.status === 'sekolah' ? 'text-bg-success' : data.Logs?.asrama.status === 'izin' ? 'text-bg-primary' : data.Logs?.asrama.status === 'sakit' ? 'text-bg-warning' : 'text-bg-danger'">
                  <i class="material-icons mb-0 me-1" style="font-size: 10px;">
                    {{
                      data.Logs?.asrama.status === "sekolah"
                        ? " school "
                        : data.Logs?.asrama.status === "rumah"
                          ? " villa "
                          : data.Logs?.asrama.status === "sakit"
                            ? " medication "
                            : data.Logs?.asrama.status === "izin"
                              ? "hourglass_top"
                              : " person_off "
                    }}
                  </i>
                  {{ data.Logs?.asrama.status }}
                </span>
              </td>
              <!-- pagi -->
              <td class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'absen', 'pagi', data.Logs?.halaqah?.pagi?.status, data.Logs?.halaqah?.pagi?.time?.split(' ')[0])"
                      :class="(!data.Logs?.halaqah?.pagi?.status || (data.Logs?.halaqah?.pagi?.status === '' && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqah?.pagi?.status && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqah?.pagi?.status === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqah?.pagi?.status && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] === date && (data.Logs?.halaqah?.pagi?.status !== '' && data.Logs?.halaqah?.pagi?.status !== 'absen')) ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'terlambat', 'pagi', data.Logs?.halaqah?.pagi?.status, data.Logs?.halaqah?.pagi?.time?.split(' ')[0])"
                      :class="(!data.Logs?.halaqah?.pagi?.status || (data.Logs?.halaqah?.pagi?.status === '' && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqah?.pagi?.status && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqah?.pagi?.status === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqah?.pagi?.status && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] === date && (data.Logs?.halaqah?.pagi?.status !== '' && data.Logs?.halaqah?.pagi?.status !== 'terlambat')) ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'sakit', 'pagi', data.Logs?.halaqah?.pagi?.status, data.Logs?.halaqah?.pagi?.time?.split(' ')[0])"
                      :class="(!data.Logs?.halaqah?.pagi?.status || (data.Logs?.halaqah?.pagi?.status === '' && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqah?.pagi?.status && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqah?.pagi?.status === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqah?.pagi?.status && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] === date && (data.Logs?.halaqah?.pagi?.status !== '' && data.Logs?.halaqah?.pagi?.status !== 'sakit')) ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'izin', 'pagi', data.Logs?.halaqah?.pagi?.status, data.Logs?.halaqah?.pagi?.time?.split(' ')[0])"
                      :class="(!data.Logs?.halaqah?.pagi?.status || (data.Logs?.halaqah?.pagi?.status === '' && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqah?.pagi?.status && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqah?.pagi?.status === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqah?.pagi?.status && data.Logs?.halaqah?.pagi?.time?.split(' ')[0] === date && (data.Logs?.halaqah?.pagi?.status !== '' && data.Logs?.halaqah?.pagi?.status !== 'izin')) ? true : false">Izin</button>
                  </div>
                </div>
              </td>

              <!-- sore -->
              <td class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'absen', 'sore', data.Logs?.halaqah?.sore?.status, data.Logs?.halaqah?.sore?.time?.split(' ')[0])"
                      :class="(!data.Logs?.halaqah?.sore?.status || (data.Logs?.halaqah?.sore?.status === '' && data.Logs?.halaqah?.sore?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqah?.sore?.status && data.Logs?.halaqah?.sore?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqah?.sore?.status === 'absen' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqah?.sore?.status && data.Logs?.halaqah?.sore?.time?.split(', ')[0] === date && (data.Logs?.halaqah?.sore?.status !== '' && data.Logs?.halaqah?.sore?.status !== 'absen')) ? true : false">Absen</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'terlambat', 'sore', data.Logs?.halaqah?.sore?.status, data.Logs?.halaqah?.sore?.time?.split(' ')[0])"
                      :class="(!data.Logs?.halaqah?.sore?.status || (data.Logs?.halaqah?.sore?.status === '' && data.Logs?.halaqah?.sore?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqah?.sore?.status && data.Logs?.halaqah?.sore?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqah?.sore?.status === 'terlambat' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqah?.sore?.status && data.Logs?.halaqah?.sore?.time?.split(', ')[0] === date && (data.Logs?.halaqah?.sore?.status !== '' && data.Logs?.halaqah?.sore?.status !== 'terlambat')) ? true : false">Terlambat</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'sakit', 'sore', data.Logs?.halaqah?.sore?.status, data.Logs?.halaqah?.sore?.time?.split(' ')[0])"
                      :class="(!data.Logs?.halaqah?.sore?.status || (data.Logs?.halaqah?.sore?.status === '' && data.Logs?.halaqah?.sore?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqah?.sore?.status && data.Logs?.halaqah?.sore?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqah?.sore?.status === 'sakit' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqah?.sore?.status && data.Logs?.halaqah?.sore?.time?.split(', ')[0] === date && (data.Logs?.halaqah?.sore?.status !== '' && data.Logs?.halaqah?.sore?.status !== 'sakit')) ? true : false">Sakit</button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="setAbsensi(data.SK, 'izin', 'sore', data.Logs?.halaqah?.sore?.status, data.Logs?.halaqah?.sore?.time?.split(' ')[0])"
                      :class="(!data.Logs?.halaqah?.sore?.status || (data.Logs?.halaqah?.sore?.status === '' && data.Logs?.halaqah?.sore?.time?.split(' ')[0] === date)) ? 'bg-white' : (data.Logs?.halaqah?.sore?.status && data.Logs?.halaqah?.sore?.time?.split(' ')[0] !== date) ? 'bg-white' : data.Logs?.halaqah?.sore?.status === 'izin' ? 'bg-primary text-white border-0' : 'bg-secondary text-white border-0'"
                      :disabled="(data.Logs?.halaqah?.sore?.status && data.Logs?.halaqah?.sore?.time?.split(', ')[0] === date && (data.Logs?.halaqah?.sore?.status !== '' && data.Logs?.halaqah?.sore?.status !== 'izin')) ? true : false">Izin</button>
                  </div>
                </div>
              </td>

              <!-- note -->
              <td class="align-middle text-end">
                <a style="padding: 0;" href="javascript:;" @click="openModal(data.SK, 'modalcatatanpagi')">
                  <button class="btn btn-sm btn-primary">
                    <i class="material-symbols-outlined">
                      clear_day
                    </i>
                  </button>
                </a>
                <a style="padding: 0" href="javascript:;" @click="openModal(data.SK, 'modalcatatansore')">
                  <button class="btn btn-sm btn-warning">
                    <i class="material-symbols-outlined">
                      bedtime
                    </i>
                  </button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ModalCatatanAbsensiTahfidz />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import permission from "~/middleware/permission";
export default {
  data() {
    return {
      selectKelas: "",
    };
  },
  computed: {
    ...mapState("tahfidzAbsensi", {
      santri: state => state.santri,
      permissions: state => state.permissions, // Alias untuk permissions di modul tahfidzAbsensi
      select: state => state.select,
      date: state => state.date,
      updateData: state => state.updateData,
    }),
    ...mapState("index", {
      permissionsIndex: state => state.permissions, // Alias untuk permissions di modul index
    }),
  },

  methods: {
    ...mapActions('tahfidzAbsensi', ['setStatus', 'deleteStatus']),
    ...mapMutations('tahfidzAbsensi', { changeStep: 'setAbsensi', changeModal: 'openModal' }),
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
    openModal(sk, modal) {
      const obj = { sk, modal }
      this.changeModal(obj)
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

/* .box-radio input:checked+label {
  background: grey;
  color: #fff;
} */
</style>
