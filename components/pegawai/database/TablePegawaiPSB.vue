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
          <tbody>
            <tr v-for="(data, index) in pegawai" :key="index">
              <!-- <td>
                <input type="checkbox" />
              </td> -->
              <td class="text-capitalize">{{ data.Nama }}</td>
              <td scope="row" class="text-uppercase container-permissions">
                <div style="display: inline" v-for="(value, i) in data?.Psb?.program?.split(',')" :key="i">
                  <div class="btn-group btn-group-sm px-1 py-1 list-permissions">
                    <div class="btn btn-dark">
                      <span style="font-size: 12px;">{{ options[options.findIndex((x) => x.SK.includes(value.trim()))]?.Name }}</span>
                      <!-- <span>{{ value }}</span> -->
                    </div>
                  </div>
                </div>
              </td>
              <td v-for="(value, key) in options" :key="key">
                <select v-if="data?.Psb?.program?.split(',').includes(value.SK)" class="form-select" style="font-size: 12px; width: max-content;" :value="pegawai[index].Psb?.role[value.SK]" @change="setUpdateRole(data.SK, value.SK, $event.target.value)">
                  <option value="off">off</option>
                  <option value="admin">admin</option>
                  <option value="registrasi">registrasi</option>
                  <option value="penguji">penguji</option>
                </select>
                <span v-else>None</span>
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
      <!-- {{ pegawai }} -->
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState('psb', ["pegawai", 'perPage', 'th', 'repeatColumn', 'options']),
    ...mapGetters('psb', ['getPegawai', 'getPage', 'getSelectedRole']),
    page: {
      get() {
        return this.getPage
      },
      set(value) {
        this.$store.commit('psb/setState', { key: 'page', value })
      }
    },
    selectedRole: {
      get() {
        return this.getSelectedRole
      },
      set(value) {
        this.$store.commit('psb/setState', { key: 'selectedRole', value })
      }
    },
    pegawai() {
      return this.$store.state.psb.pegawai;
    },
  },
  methods: {
    ...mapActions('psb', ['updateItem', 'resetPassword', 'updateRole']),
    ...mapMutations('psb', ['editItem']),
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
    setUpdateRole(index, sk, role) {
      this.updateRole({ index, sk, role });
    }
  },
};
</script>

<style></style>
