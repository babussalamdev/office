<template>
  <div class="table-responsive animate__animated animate__fadeInUp">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">Sort</th>
          <th scope="col">Nama Halaqoh</th>
          <th scope="col">Program</th>
          <th scope="col" class="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, i) in halaqah" :key="i">
          <td scope="row">{{ data.Sort }}</td>
          <td scope="row">{{ data.Nama }}</td>
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
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: ["halaqah"],
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
          `delete-database?halaqah=${key.split("#")[1]}`
        );
        this.$emit("deleteHalaqah", key);
      }
    },
  },
};
</script>

<style scoped></style>
