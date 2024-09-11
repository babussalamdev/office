<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Sort</th>
            <th scope="col">Nama</th>
            <th scope="col">Permission</th>
            <!-- <th scope="col">Settings</th> -->
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in filteredDatas" :key="i">
            <td scope="row" class="align-middle">{{ data.Sort }}</td>
            <td scope="row" class="text-capitalize align-middle">
              {{ data.Nama }}
            </td>
            <td scope="row" class="text-uppercase container-permissions align-middle">
              <div v-if="data.Permissions && data.Permissions.trim() !== ''">
                <div v-for="(value, i) in data.Permissions.split(',')" :key="i" style="display: inline">
                  <div class="btn-group btn-group-sm px-1 py-1 list-permissions">
                    <div class="btn btn-dark">
                      <span>{{ value }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ps-1" v-else>
                <!-- Tampilan ketika tidak ada data -->
                <p style="font-size: 10px;" class="">No permissions available</p>
              </div>
            </td>
            <td class="text-end align-middle">
              <a href="javascript:;" @click="editItem(data.SK)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil"></i>
                </button>
              </a>
              <a v-if="data.Nama !== 'wali kelas' && data.Nama !== 'musyrif'" href="javascript:;" @click="deleteItem(data.SK)">
                <button class="btn btn-sm btn-danger">
                  <i class="bx bx-trash text-white"></i>
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- modal -->
    <ModalStruktur />
    <ModalStrukturUpdate />

    <!-- pagination -->
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
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions } from "vuex";

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
    ...mapState("struktur", ["struktur"]),
    ...mapState("index", ["unit"]),
    filteredDatas() {
      this.table = this.struktur.filter((data) => {
        return data.Nama.toLowerCase().includes(this.search.toLowerCase());
      });
      let start = (this.page - 1) * this.perPage;
      let end = start + this.perPage;
      return this.table.slice(start, end);
    },
  },
  methods: {
    ...mapActions('struktur', ['deleteItem']),
    ...mapMutations('struktur', ['editItem']),

    async openSettings(sk, status) {
      const condition = status === "active" ? "inactive" : "active";
      const program = localStorage.getItem("program");
      const data = {
        key: sk,
        unit: this.unit,
        condition: condition,
      };
      this.$store.dispatch("struktur/openSettings", data);
    },
  },
};
</script>

<style scoped></style>
