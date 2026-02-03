<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalImport"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="importForm">Import Data Penilaian</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <input
                type="file"
                class="form-control form-control-sm"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                ref="fileInput" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
            <span>
              <button v-if="btn2" class="btn btn-sm btn-success" type="button" id="inputGroupFileAddon04" @click="handleUpload">Upload</button>
              <button v-else class="btn btn-success btn-sm" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span class="visually-hidden" role="status">Loading...</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swal from "sweetalert2";
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        btn2: true,
      };
    },
    computed: {
      ...mapState("kelas/nilai", ["selectedMapel", "selectedSemester"]),
      ...mapState("index", ["label", "semester"]),
    },
    methods: {
      async handleUpload() {
        const file = this.$refs.fileInput.files[0]; // Dapatkan file dari input file
        const reader = new FileReader();

        // Validasi jika file tidak dipilih
        if (!file) {
          Swal.fire({
            icon: "error",
            title: "File Not Selected",
            text: "Please select a file",
          });
          return; // Hentikan eksekusi jika file belum dipilih
        }

        // Validasi jenis file
        if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
          Swal.fire({
            icon: "error",
            title: "Invalid File Type",
            text: "Only .xlsx files are allowed",
          });
          return; // Hentikan eksekusi jika jenis file tidak sesuai
        }

        // Validasi nama file
        const expectedFileName = `${this.selectedMapel.Nama} - ${this.selectedMapel.Kelas}`;
        const fileName = file.name.split(".").slice(0, -1).join("."); // Mengambil nama file tanpa ekstensi
        if (fileName !== expectedFileName) {
          Swal.fire({
            icon: "error",
            title: "Invalid File Name",
            text: `File name must be '${expectedFileName}'`,
          });
          return; // Hentikan eksekusi jika nama file tidak sesuai
        }

        reader.onload = async () => {
          this.btn2 = false;
          try {
            const base64String = reader.result.split(",")[1];
            const program = localStorage.getItem("program");
            const tahun = this.label;
            const semester = this.selectedSemester;
            const kelas = this.selectedMapel.Kelas;
            const Subject = this.selectedMapel.Nama;
            const Penilaian = this.selectedMapel.Penilaian;
            const base64Data = base64String;
            const datas = { base64Data, Subject, Penilaian };
            const data = await this.$apiSantri.$post(
              `input-nilai-sisalam?type=bulknilaimapel&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`,
              datas,
            );
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Data berhasil diinput",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$store.commit("kelas/nilai/setState", { key: "updateSantri", value: data });
            this.$refs.fileInput.value = "";
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

        reader.readAsDataURL(file); // Baca konten file sebagai data URL
      },
    },
  };
</script>

<style scoped></style>
