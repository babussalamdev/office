<template>
  <div>
    <div class="d-flex justify-content-between flex-column flex-md-row mb-3 gap-2">
      <div class="d-flex align-items-center gap-1">
        <!-- Add the selectedMatanName here -->
        <h2 class="mb-0 text-capitalize">
          Mutabaah Matan
          <span v-if="selectedMatanName" class="text-primary">- {{ selectedMatanName }}</span>
        </h2>
      </div>

      <select class="form-select" style="font-size: 12px; max-width: max-content" v-model="selectedMatan">
        <option value="" selected disabled>Pilih Matan</option>
        <option v-for="(data, index) in listMatan" :value="data.SK" :key="index">
          {{ data.Nama }}
        </option>
      </select>
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
          <tr v-for="(data, index) in santri" :key="index">
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
      ...mapState("mutabaahmatan", ["santri", "listMatan", "list"]),
      ...mapGetters("mutabaahmatan", ["getSelectedMatan"]),
      selectedMatan: {
        get() {
          return this.getSelectedMatan;
        },
        set(value) {
          this.$store.commit("mutabaahmatan/setState", { key: "selectedMatan", value });
        },
      },
      selectedMatanName() {
        if (!this.selectedMatan || !this.listMatan) return "";
        const matan = this.listMatan.find((m) => m.SK === this.selectedMatan);
        return matan ? matan.Nama : "";
      },
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      ...mapActions("mutabaahmatan", ["changeUnit", "getDataSantri"]),

      // Inside index.vue -> methods
      showDetail(sk, subject) {
        if (!this.selectedMatan) {
          this.$swal.fire({
            icon: "warning",
            title: "Perhatian",
            text: "Silakan pilih Matan terlebih dahulu!",
          });
          return;
        }

        // 1. Commit the data to Vuex
        this.$store.commit("mutabaahmatan/showDetail", { sk, subject });

        // 2. Route the user using the exact folder path from your image
        this.$router.push(`/kelas/mutabaahmatan/${sk.replace("#", "%23")}`);
      },
      getIconName(key) {
        const icons = {
          ziyadah: "library_add",
        };
        return icons[key.toLowerCase()] || "check_circle";
      },
      getIconColor(key) {
        const colors = {
          ziyadah: "bg-primary",
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
