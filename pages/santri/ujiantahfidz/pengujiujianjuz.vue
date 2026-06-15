<template>
  <section id="nilai-quran">
    <div class="nilai-quran">
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="pengujiujianjuz" autocomplete="off" checked />
        <label @click="move('pengujiujianjuz')" class="btn btn-outline-dark text-white" style="background-color: #176b87" for="pengujiujianjuz">
          Penguji Ujian Juz
        </label>

        <input type="radio" class="btn-check" name="btnradio" id="pengujiuas" autocomplete="off" />
        <label @click="move('pengujiuas')" class="btn btn-outline-dark" for="pengujiuas">Penguji UAS</label>
      </div>
      <div class="py-3">
        <div class="d-flex gap-3 mb-3">
          <!-- First Dropdown: Type Selection -->
          <div style="max-width: 250px; width: 100%">
            <label class="form-label text-muted small mb-1">Pilih Tipe</label>
            <select class="form-select" v-model="dropdownType" @change="onTypeChange">
              <option value="halaqah">Halaqah</option>
              <option value="onlykelas">Kelas</option>
            </select>
          </div>

          <!-- Second Dropdown: Specific Item Selection -->
          <div style="max-width: 250px; width: 100%">
            <label class="form-label text-muted small mb-1">Pilih {{ dropdownType === "halaqah" ? "Halaqah" : "Kelas" }}</label>
            <select class="form-select" v-model="dropdownValue" @change="onValueChange" :disabled="!listOptions.length">
              <option value="" disabled>-- Pilih Data --</option>
              <!-- Adjust item.value or item.name depending on your API response structure -->
              <option v-for="(item, index) in listOptions" :key="index" :value="item.Nama || item">
                {{ item.Nama || item }}
              </option>
            </select>
          </div>
        </div>

        <div class="table-responsive animate__animated animate__fadeInUp">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" class="text-start">Tanggal Ujian</th>
                <th scope="col" class="text-start">Nama</th>
                <th scope="col" class="text-start">Juz</th>
                <th scope="col" class="text-start">Kelas</th>
                <th scope="col" class="text-start">Halaqah</th>
                <th scope="col" class="text-start">Penguji</th>
                <th scope="col" class="text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Show message if table is empty -->
              <tr v-if="!pendaftarujian.length">
                <td colspan="8" class="text-center text-muted py-4">Data tidak ditemukan. Silakan pilih menu dropdown di atas.</td>
              </tr>
              <tr v-else v-for="(data, index) in pendaftarujian" :key="index">
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Date }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Nama }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Juz }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Halaqah }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Kelas }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Examiner_Name }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <a href="javascript:;" @click="openModal(data)">
                    <i class="bi bi-journal-check h5"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <SettingsPengujiModal :show="isModalOpen" :studentData="selectedStudent" @close="isModalOpen = false" @refresh="fetchData" />
  </section>
</template>

<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    async asyncData({ store }) {
      // Trigger the fetch for the initial list options on page load
      await store.dispatch("ujiantahfidzsettings/fetchListOptionsPuj");
    },
    data() {
      return {
        isModalOpen: false,
        selectedStudent: null,
      };
    },
    computed: {
      ...mapState("ujiantahfidzsettings", ["pendaftarujian", "listOptions"]),

      dropdownType: {
        get() {
          return this.$store.state.ujiantahfidzsettings.selectedType;
        },
        set(value) {
          this.$store.commit("ujiantahfidzsettings/setSelectedType", value);
        },
      },
      dropdownValue: {
        get() {
          return this.$store.state.ujiantahfidzsettings.selectedValue;
        },
        set(value) {
          this.$store.commit("ujiantahfidzsettings/setSelectedValue", value);
        },
      },
    },

    mounted() {
      this.closeAllModals();
    },
    methods: {
      ...mapMutations("ujiantahfidzsettings", ["move", "showDetail"]),

      // Step 1: Called when changing Halaqah <-> Kelas
      onTypeChange() {
        this.$store.dispatch("ujiantahfidzsettings/fetchListOptionsPuj");
      },

      // Step 2: Called when a specific Halaqah/Kelas is selected from the 2nd dropdown
      onValueChange() {
        this.$store.dispatch("ujiantahfidzsettings/fetchTableDataPuj");
      },

      fetchData() {
        // Re-fetch the table data if a dropdown value is already selected
        if (this.dropdownValue) {
          this.$store.dispatch("ujiantahfidzsettings/fetchTableDataPuj");
        }
      },

      openModal(data) {
        this.selectedStudent = data;
        this.isModalOpen = true;
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
  @import url(~/assets/css/setting/setting.css);
</style>
