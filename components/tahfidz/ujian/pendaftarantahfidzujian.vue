<template>
  <div class="container-fluid p-0">
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden" style="border-top: 5px solid #176b87">
      <div class="px-4 pt-5 pb-3 d-flex align-items-center border-bottom">
        <h4 class="mb-0 fw-bold d-flex align-items-center" style="color: #176b87">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="me-3" viewBox="0 0 16 16">
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
          Form Pendaftaran Ujian Tahfidz
        </h4>
      </div>

      <div class="card-body p-4 p-md-5">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4 pb-2">
            <label class="form-label fw-semibold text-secondary">
              Nama Lengkap Santri
              <span class="text-danger">*</span>
            </label>
            <select v-model="form.santri" class="form-select form-select-lg bg-light border-0 shadow-none text-dark" required>
              <option value="" disabled>-- Pilih Santri --</option>
              <option v-for="santri in halaqahsantri" :key="santri.SK" :value="santri.SK">
                {{ santri.Nama }}
              </option>
            </select>
          </div>

          <div class="row mb-5 g-4">
            <div class="col-md-6">
              <label class="form-label fw-semibold text-secondary">
                Juz yang akan diuji
                <span class="text-danger">*</span>
              </label>
              <select v-model="form.juz" class="form-select form-select-lg bg-light border-0 shadow-none text-dark" required>
                <option value="" disabled>-- Pilih Juz --</option>
                <option v-for="n in 30" :key="n" :value="n">Juz {{ n }}</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold text-secondary">
                Waktu Ujian
                <span class="text-danger">*</span>
              </label>
              <input
                type="date"
                v-model="form.waktuUjian"
                class="form-control form-control-lg bg-light border-0 shadow-none text-dark w-100"
                required />
            </div>
          </div>

          <div class="d-flex flex-column flex-md-row gap-3 pt-3 border-top">
            <button
              type="submit"
              class="btn text-white py-3 px-5 fw-bold shadow-sm custom-submit-btn fs-5 d-flex justify-content-center align-items-center flex-grow-1"
              style="background-color: #176b87; border-radius: 12px">
              Daftarkan Ujian
            </button>
            <button
              type="button"
              class="btn btn-light py-3 px-4 fw-medium text-secondary custom-clear-btn"
              style="border-radius: 12px"
              @click="clearForm">
              Bersihkan Form
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    name: "PendaftaranTahfidzUjian",
    data() {
      return {
        form: {
          santri: "",
          juz: "",
          waktuUjian: "",
        },
      };
    },
    computed: {
      ...mapState("tahfidzujian", ["halaqahsantri"]),
    },
    methods: {
      ...mapActions("tahfidzujian", ["submitPendaftaran"]),

      async handleSubmit() {
        try {
          await this.submitPendaftaran(this.form);
          this.clearForm();
        } catch (error) {
          console.error("Gagal:", error);
        }
      },
      clearForm() {
        this.form = {
          santri: "",
          juz: "",
          waktuUjian: "",
        };
      },
    },
  };
</script>

<style scoped>
  .custom-submit-btn {
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .custom-submit-btn:hover {
    background-color: #115369 !important; /* Darker shade on hover */
  }

  .custom-submit-btn:active {
    transform: scale(0.98);
  }

  .custom-clear-btn {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    transition: background-color 0.2s ease;
  }

  .custom-clear-btn:hover {
    background-color: #e2e6ea;
    color: #495057 !important;
  }
</style>
