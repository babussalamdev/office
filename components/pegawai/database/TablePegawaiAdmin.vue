<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalPegawai
          :updateData="updateData"
          @deleteUpdateData="deleteUpdateData"
        />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col">Nama</th>
              <th scope="col">Lulusan</th>
              <th scope="col">NIP</th>
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
              <td class="text-capitalize">
                {{ data.Lulusan }}
              </td>
              <td class="text-capitalize">{{ data.Nip }}</td>
              <td scope="row" class="text-uppercase container-permissions">
                <div
                  style="display: inline"
                  v-for="(value, i) in data.Program.split(',')"
                  :key="i"
                >
                  <div
                    class="btn-group btn-group-sm px-1 py-1 list-permissions"
                  >
                    <div class="btn btn-secondary disabled">
                      <span>{{ value }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <div class="action">
                  <a href="javascript:;" @click="editItem(index)">
                    <i class="bx bx-pencil text-success"></i>
                  </a>
                  <a
                    href="javascript:;"
                    @click="updateItem(data.Username, data.SK, data.Status)"
                    ><button
                      class="btn btn-sm ms-2"
                      :class="
                        data.Status === 'active'
                          ? 'btn-primary'
                          : 'btn-secondary'
                      "
                    >
                      <i class="material-icons"> power_settings_new </i>
                    </button></a
                  >
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      updateData: "",
    };
  },
  computed: {
    ...mapState("pegawai/database", ["pegawai"]),
  },
  methods: {
    async editItem(index) {
      $("#updateDataPegawaiAdmin").modal("show");
      this.updateData = this.pegawai[index];
    },
    async updateItem(user, key, status) {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: `Subject akan di ${
          status === "active" ? "Non-Aktif" : "Aktif"
        }kan`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Ya, ${
          status === "active" ? "Non-Aktifkan" : "Aktifkan"
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
            text: `Data Berhasil di ${
              status === "active" ? "Non-Aktif" : "Aktif"
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
