<template>
  <div class="table-responsive animate__animated animate__fadeInUp">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">sort</th>
          <th scope="col">Nama Asrama</th>
          <th scope="col">Program</th>
          <th scope="col" class="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, i) in asrama" :key="i">
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
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("kelompok", ["asrama"]),
  },
  methods: {
    ...mapActions('kelompok', ['deleteItem']),

  },
};
</script>

<style scoped></style>
