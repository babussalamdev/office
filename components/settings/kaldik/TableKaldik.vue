<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Kegiatan</th>
            <th scope="col">Tanggal Dimulai</th>
            <th scope="col">Tanggal Berakhir</th>
            <th scope="col">Warna Label</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in kaldik" :key="index">
            <td class="text-capitalize">{{ data.Nama }}</td>
            <td>{{ formatDate(data.Mulai) }}</td>
            <td>{{ formatDate(data.Berakhir) }}</td>
            <td :style="{ color: data.Warna }">{{ data.Warna }}</td>
            <td class="text-end">
              <a href="javascript:;" @click="editItem(index)">
                <i class="bx bx-pencil text-primary"></i>
              </a>
              <a href="javascript:;" @click="deleteItem(data.SK)">
                <i class="bx bx-trash text-danger"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalKaldik :updateData="updateData" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
import formatSet from "~/mixins/formatSet.js";

export default {
  data() {
    return {
      updateData: "",
    };
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kaldik/changeUnit`, program);
  },
  computed: {
    ...mapState("kaldik", ["kaldik"]),
  },
  mixins: [formatSet],

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
        await this.$axios.$delete(
          `delete-database?subject=kaldik&id=${key.split("#")[0]}&code=${
            key.split("#")[1]
          }`
        );
        this.$store.commit("kaldik/deleteKaldik", key);
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async editItem(index) {
      $("#updateKaldik").modal("show");
      this.updateData = this.kaldik[index];
    },
  },
};
</script>

<style scoped></style>
