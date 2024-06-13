<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Sort</th>
            <th scope="col">Nama</th>
            <th scope="col">Permission</th>
            <th scope="col">Settings</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in struktur" :key="i">
            <td scope="row" class="align-middle">{{ data.Sort }}</td>
            <td scope="row" class="text-capitalize align-middle">
              {{ data.Nama }}
            </td>
            <td scope="row" class="text-uppercase container-permissions">
              <div v-for="(value, i) in data.Permissions.split(',')" :key="i" style="display: inline">
                <div class="btn-group btn-group-sm px-1 py-1 list-permissions">
                  <div class="btn btn-dark">
                    <span>{{ value }}</span>
                  </div>
                </div>
              </div>
            </td>
            <td class="text-capitalize align-middle">
              <div class="form-switch">
                <input @change="openSettings(data.SK, data.Status)" class="form-check-input" type="checkbox"
                  role="switch" id="flexSwitchCheckChecked" />
              </div>
            </td>
            <td class="text-end align-middle">
              <a href="javascript:;" @click="editItem(data.SK)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil"></i>
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
    <ModalStruktur />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("struktur", ["struktur"]),
    ...mapState("index", ["unit"]),
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
