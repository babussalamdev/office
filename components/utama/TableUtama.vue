<template>
  <div class="table-responsive animate__animated animate__fadeInUp">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">Sort</th>
          <th scope="col">Semester</th>
          <th scope="col">Tahun</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, i) in periode" :key="i">
          <td scope="row">{{ data.Sort }}</td>
          <td scope="row">{{ data.Semester }}</td>
          <td scope="row" class="text-uppercase">{{ data.Tahun }}</td>
          <td scope="row">
            <span class="item" :class="data.Status === 'active' ? 'bg-success' : 'bg-danger'"">{{ data.Status }}</span>
          </td>
          <td class="text-end">
            <a href="javascript:;" @click="updateItem(data.SK, data.Status)"
              ><button
                class="btn"
                :class="
                  data.Status === 'active' ? 'btn-secondary' : 'btn-primary'
                "
              >
                {{ data.Status === "active" ? "off" : "on" }}
              </button></a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("periode", ["periode"]),
  },
  methods: {
    async updateItem(key, status) {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: "Subject akan dinonaktifkan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Non-Aktifkan",
      });
      const data = {
        Status: status === "active" ? "inactive" : "active",
      };

      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dinonaktifkan!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(data);
        const result = await this.$axios.$put(
          `update-database?subject=periode&sk=${key.split("#")[1]}`,
          data
        );
        const response = { key, Status: status === "active" ? "inactive" : "active" }
        this.$store.commit("periode/updateSubject", response);
      }
    },
  },
};
</script>

<style scoped></style>
