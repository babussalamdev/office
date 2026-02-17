<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Sort</th>
            <th scope="col">Nama Halaqoh</th>
            <th scope="col">Penilaian</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in halaqahIdhofi" :key="i">
            <td scope="row">{{ data.Sort }}</td>
            <td scope="row" class="text-capitalize">{{ data.Nama }}</td>
            <td scope="row" class="text-capitalize">{{ data.Kelas ? data.Kelas : "-" }}</td>
            <td class="text-end">
              <a href="javascript:;" @click="editHalaqahIdhofi(data.SK)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil text-white"></i>
                </button>
              </a>
              <a href="javascript:;" @click="deleteHalaqahIdhofi(data.SK)">
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
  import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    computed: {
      ...mapState("kelompok", ["halaqahIdhofi"]),
    },
    methods: {
      ...mapActions("kelompok", ["deleteHalaqahIdhofi"]),
      ...mapMutations("kelompok", ["editHalaqahIdhofi"]),
    },
  };
</script>

<style scoped></style>
