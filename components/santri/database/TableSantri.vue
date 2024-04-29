<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalSantri
          :updateData="updateData"
          :years="years"
          :deleteData="deleteData"
        />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <!-- <th scope="col">
                <input type="checkbox" />
              </th> -->
              <th scope="col">Nama</th>
              <th scope="col">NISN</th>
              <th scope="col">Orang Tua</th>
              <th scope="col">Alamat</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(san, index) in santri" :key="index">
              <!-- <td>
                <input type="checkbox" />
              </td> -->
              <td class="text-capitalize">{{ san.Nama }}</td>
              <td>{{ san.Nisn }}</td>
              <td class="text-capitalize">{{ san.Orangtua }}</td>
              <td class="text-capitalize">{{ san.Alamat }}</td>
              <td class="text-end">
                <a href="#" @click="editItem(index)" class="me-1">
                  <i class="bx bx-pencil text-primary"></i>
                </a>
                <!-- <button @click="deleteItem(index)">
                  
                </button> -->
                <a href="javascript:;" @click="deleteItem(index)">
                  <i
                    class="material-icons power text-white"
                    :class="
                      santri[index].Status === 'active'
                        ? 'bg-primary'
                        : 'bg-secondary'
                    "
                  >
                    power_settings_new
                  </i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  props: ["years"],
  data() {
    return {
      updateData: "",
      deleteData: "",
    };
  },
  computed: {
    ...mapState("santri/database", ["santri"]),
  },
  methods: {
    async editItem(index) {
      $("#updateDataSantri").modal("show");
      this.updateData = this.santri[index];
    },

    async deleteItem(index) {
      if (this.santri[index].Status !== "active") {
        Swal.fire({
          icon: "warning",
          text: "Data tidak bisa diubah",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        $("#deleteDataSantri").modal("show");
        this.deleteData = this.santri[index];
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
