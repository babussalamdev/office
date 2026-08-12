<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <h2 class="mb-2">Jurnal Matan</h2>
      <div class="d-flex justify-content-between mb-3">
        <div class="d-flex gap-2">
          <!-- Dropdown Kelas: Using the dynamic kelas state and @change -->
          <select class="form-select" v-model="selectedKelas" @change="handleKelasChange">
            <option value="" selected disabled>Kelas</option>
            <option v-for="(k, index) in kelas" :key="index" :value="k.Nama">{{ k.Nama }}</option>
          </select>

          <!-- Dropdown Matan: Loops directly over 'datas' -->
          <select class="form-select" v-model="selectedMatan">
            <option value="" selected disabled>Matan</option>
            <option v-for="(data, index) in datas" :key="index" :value="data.SK.split('#')[3]">{{ data.Nama }}</option>
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
            <tr v-if="kelas.length === 0 || datas.length === 0">
              <td colspan="4" class="text-center">Anda tidak mengajar apapun hari ini / Kelas kosong</td>
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
      // Map 'kelas' from state to power the dropdown
      ...mapState("jurnalmatan", ["datas", "values", "schedule", "kelas"]),
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
      scheduleMatan() {
        // Find the selected matan object directly from datas
        if (!this.selectedMatan) return null;
        return this.datas.find((x) => x.SK.split("#")[3] === this.selectedMatan);
      },
    },
    watch: {
      // ONLY watch selectedMatan to fetch journal data.
      // Do NOT watch selectedKelas to prevent infinite API loops.
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
    mounted() {
      // Fetch classes and matans on page load
      this.changeUnit();
    },
    methods: {
      ...mapActions("jurnalmatan", ["getData", "changeUnit"]),
      ...mapMutations("jurnalmatan", ["setState", "editItem"]),

      handleKelasChange() {
        // Reset matan selection and values array via existing 'reset' mutation logic
        this.setState({ key: "reset" });
        // Fetch the new list of Matans for this newly selected class
        this.changeUnit(true);
      },
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
