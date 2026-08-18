<template>
  <div>
    <div>
      <div class="row mb-3">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h2 class="mb-3 mb-md-0">Absensi Ekskull</h2>
        </div>

        <!-- Updated Dropdown Section: Single Dropdown for Ekskull -->
        <div class="col-12 col-md-6 d-flex align-items-center justify-content-md-end justify-content-start gap-2">
          <select class="form-select w-auto" v-model="selectedEkskull">
            <option value="" selected disabled>Pilih Ekskull</option>
            <option v-for="(data, index) in ekskullOptions" :key="index" :value="data">
              {{ data }}
            </option>
          </select>
        </div>
      </div>

      <!-- Modal -->
      <ModalAbsensiEkskull />

      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Asrama</th>
              <th scope="col" class="text-center" v-if="selectedEkskull">Absensi {{ selectedEkskull }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!selectedEkskull">
              <td colspan="3" class="text-center">Silahkan pilih Ekskull terlebih dahulu</td>
            </tr>
            <tr v-else-if="santri.length === 0">
              <td colspan="3" class="text-center">Tidak ada data santri untuk ekskull ini</td>
            </tr>
            <tr v-for="(data, index) in santri" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nis }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Logs?.asrama?.status }}
              </td>

              <!-- Kolom Absensi Ekskull -->
              <!-- Kolom Absensi Ekskull -->
              <td class="text-capitalize py-2" v-if="selectedEkskull">
                <div class="select-input mx-auto">
                  <!-- ABSEN BUTTON -->
                  <div class="box-radio">
                    <button
                      @click="
                        setAbsensi(
                          data.SK,
                          'absen',
                          'ekskull',
                          data.Logs?.ekskull?.[selectedEkskull]?.status,
                          data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.ekskull?.[selectedEkskull]?.status ||
                        (data.Logs?.ekskull?.[selectedEkskull]?.status === '' && data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.ekskull?.[selectedEkskull]?.status && data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.ekskull?.[selectedEkskull]?.status === 'absen'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.ekskull?.[selectedEkskull]?.status &&
                        data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] === date &&
                        data.Logs?.ekskull?.[selectedEkskull]?.status !== '' &&
                        data.Logs?.ekskull?.[selectedEkskull]?.status !== 'absen'
                          ? true
                          : false
                      ">
                      Absen
                    </button>
                  </div>

                  <!-- TERLAMBAT BUTTON -->
                  <div class="box-radio">
                    <button
                      @click="
                        setAbsensi(
                          data.SK,
                          'terlambat',
                          'ekskull',
                          data.Logs?.ekskull?.[selectedEkskull]?.status,
                          data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.ekskull?.[selectedEkskull]?.status ||
                        (data.Logs?.ekskull?.[selectedEkskull]?.status === '' && data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.ekskull?.[selectedEkskull]?.status && data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.ekskull?.[selectedEkskull]?.status === 'terlambat'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.ekskull?.[selectedEkskull]?.status &&
                        data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] === date &&
                        data.Logs?.ekskull?.[selectedEkskull]?.status !== '' &&
                        data.Logs?.ekskull?.[selectedEkskull]?.status !== 'terlambat'
                          ? true
                          : false
                      ">
                      Terlambat
                    </button>
                  </div>

                  <!-- SAKIT BUTTON -->
                  <div class="box-radio">
                    <button
                      @click="
                        setAbsensi(
                          data.SK,
                          'sakit',
                          'ekskull',
                          data.Logs?.ekskull?.[selectedEkskull]?.status,
                          data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.ekskull?.[selectedEkskull]?.status ||
                        (data.Logs?.ekskull?.[selectedEkskull]?.status === '' && data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.ekskull?.[selectedEkskull]?.status && data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.ekskull?.[selectedEkskull]?.status === 'sakit'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.ekskull?.[selectedEkskull]?.status &&
                        data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] === date &&
                        data.Logs?.ekskull?.[selectedEkskull]?.status !== '' &&
                        data.Logs?.ekskull?.[selectedEkskull]?.status !== 'sakit'
                          ? true
                          : false
                      ">
                      Sakit
                    </button>
                  </div>

                  <!-- IZIN BUTTON -->
                  <div class="box-radio">
                    <button
                      @click="
                        setAbsensi(
                          data.SK,
                          'izin',
                          'ekskull',
                          data.Logs?.ekskull?.[selectedEkskull]?.status,
                          data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.ekskull?.[selectedEkskull]?.status ||
                        (data.Logs?.ekskull?.[selectedEkskull]?.status === '' && data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.ekskull?.[selectedEkskull]?.status && data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.ekskull?.[selectedEkskull]?.status === 'izin'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.ekskull?.[selectedEkskull]?.status &&
                        data.Logs?.ekskull?.[selectedEkskull]?.time?.split(' ')[0] === date &&
                        data.Logs?.ekskull?.[selectedEkskull]?.status !== '' &&
                        data.Logs?.ekskull?.[selectedEkskull]?.status !== 'izin'
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
    computed: {
      ...mapState("ekskullAbsensi", ["permissions", "date", "updateData"]),
      ...mapGetters("ekskullAbsensi", ["getEkskullOptions", "getSelectedEkskull", "getSantri"]),

      ekskullOptions() {
        return this.getEkskullOptions;
      },
      selectedEkskull: {
        get() {
          return this.getSelectedEkskull;
        },
        set(value) {
          this.$store.commit("ekskullAbsensi/setSelectedEkskull", value);
        },
      },
      santri: {
        get() {
          return this.getSantri;
        },
        set(value) {
          this.$store.commit("ekskullAbsensi/setSantri", value);
        },
      },
    },
    mounted() {
      // Fetch available ekskull options on load
      this.$store.dispatch("ekskullAbsensi/fetchEkskullOptions");
    },
    watch: {
      selectedEkskull(value) {
        if (value) {
          // Immediately fetch santri when an Ekskull is selected
          this.getDataSantri();
        } else {
          this.santri = [];
        }
      },
    },
    methods: {
      ...mapActions("ekskullAbsensi", ["setStatus", "deleteStatus", "getDataSantri"]),
      ...mapMutations("ekskullAbsensi", { changeStep: "setAbsensi" }),

      setAbsensi(sk, type, time, condition, dateTime) {
        const obj = { sk, type, time, condition };
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
  /* Keep your existing CSS */
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
