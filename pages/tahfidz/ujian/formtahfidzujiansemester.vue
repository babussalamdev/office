<template>
  <section id="rekaptahfidz">
    <div class="rekaptahfidz">
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="pendaftarantahfidzujian" autocomplete="off" />
        <label @click="move('pendaftarantahfidzujian')" class="btn btn-outline-dark" for="pendaftarantahfidzujian">Pendaftaran</label>

        <input type="radio" class="btn-check" name="btnradio" id="formtahfidzujian" autocomplete="off" />
        <label @click="move('formtahfidzujian')" class="btn btn-outline-dark" for="formtahfidzujian">Form Ujian</label>

        <input type="radio" class="btn-check" name="btnradio" id="formtahfidzujiansemester" autocomplete="off" checked />
        <label
          @click="move('formtahfidzujiansemester')"
          class="btn btn-outline-dark text-white"
          style="background-color: #176b87"
          for="formtahfidzujiansemester">
          Ujian Akhir Semester
        </label>
      </div>

      <div class="py-3">
        <!-- Dropdown Selection Container -->
        <div class="d-flex flex-wrap gap-2 mb-3">
          <!-- Dropdown 1: Main Type -->
          <div style="min-width: 200px">
            <select class="form-select" v-model="dropdownType" @change="handleTypeChange">
              <option value="pendaftar">Penguji</option>
              <option value="halaqah">Halaqah Saya</option>
              <option v-if="hasPermission('setup nilai quran')" value="koordinator">Koordinator</option>
            </select>
          </div>

          <!-- Dropdown 2: Select Filter (Only for Koordinator) -->
          <div v-if="dropdownType === 'koordinator'" style="min-width: 200px">
            <select class="form-select" v-model="koordinatorFilterBy" @change="fetchOptions">
              <option value="" disabled selected>Pilih Kategori...</option>
              <option value="kelas">Kelas</option>
              <option value="halaqah">Halaqah</option>
            </select>
          </div>

          <!-- Dropdown 3: List Options (Only for Koordinator after selecting category) -->
          <div v-if="dropdownType === 'koordinator' && koordinatorFilterBy" style="min-width: 200px">
            <select class="form-select" v-model="koordinatorFilterValue" @change="fetchData">
              <option value="" disabled selected>Pilih {{ koordinatorFilterBy }}...</option>
              <option v-for="(opt, index) in filterOptions" :key="index" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="table-responsive animate__animated animate__fadeInUp">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" class="text-start">Nama</th>
                <th scope="col" class="text-start">Juz</th>
                <th v-if="dropdownType !== 'halaqah'" scope="col" class="text-start">Halaqah</th>
                <th scope="col" class="text-start">Kelas</th>
                <th scope="col" class="text-start">Penguji</th>
                <th scope="col" class="text-start">Score</th>
                <th scope="col" class="text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in pendaftarujian" :key="index">
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Nama }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Juz }}</h1>
                </td>
                <td v-if="dropdownType !== 'halaqah'" class="text-capitalize align-middle">
                  <h1>{{ data.Halaqah }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Kelas }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Examiner_Name }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Score }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <a
                    href="javascript:;"
                    :class="{ 'text-muted opacity-50': data.Examiner_Name === 'Penugji Belum Ditetapkan' }"
                    :style="data.Examiner_Name === 'Penugji Belum Ditetapkan' ? 'cursor: not-allowed; pointer-events: none;' : ''"
                    @click="data.Examiner_Name !== 'Penugji Belum Ditetapkan' && openModal(data)">
                    <i class="bi bi-journal-check h5"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <NilaiModalUAS :show="isModalOpen" :studentData="selectedStudent" @close="isModalOpen = false" @refresh="fetchData" />
  </section>
</template>

<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    async asyncData({ store }) {
      store.dispatch("tahfidzujian/changeUnitUjianTahfidzUAS");
    },
    data() {
      return {
        isModalOpen: false,
        selectedStudent: null,
      };
    },
    computed: {
      ...mapState("index", ["permissions"]),
      ...mapState("tahfidzujian", ["pendaftarujian", "filterOptions"]),

      // Map Vuex state to computed properties with getters & setters
      dropdownType: {
        get() {
          return this.$store.state.tahfidzujian.selectedType;
        },
        set(value) {
          this.$store.commit("tahfidzujian/setSelectedType", value);
        },
      },
      koordinatorFilterBy: {
        get() {
          return this.$store.state.tahfidzujian.koordinatorFilterBy;
        },
        set(value) {
          this.$store.commit("tahfidzujian/setKoordinatorFilterBy", value);
        },
      },
      koordinatorFilterValue: {
        get() {
          return this.$store.state.tahfidzujian.koordinatorFilterValue;
        },
        set(value) {
          this.$store.commit("tahfidzujian/setKoordinatorFilterValue", value);
        },
      },
    },

    mounted() {
      this.closeAllModals();
    },
    methods: {
      ...mapMutations("tahfidzujian", ["move", "showDetail"]),
      hasPermission(permission) {
        return this.permissions?.includes(permission);
      },
      handleTypeChange() {
        if (this.dropdownType === "koordinator") {
          // Reset koordinator selections and clear table
          this.koordinatorFilterBy = "";
          this.koordinatorFilterValue = "";
          this.$store.commit("tahfidzujian/setFilterOptions", []);
          this.$store.commit("tahfidzujian/setPendaftarUjian", []);
        } else {
          // Normal fetch for Penguji or Halaqah
          this.fetchData();
        }
      },

      async fetchOptions() {
        // Reset sub-selection and clear table when main category changes
        this.koordinatorFilterValue = "";
        this.$store.commit("tahfidzujian/setPendaftarUjian", []);

        // Dispatch the action to fetch list of classes/halaqahs
        await this.$store.dispatch("tahfidzujian/fetchKoordinatorOptions");
      },

      fetchData() {
        // changeUnitUjianTahfidzUAS pulls parameters directly from state
        this.$store.dispatch("tahfidzujian/changeUnitUjianTahfidzUAS");
      },

      openModal(data) {
        this.selectedStudent = data;
        this.isModalOpen = true;
      },
      showDetail(sk) {
        this.$store.commit("tahfidzujian/showDetail", { sk });
      },
      closeAllModals() {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      },
    },
  };
</script>

<style>
  @import url(~/assets/css/santri/santri.css);
</style>
