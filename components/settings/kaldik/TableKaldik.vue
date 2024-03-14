<template>
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
            <a href="#">
              <i class="bx bx-pencil text-primary"></i>
            </a>
            <a href="#">
              <i class="bx bx-trash text-danger"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import formatSet from "~/mixins/formatSet.js";

export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kaldik/changeUnit`, program);
  },
  computed: {
    ...mapState("kaldik", ["kaldik"]),
  },
  mixins: [formatSet],
};
</script>

<style scoped></style>
