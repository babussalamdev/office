<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalPegawai />
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
            <tr v-for="(data, index) in pegawai" :key="index">
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
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState('pegawai/database', ["pegawai"]),
  },
  methods: {
    ...mapActions('pegawai/database', ['updateItem']),
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
