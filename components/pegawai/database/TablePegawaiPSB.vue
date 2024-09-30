<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalPegawaiPSB />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th class="text-uppercase" :class="key === 'Action' ? 'text-end' : ''" v-for="(value, key) in th" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <!-- <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Program</th>
              <th scope="col">Role</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead> -->
          <tbody>
            <tr v-for="(data, index) in filteredDatas" :key="index">
              <!-- <td>
                <input type="checkbox" />
              </td> -->
              <td class="text-capitalize">{{ data.Nama }}</td>
              <td scope="row" class="text-uppercase container-permissions">
                <div style="display: inline" v-for="(value, i) in data?.PSB?.Program?.split(',')" :key="i">
                  <div class="btn-group btn-group-sm px-1 py-1 list-permissions">
                    <div class="btn btn-dark">
                      <span>{{ value }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td v-for="(value, key) in repeatColumn" :key="key">
                <select class="form-select" style="font-size: 12px; width: max-content;">
                  <option value="">role</option>
                  <option value="admin">admin</option>
                  <option value="penguji">penguji</option>
                </select>
              </td>
              <!-- <td scope="col">Admin</td> -->
              <td class="text-end">
                <div class="action">
                  <!-- <a href="javascript:;" @click="resetPassword(data.SK)">
                    <button class="btn btn-sm btn-danger">
                      <i class='bx bx-reset'></i>
                    </button>
                  </a> -->
                  <a href="javascript:;" @click="editItem(data.SK)">
                    <button class="btn btn-sm btn-warning">
                      <i class="bx bx-pencil"></i>
                    </button>
                  </a>
                  <!-- <a href="javascript:;" @click="updateItem(data.SK)"><button class="btn btn-sm" :class="data.Status === 'active'
                    ? 'btn-primary'
                    : 'btn-secondary'
                    ">
                      <i class="material-icons"> power_settings_new </i>
                    </button></a> -->
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
      <button @click="page++" :disabled="page >= Math.ceil(pegawai.length / perPage)" class="btn btn-primary  btn-sm">
        Next
      </button>
      <button @click="page = Math.ceil(pegawai.length / perPage)"
        :disabled="page >= Math.ceil(pegawai.length / perPage)" type="button" class="btn btn-primary  btn-sm">
        &raquo;
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState('psb', ["pegawai", 'perPage', 'th', 'repeatColumn']),
    ...mapGetters('psb', ['filteredDatas', 'getPage']),
    page: {
      get() {
        return this.getPage
      },
      set(value) {
        this.$store.commit('psb/setState', { key: 'page', value })
      }
    }
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
