<template>
  <div>
    <!-- mapel input -->
    <div class="row mt-3 animate__animated animate__fadeInUp">
      <div class="col-12 col-md-6"></div>
      <div class="col-12 col-md-6">
        <!-- Button trigger modal -->
        <div class="button-santri float-end">
          <button
            type="button"
            class="btn btn-sm btn-primary button-santri"
            data-bs-toggle="modal"
            data-bs-target="#inputDataStruktur"
          >
            Tambah Data
          </button>
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Permission</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in absensi" :key="i">
            <td scope="row" class="text-capitalize align-middle">
              {{ data.Nama }}
            </td>
            <td scope="row" class="text-uppercase container-permissions">
              <div
                v-for="(value, i) in data.Permissions.split(',')"
                :key="i"
                style="display: inline"
              >
                <div class="btn-group btn-group-sm px-1 py-1 list-permissions">
                  <div class="btn btn-secondary disabled">
                    <span>{{ value }}</span>
                  </div>
                </div>
              </div>
            </td>
            <td class="text-end align-middle">
              <a href="javascript:;" @click="editItem(i)"
                ><i class="bx bx-edit text-primary"></i
              ></a>
              <a href="javascript:;" @click="deleteItem(data.SK)"
                ><i class="bx bx-trash text-danger"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- modal -->
    <ModalSetupAbsensi :updateData="updateData" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  data() {
    return {
      updateData: "",
      // absensi: [
      //   {
      //     Sort: "1",
      //     Nama: "Wali Kelas",
      //     Permissions: "pondok,absen",
      //   },
      //   {
      //     Sort: "1",
      //     Nama: "Kesantrian",
      //     Permissions: "pondok,sakit",
      //   },
      // ],
    };
  },
  computed: {
    ...mapState("setupabsensi", ["absensi", "struktur"]),
  },
  methods: {
    async deleteItem(key) {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const program = localStorage.getItem("program");
        await this.$axios.$delete(
          `delete-database?subject=absensi&program=${program}&code=${
            key.split("#")[1]
          }`
        );
        this.$store.commit("setupabsensi/deleteStruktur", key);
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil dihapus!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    },
    async editItem(index) {
      $("#updateDataStruktur").modal("show");
      this.updateData = this.absensi[index];
    },
  },
};
</script>

<style scoped></style>
