<template>
  <div class="container-fluid p-0">
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div class="px-4 py-4 d-flex align-items-center" style="background-color: #f8f9fa; border-bottom: 4px solid #176b87">
        <div
          class="me-4 text-white d-flex align-items-center justify-content-center shadow-sm"
          style="background-color: #176b87; width: 60px; height: 60px; border-radius: 12px">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        </div>
        <div>
          <h4 class="mb-1 fw-bold text-dark text-uppercase letter-spacing">Muhammad Hafizh</h4>
          <p class="mb-0 text-secondary fw-medium d-flex align-items-center small">Penguji: Ust. Rif'an Ardianto, Lc</p>
        </div>
      </div>

      <div class="card-body p-4 p-md-5">
        <form @submit.prevent="handleSubmitNilai">
          <h5 class="mb-4 fw-bold d-flex align-items-center" style="color: #176b87">Input Nilai Evaluasi</h5>

          <div class="row mb-4 g-4">
            <div class="col-md-6">
              <label class="form-label text-secondary fw-semibold">Tanggal Ujian</label>
              <input type="date" v-model="form.tanggalUjian" class="form-control form-control-lg bg-light border-0 shadow-none" required />
            </div>

            <div class="col-md-6">
              <label class="form-label text-secondary fw-semibold">Juz yang Diujikan</label>
              <input
                type="number"
                v-model="form.juz"
                min="1"
                max="30"
                placeholder="Masukkan angka 1 - 30"
                class="form-control form-control-lg bg-light border-0 shadow-none"
                required />
            </div>
          </div>

          <div class="row mb-5 g-4">
            <div class="col-md-6">
              <div class="p-4 rounded-4 border" style="background-color: #fcfdfd">
                <div class="text-center mb-3">
                  <label class="form-label fw-bold text-dark mb-0">Kesalahan Kelancaran</label>
                </div>

                <div class="input-group input-group-lg w-75 mx-auto shadow-sm">
                  <button class="btn btn-white border px-4 custom-hover" type="button" @click="decrement('kelancaran')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    class="form-control text-center bg-white fw-bold fs-5 border-start-0 border-end-0"
                    :value="form.kelancaran"
                    readonly />
                  <button class="btn btn-white border px-4 custom-hover" type="button" @click="increment('kelancaran')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="p-4 rounded-4 border" style="background-color: #fcfdfd">
                <div class="text-center mb-3">
                  <label class="form-label fw-bold text-dark mb-0">Kesalahan Tajwid</label>
                </div>

                <div class="input-group input-group-lg w-75 mx-auto shadow-sm">
                  <button class="btn btn-white border px-4 custom-hover" type="button" @click="decrement('tajwid')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    class="form-control text-center bg-white fw-bold fs-5 border-start-0 border-end-0"
                    :value="form.tajwid"
                    readonly />
                  <button class="btn btn-white border px-4 custom-hover" type="button" @click="increment('tajwid')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <label class="form-label text-secondary fw-semibold">
              Keterangan Tambahan
              <span class="fw-normal text-muted">(Opsional)</span>
            </label>
            <textarea
              v-model="form.keterangan"
              class="form-control bg-light border-0 shadow-none p-3"
              rows="3"
              placeholder="Tuliskan catatan khusus terkait evaluasi santri disini..."></textarea>
          </div>

          <button
            type="submit"
            class="btn text-white w-100 py-3 fw-bold shadow-sm d-flex justify-content-center align-items-center fs-5 custom-submit-btn"
            style="background-color: #176b87; border-radius: 12px">
            Simpan Nilai Ujian
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "FormNilaiUjian",
    data() {
      return {
        form: {
          tanggalUjian: new Date().toISOString().substr(0, 10),
          juz: "",
          kelancaran: 0,
          tajwid: 0,
          keterangan: "",
        },
      };
    },
    methods: {
      ...mapActions("tahfidzujian", ["submitNilaiUjian"]),

      increment(type) {
        if (type === "kelancaran") this.form.kelancaran++;
        if (type === "tajwid") this.form.tajwid++;
      },
      decrement(type) {
        if (type === "kelancaran" && this.form.kelancaran > 0) this.form.kelancaran--;
        if (type === "tajwid" && this.form.tajwid > 0) this.form.tajwid--;
      },

      async handleSubmitNilai() {
        // Small validation to ensure they actually typed a number between 1 and 30
        if (this.form.juz < 1 || this.form.juz > 30) {
          return; // HTML5 min/max validation usually catches this, but good to have a backup
        }

        try {
          await this.submitNilaiUjian(this.form);
          this.clearForm();
        } catch (error) {
          console.error("Gagal submit nilai:", error);
        }
      },

      clearForm() {
        this.form = {
          tanggalUjian: new Date().toISOString().substr(0, 10),
          juz: "",
          kelancaran: 0,
          tajwid: 0,
          keterangan: "",
        };
      },
    },
  };
</script>

<style scoped>
  .letter-spacing {
    letter-spacing: 0.5px;
  }

  .btn-white {
    background-color: #ffffff;
  }

  .custom-hover {
    transition: all 0.2s ease;
    color: #176b87;
  }

  .custom-hover:hover {
    background-color: #176b87;
    color: #ffffff;
    border-color: #176b87 !important;
  }

  .custom-submit-btn {
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .custom-submit-btn:hover {
    background-color: #115369 !important; /* Slightly darker shade on hover */
  }

  .custom-submit-btn:active {
    transform: scale(0.98);
  }

  /* Hide the default HTML number arrows for a cleaner look */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
