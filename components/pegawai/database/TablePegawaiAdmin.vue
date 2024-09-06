<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalPegawaiAdmin />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col">Nama</th>
              <th scope="col">Lulusan</th>
              <th scope="col">NIP</th>
              <th scope="col">Personalia</th>
              <th scope="col">Program</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in filteredDatas" :key="index">
              <td>
                <input type="checkbox" />
              </td>
              <td class="text-capitalize">{{ data.Nama }}</td>
              <td>
                {{ data.Lulusan }}
              </td>
              <td class="text-capitalize">{{ data.Nip }}</td>
              <td class="text-capitalize align-middle">
                <span class="personalia" :class="data.Personalia === 'on' ? 'bg-primary' : 'bg-secondary'
                  ">
                  {{ data.Personalia }}
                </span>
              </td>
              <td scope="row" class="text-uppercase container-permissions">
                <div style="display: inline" v-for="(value, i) in data?.Program?.split(',')" :key="i">
                  <div class="btn-group btn-group-sm px-1 py-1 list-permissions">
                    <div class="btn btn-dark">
                      <span>{{ value }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <div class="action">
                  <a href="javascript:;" @click="resetPassword(data.SK)">
                    <button class="btn btn-sm btn-danger">
                      <i class='bx bx-reset'></i>
                    </button>
                  </a>
                  <a href="javascript:;" @click="editItem(data.SK)">
                    <button class="btn btn-sm btn-warning">
                      <i class="bx bx-pencil"></i>
                    </button>
                  </a>
                  <a href="javascript:;" @click="updateItem(data.SK)"><button class="btn btn-sm" :class="data.Status === 'active'
                    ? 'btn-primary'
                    : 'btn-secondary'
                    ">
                      <i class="material-icons"> power_settings_new </i>
                    </button></a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      page: 1,
      perPage: 10,
      table: "",
      search: ''
    }
  },
  computed: {
    ...mapState('pegawai/database', ["pegawai"]),
    filteredDatas() {
      this.table = this.pegawai.filter((data) => {
        return data.Nama.toLowerCase().includes(this.search.toLowerCase());
      });
      let start = (this.page - 1) * this.perPage;
      let end = start + this.perPage;
      return this.table.slice(start, end);
    },
  },
  methods: {
    ...mapActions('pegawai/database', ['updateItem', 'resetPassword']),
    ...mapMutations('pegawai/database', ['editItem']),
    statusPersonalia(username, sk, status) {
      const condition = status === "off" ? "on" : "off";
      const data = {
        key: sk,
        user: username,
        condition: condition,
      };
      this.$store.dispatch("pegawai/database/setStatusPersonalia", data);
    },
    deleteUpdateData() {
      this.updateData = "";
    },
  },
};
</script>

<style></style>
