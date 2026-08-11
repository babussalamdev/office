<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <h2 class="mb-2">Jurnal Matan</h2>
      <div class="d-flex justify-content-between mb-3">
        <div class="d-flex gap-2">
          <select class="form-select" v-model="selectedKelas">
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">{{ data }}</option>
          </select>
          <select class="form-select" v-model="selectedMatan">
            <option value="" selected disabled>Matan</option>
            <option v-for="(data, index) in uniqueMatan" :key="index" :value="data.SK.split('#')[3]">{{ data.Nama }}</option>
          </select>
        </div>
        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inputModalJurnal" :disabled="!selectedMatan">
          tambah data
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" class="text-capitalize">Waktu</th>
              <th scope="col" class="text-capitalize">judul / pembahasan</th>
              <th scope="col" class="text-capitalize">catatan kejadian / solusi</th>
              <th scope="col" class="text-capitalize text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="uniqueClasses.length === 0 || uniqueMatan.length === 0">
              <td colspan="4" class="text-center">Anda tidak mengajar apapun hari ini</td>
            </tr>
            <tr v-for="(data, index) in values" :key="index">
              <td class="text-capitalize" scope="col">{{ data.SK.split("#")[2] }}</td>
              <td class="text-capitalize" scope="col">{{ data.Description }}</td>
              <td class="text-capitalize" scope="col">{{ data.Occurrence }}</td>
              <td class="text-capitalize text-end" scope="col">
                <a href="javascript:;" @click="editItem(data.SK)">
                  <button class="btn btn-sm btn-warning">
                    <i class="bx bx-pencil text-dark mb-0"></i>
                  </button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <JurnalMatanModal />
    <JurnalMatanModalUpdate />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

  export default {
    computed: {
      ...mapState("jurnalmatan", ["datas", "values", "schedule", "kelasOptions"]),
      ...mapGetters("jurnalmatan", ["getSelectedMatan", "getSelectedKelas"]),

      selectedMatan: {
        get() {
          return this.getSelectedMatan;
        },
        set(value) {
          this.setState({ key: "selectedMatan", value });
        },
      },
      selectedKelas: {
        get() {
          return this.getSelectedKelas;
        },
        set(value) {
          this.setState({ key: "selectedKelas", value });
        },
      },
      uniqueClasses() {
        // Get static classes from auth
        if (!this.kelasOptions) return [];
        return Array.isArray(this.kelasOptions) ? this.kelasOptions : [this.kelasOptions];
      },
      uniqueMatan() {
        // Filter the API response (datas) by matching the class extracted from the SK
        if (!this.selectedKelas) return [];
        return this.datas.filter((item) => item.SK.split("#")[2] === this.selectedKelas);
      },
      scheduleMatan() {
        // Cocokkan id/kode matan yang dipilih dengan SK yang di-split
        return this.uniqueMatan.find((x) => x.SK.split("#")[3] === this.selectedMatan);
      },
    },
    watch: {
      selectedKelas(value) {
        this.setState({ key: "reset", value });
        if (value && this.selectedMatan) {
          this.getData();
        }
      },
      selectedMatan(value) {
        if (value && this.selectedKelas) {
          this.getData();
        }
      },
      scheduleMatan(value) {
        if (value) {
          this.setState({ key: "schedule", value });
        }
      },
    },
    methods: {
      ...mapActions("jurnalmatan", ["getData"]),
      ...mapMutations("jurnalmatan", ["setState", "editItem"]),
    },
  };
</script>

<style scoped>
  a {
    font-size: 12px;
  }
  select {
    font-size: 12px;
    width: max-content !important;
  }
  .input-group label,
  .input-group input,
  .input-group i,
  .input-group span,
  button {
    font-size: 12px;
  }
  button {
    white-space: nowrap;
  }
  @media screen and (max-width: 576px) {
    select {
      width: 100% !important;
    }
  }
</style>
