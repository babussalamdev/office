<template>
  <section id="santri">
    <div class="santri">
      <div class="mt-3">
        <div class="database-santri mb-3">
          <div class="left">
            <select
              name="Kelas"
              id="kelas"
              v-model="angkatan"
              @change="angkatanLoad"
              class="form-select select"
              required
            >
              <option value="" selected disabled>Angkatan</option>
              <option v-for="(data, index) in years" :key="index" :value="data">
                {{ data }}
              </option>
            </select>
          </div>
          <div class="right">
            <!-- Button trigger modal -->

            <div class="button-santri">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#InputDataSantri"
              >
                Tambah
                <!-- <i class="material-icons"> add </i> -->
              </button>
            </div>
            <div class="upload-data-santri input-group">
              <input
                type="file"
                class="form-control form-control-sm"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                ref="fileInput"
              />
              <span>
                <button
                  v-if="btn"
                  class="btn btn-sm btn-success"
                  type="button"
                  id="inputGroupFileAddon04"
                  @click="handleUpload"
                >
                  Tambah
                </button>
                <button
                  v-else
                  class="btn btn-success btn-sm"
                  type="button"
                  disabled
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- table -->
      <TableSantri :years="years" />
    </div>

    <!-- Modal -->
    <!-- <SantriDbModal /> -->
  </section>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      btn: true,
      years: [],
    };
  },

  mounted() {
    const tahunMulai = 2018;
    const tahunSekarang = new Date().getFullYear();
    this.years = Array.from(
      { length: tahunSekarang - tahunMulai + 2 },
      (_, index) => tahunMulai + index
    );
  },

  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    const angkatan = new Date().getFullYear();
    const data = {
      program: program,
      angkatan: angkatan,
    };
    store.dispatch(`santri/database/changeUnit`, data);
    return { angkatan };
  },

  methods: {
    angkatanLoad() {
      const program = localStorage.getItem("program");
      const data = {
        program: program,
        angkatan: this.angkatan,
      };
      this.$store.dispatch(`santri/database/changeUnit`, data);
    },

    async handleUpload() {
      const file = this.$refs.fileInput.files[0]; // Dapatkan file dari input file
      const reader = new FileReader();

      // Validasi jenis file
      if (
        file &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Tampilkan notifikasi menggunakan Sweet Alert jika jenis file tidak sesuai
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Only .xlsx files are allowed",
        });
        return; // Hentikan eksekusi jika jenis file tidak sesuai
      }

      reader.onload = async () => {
        this.btn = false;
        try {
          const base64String = reader.result.split(",")[1];
          const program = localStorage.getItem("program");
          const base64 = base64String;
          const data = await this.$axios.$post(
            `/input-santri?method=bulk&program=${program}`,
            base64
          );
          console.log(data);
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diinput",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$store.commit("santri/database/inputSantriBulk", data);
          this.btn = true;
        } catch (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            text: "Data gagal diinput, Mohon periksa kembali!",
            showConfirmButton: false,
            timer: 2000,
          });
          this.btn = true;
          console.error(error);
        }
      };

      // Periksa apakah file telah dipilih
      if (file) {
        reader.readAsDataURL(file); // Baca konten file sebagai data URL
      } else {
        // Tampilkan notifikasi jika file belum dipilih
        Swal.fire({
          icon: "error",
          title: "File Not Selected",
          text: "Please select a file",
        });
      }
    },
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
