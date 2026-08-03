<template>
  <div>
    <div>
      <div class="row mb-3">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h2 class="mb-3 mb-md-0">Absensi Matan</h2>
        </div>
        <div class="col-12 col-md-6 d-flex align-items-center justify-content-end">
          <select class="form-select" v-model="selectedMatan">
            <option value="" selected disabled>Matan</option>
            <option v-for="(data, index) in select" :key="index" :value="data">{{ data.Nama }}</option>
          </select>
        </div>
      </div>
      <!-- Modal -->
      <ModalAbsensiMatan />
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Asrama</th>
              <th scope="col" class="text-center" v-if="selectedMatan">Absensi Matan {{ selectedMatan.Nama }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="select.length === 0">
              <td colspan="3" class="text-center">Anda tidak mengajar apapun hari ini</td>
            </tr>
            <tr v-for="(data, index) in santri" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nis }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Logs?.asrama?.status }}
              </td>
              <!-- Kolom Matan -->
              <td class="text-capitalize py-2" v-if="selectedMatan">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="
                        setAbsensi(
                          data.SK,
                          'absen',
                          'matan',
                          data.Logs?.matan?.[selectedMatan.Nama]?.status,
                          data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.matan?.[selectedMatan.Nama]?.status ||
                        (data.Logs?.matan?.[selectedMatan.Nama]?.status === '' &&
                          data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.matan?.[selectedMatan.Nama]?.status && data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.matan?.[selectedMatan.Nama]?.status === 'absen'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.matan?.[selectedMatan.Nama]?.status &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] === date &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.status !== '' &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.status !== 'absen'
                          ? true
                          : false
                      ">
                      Absen
                    </button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="
                        setAbsensi(
                          data.SK,
                          'terlambat',
                          'matan',
                          data.Logs?.matan?.[selectedMatan.Nama]?.status,
                          data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.matan?.[selectedMatan.Nama]?.status ||
                        (data.Logs?.matan?.[selectedMatan.Nama]?.status === '' &&
                          data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.matan?.[selectedMatan.Nama]?.status && data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.matan?.[selectedMatan.Nama]?.status === 'terlambat'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.matan?.[selectedMatan.Nama]?.status &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] === date &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.status !== '' &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.status !== 'terlambat'
                          ? true
                          : false
                      ">
                      Terlambat
                    </button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="
                        setAbsensi(
                          data.SK,
                          'sakit',
                          'matan',
                          data.Logs?.matan?.[selectedMatan.Nama]?.status,
                          data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.matan?.[selectedMatan.Nama]?.status ||
                        (data.Logs?.matan?.[selectedMatan.Nama]?.status === '' &&
                          data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.matan?.[selectedMatan.Nama]?.status && data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.matan?.[selectedMatan.Nama]?.status === 'sakit'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.matan?.[selectedMatan.Nama]?.status &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] === date &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.status !== '' &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.status !== 'sakit'
                          ? true
                          : false
                      ">
                      Sakit
                    </button>
                  </div>
                  <div class="box-radio">
                    <button
                      @click="
                        setAbsensi(
                          data.SK,
                          'izin',
                          'matan',
                          data.Logs?.matan?.[selectedMatan.Nama]?.status,
                          data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.matan?.[selectedMatan.Nama]?.status ||
                        (data.Logs?.matan?.[selectedMatan.Nama]?.status === '' &&
                          data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.matan?.[selectedMatan.Nama]?.status && data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.matan?.[selectedMatan.Nama]?.status === 'izin'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.matan?.[selectedMatan.Nama]?.status &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.time?.split(' ')[0] === date &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.status !== '' &&
                        data.Logs?.matan?.[selectedMatan.Nama]?.status !== 'izin'
                          ? true
                          : false
                      ">
                      Izin
                    </button>
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
        selectedKelas: "",
      };
    },
    computed: {
      ...mapState("matanAbsensi", ["permissions", "select", "date", "updateData"]),
      ...mapGetters("matanAbsensi", ["getSelectedMatan", "getSantri"]),

      selectedMatan: {
        get() {
          return this.getSelectedMatan;
        },
        set(value) {
          this.$store.commit("matanAbsensi/setSelectedMatan", value);
        },
      },
      santri: {
        get() {
          return this.getSantri;
        },
        set(value) {
          this.$store.commit("matanAbsensi/setSantri", value);
        },
      },
    },
    watch: {
      selectedMatan(value) {
        if (value) {
          this.getDataSantri(this.selectedMatan);
        } else if (value) {
          this.santri = [];
        }
      },
    },
    methods: {
      ...mapActions("matanAbsensi", ["setStatus", "deleteStatus", "getDataSantri"]),
      ...mapMutations("matanAbsensi", { changeStep: "setAbsensi" }),
      setAbsensi(sk, type, time, condition, dateTime) {
        const obj = {
          sk,
          type,
          time, // passed as 'matan' from button click
          condition,
        };
        if (condition && dateTime === this.date) {
          this.deleteStatus(obj);
        } else {
          this.changeStep(obj);
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
  tr th,
  tr td {
    white-space: nowrap;
  }
</style>
