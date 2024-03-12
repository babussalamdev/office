<template>
  <div>
    <div class="row mt-3 animate__animated animate__fadeInUp">
      <div class="col-12 col-md-6"></div>
      <div class="col-12 col-md-6">
        <!-- Button trigger modal -->
        <div class="button-santri float-end">
          <button
            type="button"
            class="btn btn-sm btn-primary button-santri"
            data-bs-toggle="modal"
            data-bs-target="#inputEkskull"
          >
            Tambah Eskul
          </button>
        </div>
      </div>
    </div>

    <!-- table eskul -->
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Urutan</th>
            <th scope="col">Nama Ekskull</th>
            <th scope="col">Program</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in ekskull" :key="i">
            <td scope="row">{{ data.Sort }}</td>
            <td scope="row" class="text-capitalize">{{ data.Nama }}</td>
            <td scope="row" class="text-uppercase">{{ data.Program }}</td>
            <td class="text-end">
              <a href="javascript:;" @click="deleteItem(data.SK)"
                ><i class="bx bx-trash text-danger"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("kelas", ["ekskull"]),
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
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
        const result = await this.$axios.$delete(
          `delete-database?ekskull=${key.split("#")[1]}`
        );
        this.$store.commit("kelas/deleteEkskull", key);
      }
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/setting/setting.css);
</style>
