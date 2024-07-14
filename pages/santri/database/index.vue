<template>
  <section id="santri">
    <div class="santri">
      <div class="mt-3">
        <div class="database-santri mb-3">
          <div class="left">
            <select name="Kelas" id="kelas" v-model="angkatan" @change="changeUnit" class="form-select select"
              required>
              <option value="" selected disabled>Angkatan</option>
              <option v-for="(data, index) in years" :key="index" :value="data">
                {{ data }}
              </option>
            </select>
          </div>
          <div class="right">
            <!-- Button trigger modal -->

            <div class="button-santri">
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#InputDataSantri">
                Tambah
                <!-- <i class="material-icons"> add </i> -->
              </button>
            </div>
            <div class="upload-data-santri input-group">
              <input type="file" class="form-control form-control-sm" id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04" aria-label="Upload" ref="fileInput" />
              <span>
                <button v-if="btn2" class="btn btn-sm btn-success" type="button" id="inputGroupFileAddon04"
                  @click="handleUpload">
                  Tambah
                </button>
                <button v-else class="btn btn-success btn-sm" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- table -->
      <TableSantri />
    </div>

    <!-- Modal -->
    <!-- <SantriDbModal /> -->
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      btn2: true
    }
  },
  computed: {
    ...mapState('santri/database', ['angkatan', 'btn', 'years']),
    ...mapGetters('santri/database', ['getAngkatan']),
    angkatan: {
      get() {
        return this.getAngkatan
      },
      set(value) {
        this.$store.commit('santri/database/setAngkatan', value)
      }
    }
  },
  async asyncData({ store }) {
    store.dispatch(`santri/database/changeUnit`);
  },

  methods: {
    ...mapActions('santri/database', ['changeUnit']),
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
        this.btn2 = false;
        try {
          const base64String = reader.result.split(",")[1];
          const program = localStorage.getItem("program");
          const base64 = base64String;
          const data = await this.$apiSantri.$post(
            `input-santri-sisalam?method=bulk`,
            base64
          );
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diinput",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$store.commit("santri/database/inputSantriBulk", data);
          this.btn2 = true;
        } catch (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            text: "Data gagal diinput, Mohon periksa kembali!",
            showConfirmButton: false,
            timer: 2000,
          });
          this.btn2 = true;
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
