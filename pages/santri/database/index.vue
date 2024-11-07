<template>
  <section id="santri">
    <div class="santri">
      <div class="mb-2 row">
        <div class="col-12 col-md-6 d-flex mb-2 mb-md-0">
          <select style="font-size: 12px; max-width: max-content" class="form-select" v-model="selectBy"
            @change="resetTable">
            <option value="" selected disabled>Select By</option>
            <option value="angkatan">Angkatan</option>
            <option value="kelas">Kelas</option>
          </select>
          <select v-if="selectBy === 'angkatan'" style="font-size: 12px; max-width: max-content;" name="Kelas"
            id="kelas" v-model="angkatan" @change="getSantri" class="form-select select" required>
            <option value="" selected disabled>Angkatan</option>
            <option v-for="(data, index) in years" :key="index" :value="data">
              {{ data }}
            </option>
          </select>
          <select v-if="selectBy === 'kelas'" style="font-size: 12px; max-width: max-content;" name="Kelas" id="kelas"
            v-model="kelas" @change="getSantri" class="form-select select" required>
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in listKelas" :key="index" :value="data.Nama">
              {{ data.Nama }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 col-md-6 d-flex pe-3 pe-md-4 pe-lg-5 mb-2 mb-md-0">
          <div class="input-group" style="font-size: 12px;">
            <span class="input-group-text bg-success text-white" style="font-size: 12px;">{{ santri ? santri?.length : 0 }} santri </span>
            <span class="input-group-text material-icons" style="font-size: 12px;"> search </span>
            <input style="font-size: 12px;" type="text" class="form-control" v-model="search" placeholder="search by name">
          </div>
        </div>
        <div class="col-12 col-md-6 d-flex gap-1 ps-3 ps-md-4 ps-lg-5">
          <!-- Button trigger modal -->
          <div class="button-santri">
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
              data-bs-target="#InputDataSantri" style="font-size: 12px;">
              Tambah
              <!-- <i class="material-icons"> add </i> -->
            </button>
          </div>
          <div class="upload-data-santri input-group">
            <input style="font-size: 12px;" type="file" class="form-control form-control-sm" id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04" aria-label="Upload" ref="fileInput" />
            <span>
              <button v-if="btn2" class="btn btn-sm btn-success" type="button" id="inputGroupFileAddon04"
                @click="handleUpload" style="font-size: 12px;">
                Upload
              </button>
              <button v-else class="btn btn-success btn-sm" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span class="visually-hidden" role="status">Loading...</span>
              </button>
            </span>
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
  // middleware: 'permission',
  // meta: {
  //   permissions: ['data santri']
  // },
  data() {
    return {
      btn2: true
    }
  },
  computed: {
    ...mapState('santri/database', ['btn', 'years', 'listKelas', 'santri']),
    ...mapGetters('santri/database', ['getAngkatan', 'getSelectBy', 'getKelas', 'getSearch']),
    angkatan: {
      get() {
        return this.getAngkatan
      },
      set(value) {
        this.$store.commit('santri/database/setAngkatan', value)
      }
    },
    kelas: {
      get() {
        return this.getKelas
      },
      set(value) {
        this.$store.commit('santri/database/setKelas', value)
      }
    },
    selectBy: {
      get() {
        return this.getSelectBy
      },
      set(value) {
        this.$store.commit('santri/database/setSelectBy', value)
      }
    },
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('santri/database/setState', { key: 'search', value })
      }
    }
  },
  async asyncData({ store }) {
    store.dispatch(`santri/database/changeUnit`);
  },
  mounted() {
    this.closeAllModals();;
  },

  methods: {
    ...mapActions('santri/database', ['getSantri']),
    ...mapMutations('santri/database', ['resetTable']),
    closeAllModals() {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      // Menghapus kelas dan style dari body
      document.body.classList.remove('modal-open'); // Menghapus kelas
      document.body.style.overflow = ''; // Menghapus gaya inline
      document.body.style.paddingRight = ''; // Menghapus gaya inline
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
        this.btn2 = false;
        try {
          const base64String = reader.result.split(",")[1];
          const program = localStorage.getItem("program");
          const base64 = base64String;
          const data = await this.$apiSantri.$post(
            `input-santri-sisalam?method=bulk&angkatan=${this.angkatan}&program=${program}`,
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
