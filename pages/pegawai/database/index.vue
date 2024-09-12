<template>
  <section id="pegawai">
    <div v-if="$auth.user.role === 'root'" class="pegawai">
      <div class="mt-3">
        <h2 class="mb-3">Pegawai Database - root</h2>
        <div class="row mb-3">
          <div class="col-12 col-md-6 pe-2 pe-md-5 mb-3 mb-md-0">
            <div class="input-group pe-0 pe-md-5" style="font-size: 12px;">
              <span style="font-size: 12px;" class="material-icons input-group-text"> search </span>
              <input style="font-size: 12px;" type="text" class="form-control" placeholder="search by name"
                v-model="search">
            </div>
          </div>
          <div class="col-12 col-md-6 d-flex gap-2">
            <!-- Button trigger modal -->

            <div class="button-santri">
              <button style="font-size: 12px;" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#InputDataPegawai">
                Tambah
                <!-- <i class="material-icons"> add </i> -->
              </button>
            </div>
            <div style="font-size: 12px;" class="upload-data-santri input-group">
              <input style="font-size: 12px;" type="file" class="form-control form-control-sm" id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04" aria-label="Upload" ref="fileInput" />
              <span>
                <button v-if="btn" style="font-size: 12px;" class="btn btn-sm btn-success" type="button"
                  id="inputGroupFileAddon04" @click="handleUpload">
                  Upload
                </button>
                <button v-else style="font-size: 12px;" class="btn btn-success btn-sm" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- table -->
      <TablePegawaiAdmin />

    </div>

    <div v-else class="pegawai">
      <!-- table -->
      <TablePegawai />
    </div>

    <!-- Modal -->
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      btn: true,
      page: 1,
      perPage: 10,
      table: "",
    };
  },

  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`pegawai/database/changeUnit`, program);
    return program;
  },

  computed: {
    ...mapGetters('pegawai/database', ['getSearch']),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('pegawai/database/setState', { key: 'search', value })
      }
    }
  },

  methods: {
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
          const base64 = base64String;
          const data = await this.$apiBase.$post(
            `input-pegawai?method=bulk`,
            base64
          );
          console.log(base64);
          console.log(data);
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil diinput",
            showConfirmButton: false,
            timer: 1500,
          });
          // this.$store.commit("santri/database/inputPegawaiBulk", data);
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
@import url(~/assets/css/pegawai/pegawai.css);

h2 {
  font-size: 14px;
}
</style>
