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
          <tr v-for="(data, index) in filteredDatas" :key="index">
            <td class="text-capitalize">{{ data.Nama }}</td>
            <td>{{ data.TanggalMulai.split(',')[0] }}</td>
            <td>{{ data.TanggalAkhir.split(',')[0] }}</td>
            <td :style="{ color: data.WarnaLabel }"><i class='bx bxs-circle me-1'></i>{{ data.WarnaLabel }}</td>
            <td class="text-end">
              <a href="javascript:;" @click="editItem(data.SK)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil"></i>
                </button>
              </a>
              <a href="javascript:;" @click="deleteItem(data.SK)">
                <button class="btn btn-sm btn-danger">
                  <i class="bx bx-trash text-white"></i>
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalKaldik />

    <!-- pagination -->
    <div class="btn-group text-center float-end mt-3 mb-5" role="group">
      <button @click="page = 1" :disabled="page === 1" type="button" class="btn btn-primary btn-sm">
        &laquo;
      </button>
      <button @click="page--" :disabled="page === 1" type="button" class="btn btn-primary  btn-sm">
        Prev
      </button>
      <button class="btn btn-dark  btn-sm disabled">{{ `${page}` }}</button>
      <button @click="page++" :disabled="page >= Math.ceil(table.length / perPage)" class="btn btn-primary  btn-sm">
        Next
      </button>
      <button @click="page = Math.ceil(table.length / perPage)" :disabled="page >= Math.ceil(table.length / perPage)"
        type="button" class="btn btn-primary  btn-sm">
        &raquo;
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Swal from "sweetalert2";
import formatSet from "~/mixins/formatSet.js";

export default {
  data() {
    return {
      updateData: "",
      page: 1,
      perPage: 10,
      table: "",
      search: ''
    };
  },
  computed: {
    ...mapState("kaldik", ["kaldik"]),
    filteredDatas() {
      this.table = this.kaldik.filter((data) => {
        return data.Nama.toLowerCase().includes(this.search.toLowerCase());
      });
      let start = (this.page - 1) * this.perPage;
      let end = start + this.perPage;
      return this.table.slice(start, end);
    },
  },
  mixins: [formatSet],

  methods: {
    ...mapActions('kaldik', ['deleteItem']),
    ...mapMutations('kaldik', ['editItem']),
  },
};
</script>

<style scoped></style>
