<template>
  <div>
    <!-- mapel input -->
    <div class="row mt-3 animate__animated animate__fadeInUp">
      <div class="col-12 col-md-6 d-flex align-items-center">
        <h3>Setup Absensi</h3>
      </div>
      <div class="col-12 col-md-6">
        <!-- Button trigger modal -->
        <div class="button-santri float-end">
          <button type="button" class="btn btn-sm btn-primary button-santri" data-bs-toggle="modal"
            data-bs-target="#inputDataStruktur">
            Tambah Data
          </button>
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Permission</th>
            <!-- <th scope="col">Database</th> -->
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in absensi" :key="i">
            <td scope="row" class="text-capitalize align-middle">
              {{ data.Struktur }}
            </td>
            <td scope="row" class="text-uppercase container-permissions">
              <div v-for="(value, i) in data.Permissions?.split(',')" :key="i" style="display: inline">
                <div class="btn-group btn-group-sm px-1 py-1 list-permissions">
                  <div class="btn btn-secondary disabled">
                    <span>{{ value }}</span>
                  </div>
                </div>
              </div>
            </td>
            <!-- <td scope="row" class="align-middle">
              {{ data.Database }}
            </td> -->
            <td class="text-end align-middle">
              <a href="javascript:;" @click="editItem(data.SK)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil text-dark"></i>
                </button>
              </a>
              <a href="javascript:;" @click="deleteItem(data.SK)">
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
    <ModalSetupAbsensi />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("setupabsensi", ["absensi", "struktur"]),
  },
  methods: {
    ...mapActions('setupabsensi', ['deleteItem']),
    ...mapMutations('setupabsensi', ['editItem']),
  },
};
</script>

<style scoped></style>
