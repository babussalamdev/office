<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Sort</th>
            <th scope="col">Semester</th>
            <th scope="col">Tahun</th>
            <th scope="col">Label</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in periode" :key="i">
            <td scope="row">{{ data.Sort }}</td>
            <td scope="row" class="text-capitalize">{{ data.Semester }}</td>
            <td scope="row" class="text-uppercase">{{ data.Tahun }}</td>
            <td scope="row" class="text-uppercase">{{ data.Label }}</td>
            <td scope="row">
              <span class="item" :class="data.Status === 'active' ? 'bg-success' : 'bg-danger'">{{ data.Status }}</span>
            </td>
            <td class="text-end">
              <a href="javascript:;" @click="updateItem(data.SK)">
                <button class="btn btn-sm" :class="data.Status === 'active' ? 'btn-primary' : 'btn-secondary'">
                  <i class='bx bx-power-off'></i>
                  <!-- {{ data.Status === "active" ? "off" : "on" }} -->
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn-group text-center float-end mt-3 mb-5  animate__animated animate__fadeInUp" role="group">
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
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      page: 1,
      perPage: 10,
      table: "",
      search: ''
    };
  },
  computed: {
    ...mapState("periode", ["periode"]),
    filteredDatas() {
      this.table = this.periode.filter((data) => {
        return data.Nama.toLowerCase().includes(this.search.toLowerCase());
      });
      let start = (this.page - 1) * this.perPage;
      let end = start + this.perPage;
      return this.table.slice(start, end);
    },
  },
  methods: {
    ...mapActions('periode', ['updateItem'])
  },
};
</script>

<style scoped></style>
