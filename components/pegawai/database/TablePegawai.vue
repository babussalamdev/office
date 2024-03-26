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
              <th scope="col">Username</th>
              <th scope="col">Lulusan</th>
              <th scope="col">Jabatan</th>
              <th scope="col">Pengajar</th>
              <th scope="col">Pengampu</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in pegawai" :key="index">
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
                  <input
                    v-model="blokPengajar"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                  />
                </div>
              </td>
              <td class="text-capitalize align-middle">
                <div class="form-switch">
                  <input
                    v-model="blokPengampu"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                  />
                </div>
              </td>
              <td class="text-end align-middle">
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      updateData: "",
    };
  },
  computed: {
    ...mapState("pegawai/database", ["pegawai"]),
    ...mapState("index", ["unit"]),
    ...mapGetters(["getStatusPengajar", "getStatusPengampu"]),
    blokPengajar: {
      get() {
        const condition = this.getStatusPengajar === "on" ? true : false;
        return condition;
      },
      set(value) {
        const condition = value ? "active" : "block";
        this.$store.dispatch("setStatusPengajar", condition);
      },
    },
    blokPengampu: {
      get() {
        const condition = this.getStatusPengampu === "on" ? true : false;
        return condition;
      },
      set(value) {
        const condition = value ? "active" : "block";
        this.$store.dispatch("setStatusPengampu", condition);
      },
    },
  },
  methods: {
    async editItem(index) {
      $("#updateDataPegawai").modal("show");
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
