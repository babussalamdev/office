<template>
  <section id="pegawai">
    <div class="pegawai animate__animated animate__fadeIn">
      <div class="row mt-3 animate__animated animate__fadeInUp">
        <div class="col-12 col-md-6"></div>
        <div class="col-12 col-md-6">
          <!-- <div class="input-group upload-data-santri">
            <input type="file" class="form-control" id="inputGroupFile02" />
          </div> -->
          <!-- Button trigger modal -->
          <div class="button-pegawai float-end">
            <button
              type="button"
              class="btn btn-sm btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#InputDataPegawai"
            >
              Tambah Pegawai
            </button>
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="table-responsive animate__animated animate__fadeInUp">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Orang Tua</th>
              <th scope="col">Alamat</th>
              <th scope="col">NISN</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(san, index) in santri" :key="index">
              <td scope="row">{{ san.nama }}</td>
              <td scope="row">{{ san.ortu }}</td>
              <td scope="row">{{ san.alamat }}</td>
              <td>{{ san.nisn }}</td>
              <td class="text-end">
                <a href="#" @click="edit(data.id)"
                  ><i class="bx bx-pencil text-primary"></i
                ></a>
                <a href="#" @click="rmv(data.id, data.name)"
                  ><i class="bx bx-trash text-danger"></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="InputDataPegawai"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="inputSantri" ref="inputDataSantri">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Input Data Santri
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="nama" class="form-label">Nama Santri</label>
                <input name="nama" type="text" class="form-control" id="nama" />
              </div>
              <div class="mb-3">
                <label for="ortu" class="form-label">Orang Tua</label>
                <input name="ortu" type="text" class="form-control" id="ortu" />
              </div>
              <div class="mb-3">
                <label for="alamat" class="form-label">Alamat</label>
                <input
                  name="alamat"
                  type="text"
                  class="form-control"
                  id="alamat"
                />
              </div>
              <div class="mb-3">
                <label for="nisn" class="form-label">NISN</label>
                <input name="nisn" type="text" class="form-control" id="nisn" />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      santri: [
        {
          nama: "Fauzan Gunawan",
          ortu: "Gunawan",
          alamat: "Bekasi, Jawa Barat",
          nisn: "321212412",
        },
        {
          nama: "Afifa Cantika",
          ortu: "Riyagung",
          alamat: "Cikarang, Jawa Barat",
          nisn: "145425232",
        },
      ],
    };
  },
  methods: {
    async inputSantri(event) {
      const data = Object.fromEntries(new FormData(event.target));
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(data);
        this.$refs.inputDataSantri.reset();
        $("#InputDataSantri").modal("hide");
      } else {
        Swal.fire({
          text: res.message,
          icon: "error",
          timer: 3000,
          timerProgressBar: false,
          showConfirmButton: false,
        });
      }
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/pegawai/pegawai.css);
</style>
