<template>
  <div>
    <div class="d-flex justify-content-between flex-column flex-md-row mb-3 gap-2">
      <div class="d-flex align-items-center gap-1">
        <h2 class="mb-0 text-capitalize">
          Mutabaah Matan
          <span v-if="selectedMatanName" class="text-primary">- {{ selectedMatanName }}</span>
        </h2>
      </div>

      <div class="d-flex gap-2">
        <!-- Dropdown Kelas: Added dynamically -->
        <select class="form-select" style="font-size: 12px; max-width: max-content" v-model="selectedKelas" @change="handleKelasChange">
          <option value="" disabled>Pilih Kelas</option>
          <option v-for="(k, index) in kelas" :key="index" :value="k.Nama">{{ k.Nama }}</option>
        </select>

        <!-- Dropdown Matan -->
        <select class="form-select" style="font-size: 12px; max-width: max-content" v-model="selectedMatan">
          <option value="" selected disabled>Pilih Matan</option>
          <option v-for="(data, index) in listMatan" :value="data.SK" :key="index">
            {{ data.Nama }}
          </option>
        </select>
      </div>
    </div>

    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">Nama / Nis</th>
            <th scope="col" class="text-center text-capitalize" v-for="(value, key) in list" :key="key">
              {{ value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- State 1: No Matan Selected -->
          <tr v-if="!selectedMatan">
            <td :colspan="Object.keys(list).length + 1" class="text-center text-muted py-4">Silakan pilih Matan terlebih dahulu</td>
          </tr>

          <!-- State 2: Matan Selected, but Class/Santri is Empty -->
          <tr v-else-if="santri.length === 0">
            <td :colspan="Object.keys(list).length + 1" class="text-center text-muted py-4">Anda tidak mengajar apapun hari ini / Kelas kosong</td>
          </tr>

          <!-- State 3: Data Available -->
          <tr v-for="(data, index) in santri" :key="index" v-else>
            <td class="text-capitalize align-middle">
              <h1 class="h6 mb-1">{{ data.Nama }}</h1>
              <p class="text-secondary mb-0" style="font-size: 12px">{{ data.Nis }}</p>
            </td>
            <td class="text-center align-middle" v-for="(value, key) in list" :key="key">
              <a href="javascript:;" @click="showDetail(data.SK, key)">
                <i class="material-icons p-2 text-white rounded-circle shadow-sm" :class="getIconColor(key)">
                  {{ getIconName(key) }}
                </i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from "vuex";

  export default {
    computed: {
      ...mapState("mutabaahmatan", ["santri", "listMatan", "list", "kelas"]),
      ...mapGetters("mutabaahmatan", ["getSelectedMatan", "getSelectedKelas"]),

      selectedKelas: {
        get() {
          return this.getSelectedKelas;
        },
        set(value) {
          this.$store.commit("mutabaahmatan/setState", { key: "selectedKelas", value });
        },
      },
      selectedMatan: {
        get() {
          return this.getSelectedMatan;
        },
        set(value) {
          this.$store.commit("mutabaahmatan/setState", { key: "selectedMatan", value });

          // Sync selectedMatanName automatically when selectedMatan changes
          const matan = this.listMatan.find((m) => m.SK === value);
          const name = matan ? matan.Nama : "";
          this.$store.commit("mutabaahmatan/setState", { key: "selectedMatanName", value: name });
        },
      },
      selectedMatanName() {
        return this.$store.state.mutabaahmatan.selectedMatanName;
      },
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      ...mapActions("mutabaahmatan", ["changeUnit", "getDataSantri"]),

      async handleKelasChange() {
        // Reset matan selection
        this.$store.commit("mutabaahmatan/setState", { key: "selectedMatan", value: "" });
        this.$store.commit("mutabaahmatan/setState", { key: "selectedMatanName", value: "" });
        this.$store.commit("mutabaahmatan/setDataSantri", []); // Clear table briefly while loading

        // Fetch new data for the selected class (true = isManualChange)
        await this.changeUnit(true);
        await this.getDataSantri();
      },

      showDetail(sk, subject) {
        if (!this.selectedMatan) {
          this.$swal.fire({
            icon: "warning",
            title: "Perhatian",
            text: "Silakan pilih Matan terlebih dahulu!",
          });
          return;
        }

        this.$store.commit("mutabaahmatan/showDetail", { sk, subject });
        this.$router.push(`/kelas/mutabaahmatan/${sk.replace("#", "%23")}`);
      },
      getIconName(key) {
        const icons = {
          ziyadahmatan: "library_add",
        };
        return icons[key.toLowerCase()] || "check_circle";
      },
      getIconColor(key) {
        const colors = {
          ziyadahmatan: "bg-primary",
        };
        return colors[key.toLowerCase()] || "bg-secondary";
      },
      async fetchData() {
        await this.changeUnit();
        await this.getDataSantri();
      },
    },
  };
</script>

<style lang="scss" scoped></style>
