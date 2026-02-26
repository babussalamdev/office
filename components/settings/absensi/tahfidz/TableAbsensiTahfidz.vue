<template>
  <div>
    <div>
      <div class="head d-flex align-items-center mb-3 justify-content-between">
        <div class="d-flex align-items-center gap-1">
          <h2 class="mb-0">Absensi Tahfidz</h2>

          <select v-if="hasHalaqah && hasIdhofi" class="form-select w-auto" v-model="localSelectedType" @change="fetchData">
            <option value="halaqah">Halaqah</option>
            <option value="HalaqahIdhofi">Idhofi</option>
          </select>

          <h2 v-else-if="hasHalaqah">Halaqah</h2>
          <h2 v-else-if="hasIdhofi">Idhofi</h2>
        </div>

        <nuxt-link
          v-if="permissionsIndex.includes('absensi pengampu')"
          to="/tahfidz/absensi/monitoring"
          style="font-size: 12px"
          class="btn btn-sm btn-secondary text-decoration-none">
          <i class="bi bi-eye-fill me-2"></i>
          Monitoring
        </nuxt-link>
      </div>
      <ModalAbsensiTahfidz />
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Asrama</th>
              <th scope="col" class="text-center text-capitalize" v-for="waktu in list" :key="waktu">{{ waktu }}</th>
              <th scope="col" class="text-end">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in santri" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nis }}</p>
              </td>
              <td class="text-capitalize align-middle">
                <span
                  style="font-size: 10px"
                  class="py-1 px-2 rounded-1"
                  :class="
                    data.Logs?.asrama.status === 'rumah'
                      ? 'text-bg-secondary'
                      : data.Logs?.asrama.status === 'sekolah'
                      ? 'text-bg-success'
                      : data.Logs?.asrama.status === 'izin'
                      ? 'text-bg-primary'
                      : data.Logs?.asrama.status === 'sakit'
                      ? 'text-bg-warning'
                      : 'text-bg-danger'
                  ">
                  <i class="material-icons mb-0 me-1" style="font-size: 10px">
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
              <td v-for="waktu in list" :key="waktu" class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <button
                      @click="
                        setAbsensi(
                          data.SK,
                          'absen',
                          waktu,
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status,
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status ||
                        (data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status === '' &&
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status &&
                            data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status === 'absen'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] === date &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status !== '' &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status !== 'absen'
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
                          waktu,
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status,
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status ||
                        (data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status === '' &&
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status &&
                            data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status === 'terlambat'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] === date &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status !== '' &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status !== 'terlambat'
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
                          waktu,
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status,
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status ||
                        (data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status === '' &&
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status &&
                            data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status === 'sakit'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] === date &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status !== '' &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status !== 'sakit'
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
                          waktu,
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status,
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0],
                        )
                      "
                      :class="
                        !data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status ||
                        (data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status === '' &&
                          data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] === date)
                          ? 'bg-white'
                          : data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status &&
                            data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] !== date
                          ? 'bg-white'
                          : data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status === 'izin'
                          ? 'bg-primary text-white border-0'
                          : 'bg-secondary text-white border-0'
                      "
                      :disabled="
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.time?.split(' ')[0] === date &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status !== '' &&
                        data.Logs?.[selectedType.toLowerCase()]?.[waktu]?.status !== 'izin'
                          ? true
                          : false
                      ">
                      Izin
                    </button>
                  </div>
                </div>
              </td>

              <td class="align-middle text-end">
                <a style="padding: 0" href="javascript:;" @click="openModal(data.SK, 'modalcatatanpagi')">
                  <button class="btn btn-sm btn-primary">
                    <i class="material-symbols-outlined">clear_day</i>
                  </button>
                </a>
                <a style="padding: 0" href="javascript:;" @click="openModal(data.SK, 'modalcatatansore')">
                  <button class="btn btn-sm btn-warning">
                    <i class="material-symbols-outlined">bedtime</i>
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
        santri: (state) => state.santri,
        permissions: (state) => state.permissions, // Alias untuk permissions di modul tahfidzAbsensi
        select: (state) => state.select,
        date: (state) => state.date,
        updateData: (state) => state.updateData,
        list: (state) => state.list,
        selectedType: (state) => state.selectedType, // MAP NEW STATE
      }),
      ...mapState("index", {
        permissionsIndex: (state) => state.permissions, // Alias untuk permissions di modul index
      }),
      localSelectedType: {
        get() {
          return this.selectedType;
        },
        set(val) {
          this.$store.commit("tahfidzAbsensi/setState", { key: "selectedType", value: val });
        },
      },
      // Check if Halaqah exists for current program
      hasHalaqah() {
        const program = process.client ? localStorage.getItem("program") : null;
        if (!program) return false;
        const data = this.$auth.user.Halaqah?.[program];
        return data && data !== "off";
      },

      // Check if Idhofi exists for current program
      hasIdhofi() {
        const program = process.client ? localStorage.getItem("program") : null;
        if (!program) return false;
        const data = this.$auth.user.HalaqahIdhofi?.[program];
        return data && data !== "off";
      },
    },
    methods: {
      ...mapActions("tahfidzAbsensi", ["setStatus", "deleteStatus"]),
      ...mapMutations("tahfidzAbsensi", { changeStep: "setAbsensi", changeModal: "openModal" }),
      setAbsensi(sk, type, time, condition, dateTime) {
        const obj = {
          sk,
          type,
          time,
          condition,
        };
        if (condition && dateTime === this.date) {
          this.deleteStatus(obj);
        } else {
          this.changeStep(obj);
        }
      },
      getAbsensi() {
        const kelas = this.selectKelas;
        this.$store.dispatch("asramaAbsensi/getAbsensi", kelas);
      },
      openModal(sk, modal) {
        const obj = { sk, modal };
        this.changeModal(obj);
      },
      fetchData() {
        this.$store.dispatch("tahfidzAbsensi/changeUnit");
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
</style>
