<template>
  <div>
    <div class="row mt-3 animate__animated animate__fadeInUp">
      <div class="col-12 col-md-6 d-flex align-items-center">
        <h3>Setup Ekskull</h3>
      </div>
      <div class="col-12 col-md-6">
        <!-- Button trigger modal -->
        <div class="button-santri float-end">
          <button type="button" class="btn btn-sm btn-primary button-santri" data-bs-toggle="modal"
            data-bs-target="#inputEkskull">
            Tambah Eskul
          </button>
        </div>
      </div>
    </div>

    <!-- table eskul -->
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Urutan</th>
            <th scope="col">Nama Ekskull</th>
            <th scope="col">Program</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in ekskull" :key="i">
            <td scope="row">{{ data.Sort }}</td>
            <td scope="row" class="text-capitalize">{{ data.Nama }}</td>
            <td scope="row" class="text-uppercase">{{ data.Program }}</td>
            <td class="text-end">
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
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("kelas", ["ekskull"]),
  },
  methods: {
    ...mapActions('kelas', ['deleteItem'])
  },
};
</script>

<style scoped>
@import url(~/assets/css/setting/setting.css);
</style>
