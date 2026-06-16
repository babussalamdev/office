<template>
  <section id="nilai-quran">
    <div class="nilai-quran">
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="pendaftarantahfidzujian" autocomplete="off" />
        <label @click="move('pengujiujianjuz')" class="btn btn-outline-dark" for="pendaftarantahfidzujian">Penguji Ujian Juz</label>

        <input type="radio" class="btn-check" name="btnradio" id="pengujiuas" autocomplete="off" checked />
        <label @click="move('pengujiuas')" class="btn btn-outline-dark text-white" style="background-color: #176b87" for="pengujiuas">
          Penguji UAS
        </label>
      </div>
      <div class="py-3">
        <div class="d-flex gap-3 mb-3 align-items-end">
          <div style="max-width: 250px; width: 100%">
            <label class="form-label text-muted small mb-1">Pilih Tipe</label>
            <select class="form-select" v-model="dropdownType" @change="onTypeChange">
              <option value="halaqah">Halaqah</option>
              <option value="onlykelas">Kelas</option>
            </select>
          </div>

          <div style="max-width: 250px; width: 100%">
            <label class="form-label text-muted small mb-1">Pilih {{ dropdownType === "halaqah" ? "Halaqah" : "Kelas" }}</label>
            <select class="form-select" v-model="dropdownValue" @change="onValueChange" :disabled="!listOptions.length">
              <option value="" disabled>-- Pilih Data --</option>
              <option v-for="(item, index) in listOptions" :key="index" :value="item.Nama || item">
                {{ item.Nama || item }}
              </option>
            </select>
          </div>

          <div class="ms-auto">
            <button class="btn text-white" style="background-color: #176b87" :disabled="!selectedStudents.length" @click="isBulkModalOpen = true">
              <i class="bi bi-pencil-square me-1"></i>
              Update Penguji ({{ selectedStudents.length }})
            </button>
          </div>
        </div>

        <div class="table-responsive animate__animated animate__fadeInUp">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" class="text-center" style="width: 50px">
                  <input class="form-check-input" type="checkbox" v-model="selectAll" :disabled="!pendaftarujian.length" />
                </th>
                <th scope="col" class="text-start">Nama</th>
                <th scope="col" class="text-start">Juz</th>
                <th scope="col" class="text-start">Kelas</th>
                <th scope="col" class="text-start">Halaqah</th>
                <th scope="col" class="text-start">Penguji</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!pendaftarujian.length">
                <td colspan="6" class="text-center text-muted py-4">Data tidak ditemukan. Silakan pilih menu dropdown di atas.</td>
              </tr>
              <tr v-else v-for="(data, index) in pendaftarujian" :key="index">
                <td class="text-center align-middle">
                  <input class="form-check-input" type="checkbox" :value="data" v-model="selectedStudents" />
                </td>
                <td class="text-capitalize align-middle">
                  <p class="mb-0">{{ data.Nama }}</p>
                </td>
                <td class="text-capitalize align-middle">
                  <p class="mb-0">{{ data.Juz }}</p>
                </td>
                <td class="text-capitalize align-middle">
                  <p class="mb-0">{{ data.Halaqah }}</p>
                </td>
                <td class="text-capitalize align-middle">
                  <p class="mb-0">{{ data.Kelas }}</p>
                </td>
                <td class="text-capitalize align-middle">
                  <p class="mb-0">{{ data.Examiner_Name || "-" }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <SettingsPengujiUasModal
      v-if="isBulkModalOpen"
      :show="isBulkModalOpen"
      :students="selectedStudents"
      @close="closeBulkModal"
      @refresh="fetchData" />
  </section>
</template>

<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    async asyncData({ store }) {
      await store.dispatch("ujiantahfidzsettings/fetchListOptionsPuj");
    },
    data() {
      return {
        isBulkModalOpen: false,
        selectedStudents: [], // Holds checked rows
      };
    },
    computed: {
      ...mapState("ujiantahfidzsettings", ["pendaftarujian", "listOptions"]),

      // Handles the Select All logic
      selectAll: {
        get() {
          return this.pendaftarujian.length > 0 && this.selectedStudents.length === this.pendaftarujian.length;
        },
        set(value) {
          if (value) {
            this.selectedStudents = [...this.pendaftarujian];
          } else {
            this.selectedStudents = [];
          }
        },
      },

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

      onTypeChange() {
        this.selectedStudents = []; // Reset selections on change
        this.$store.dispatch("ujiantahfidzsettings/fetchListOptionsPuj");
      },
      onValueChange() {
        this.selectedStudents = []; // Reset selections on change
        this.$store.dispatch("ujiantahfidzsettings/fetchTableDataPuas");
      },
      fetchData() {
        this.selectedStudents = []; // Reset after refresh/update
        if (this.dropdownValue) {
          this.$store.dispatch("ujiantahfidzsettings/fetchTableDataPuas");
        }
      },
      closeBulkModal() {
        this.isBulkModalOpen = false;
      },
      closeAllModals() {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) backdrop.remove();
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
