<template>
  <div>
    <div class="d-flex justify-content-between flex-column flex-md-row mb-3 gap-2">
      <div class="d-flex align-items-center gap-1">
        <h2 class="mb-0">mutabaah</h2>

        <select v-if="hasHalaqah && hasIdhofi" class="form-select w-auto" v-model="localSelectedType" @change="fetchData">
          <option value="halaqah">Halaqah</option>
          <option value="HalaqahIdhofi">Idhofi</option>
        </select>

        <h2 v-else-if="hasHalaqah">Halaqah</h2>
        <h2 v-else-if="hasIdhofi">Idhofi</h2>
      </div>

      <select
        v-if="listHalaqah.length > 0"
        class="form-select"
        style="font-size: 12px; max-width: max-content"
        @change="getHalaqahKoordinator()"
        v-model="selectedHalaqah">
        <option value="" selected disabled>halaqah</option>
        <option v-for="(data, index) in listHalaqah" :value="data" :key="index">{{ data }}</option>
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
              <h1>{{ data.Nama }}</h1>
              <p class="text-secondary mt-1">{{ data.Nis }}</p>
            </td>
            <td class="text-center align-middle" v-for="(value, key) in list" :key="key">
              <a href="javascript:;" @click="showDetail(data.SK, key)">
                <i class="material-icons p-2 text-white rounded-circle" :class="getIconColor(key)">
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
  import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        dummy: [
          {
            Nama: "Fauzan Gunawan",
            Nis: "3423321",
          },
        ],
      };
    },
    computed: {
      ...mapState("mutabaah", ["santri", "listHalaqah", "selectedType", "list"]),
      ...mapGetters("mutabaah", ["getSelectedHalaqah"]),
      localSelectedType: {
        get() {
          return this.selectedType;
        },
        set(value) {
          this.$store.commit("mutabaah/setState", { key: "selectedType", value });
        },
      },
      selectedHalaqah: {
        get() {
          return this.getSelectedHalaqah;
        },
        set(value) {
          this.$store.commit("mutabaah/setState", { key: "selectedHalaqah", value });
        },
      },
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
      ...mapActions("mutabaah", ["getHalaqahKoordinator"]),
      // ...mapMutations('mutabaah', ['showDetail'])
      showDetail(sk, subject) {
        this.$store.commit("mutabaah/showDetail", { sk, subject });
      },
      getIconName(key) {
        const icons = {
          ziyadah: "library_add",
          murojaah: "restart_alt",
          tilawah: "auto_stories",
          tahsin: "mic",
        };
        // Return the matched icon, or a default one if the key is new
        return icons[key.toLowerCase()] || "check_circle";
      },

      getIconColor(key) {
        const colors = {
          ziyadah: "bg-primary",
          murojaah: "bg-warning",
          tilawah: "bg-success",
          tahsin: "bg-danger",
        };
        // Return the matched background class, or a default one
        return colors[key.toLowerCase()] || "bg-secondary";
      },
      fetchData() {
        this.$store.dispatch("mutabaah/changeUnit");
      },
    },
  };
</script>

<style lang="scss" scoped></style>
