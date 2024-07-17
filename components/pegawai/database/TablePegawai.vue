<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalPegawai @deleteUpdateData="deleteUpdateData" />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Username</th>
              <th scope="col">Lulusan</th>
              <th scope="col">Jabatan</th>
              <th scope="col">Pengajar</th>
              <th scope="col">Pengampu</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in filteredDatas" :key="index">
              <td class="align-middle">
                <input type="checkbox" />
              </td>
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nip }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Username }}
              </td>
              <td class="text-capitalize align-middle">{{ data.Lulusan }}</td>
              <td class="text-capitalize align-middle">
                {{ data.Jabatan[unit] }}
              </td>
              <td class="text-capitalize align-middle">
                <div class="form-switch">
                  <input :checked="data.Pengajar[unit] === 'on' ? true : false" @change="
                    statusPengajar(
                      data.Username,
                      data.SK,
                      data.Pengajar[unit]
                    )
                    " class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                </div>
              </td>
              <td class="text-capitalize align-middle">
                <div class="form-switch">
                  <input :checked="data.Pengampu[unit] === 'on' ? true : false" @change="
                    statusPengampu(
                      data.Username,
                      data.SK,
                      data.Pengampu[unit]
                    )
                    " class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                </div>
              </td>
              <td class="text-end align-middle">
                <div class="action">
                  <a href="javascript:;" @click="editJabatan(data.SK)">
                    <button class="btn btn-sm btn-warning">
                      <i class="bx bx-pencil text-dark"></i>
                    </button>
                  </a>
                  <a href="javascript:;" @click="updateItem(data.Username, data.SK, data.Status)"><button
                      class="btn btn-sm" :class="data.Status === 'active'
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
import { mapState, mapMutations } from "vuex";

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
    ...mapState("pegawai/database", ["pegawai"]),
    ...mapState("index", ["unit"]),
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
    ...mapMutations('pegawai/database', ['editJabatan']),
    statusPengajar(username, sk, status) {
      const condition = status === "off" ? "on" : "off";
      const data = {
        key: sk,
        user: username,
        unit: this.unit,
        condition: condition,
      };
      this.$store.dispatch("pegawai/database/setStatusPengajar", data);
    },
    statusPengampu(username, sk, status) {
      const condition = status === "off" ? "on" : "off";
      const data = {
        key: sk,
        user: username,
        unit: this.unit,
        condition: condition,
      };
      this.$store.dispatch("pegawai/database/setStatusPengampu", data);
    },
    async updateItem(user, key, status) {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: `Subject akan di ${status === "active" ? "Non-Aktif" : "Aktif"
          }kan`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Ya, ${status === "active" ? "Non-Aktifkan" : "Aktifkan"
          }`,
      });
      if (result.isConfirmed) {
        await this.$axios.$delete(
          `delete-pegawai?username=${user}&key=${key}&status=${status}`
        );
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: `Data Berhasil di ${status === "active" ? "Non-Aktif" : "Aktif"
              }kan`,
            showConfirmButton: false,
            timer: 1500,
          });
          const response = {
            key,
            Status: status === "active" ? "inactive" : "active",
          };
          this.$store.commit("pegawai/database/updateSubject", response);
        }
      }
    },
    deleteUpdateData() {
      this.updateData = "";
    },
  },
};
</script>

<style></style>
