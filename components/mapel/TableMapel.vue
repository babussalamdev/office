<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Sort</th>
            <th scope="col">Nama Mapel</th>
            <th scope="col">Kelas</th>
            <th scope="col">Jurusan</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in mapel" :key="i">
            <td scope="row">{{ data.Sort }}</td>
            <td scope="row" class="text-capitalize">{{ data.Nama }}</td>
            <td scope="row" class="text-uppercase">{{ data.Kelas }}</td>
            <td scope="row" class="text-uppercase">{{ data.Jurusan }}</td>
            <td class="text-end">
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
    <ModalMapel :kelas="kelas" :jurusan="jurusan" :updateData="updateData" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  props: ["kelas", "jurusan"],
  data() {
    return {
      updateData: "",
    };
  },
  computed: {
    ...mapState("mapel", ["mapel"]),
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
          `delete-database?mapel=${key.split("#")[1]}&nama=${key.split("#")[2]}`
        );
        this.$store.commit("mapel/deleteMapel", key);
      }
    },
    async editItem(index) {
      $("#updateDataMapel").modal("show");
      this.updateData = this.mapel[index];
      // const result = await Swal.fire({
      //   title: "Apakah anda yakin?",
      //   text: "Data akan dihapus secara permanen!",
      //   icon: "warning",
      //   showCancelButton: true,
      //   confirmButtonColor: "#3085d6",
      //   cancelButtonColor: "#d33",
      //   confirmButtonText: "Yes, delete it!",
      // });

      // if (result.isConfirmed) {
      //   Swal.fire({
      //     position: "center",
      //     icon: "success",
      //     text: "Data berhasil dihapus!",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      //   const result = await this.$axios.$delete(
      //     `delete-database?mapel=${key.split("#")[1]}&nama=${key.split("#")[2]}`
      //   );
      //   this.$store.commit("mapel/deleteMapel", key);
      // }
    },
  },
};
</script>

<style scoped></style>
