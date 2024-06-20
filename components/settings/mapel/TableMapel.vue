<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Sort</th>
            <th scope="col">Nama Mapel</th>
            <th scope="col">Jurusan</th>
            <th scope="col">Hari</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in mapel" :key="i">
            <td scope="row">{{ data.Sort }}</td>
            <td scope="row" class="text-capitalize">{{ data.Nama }}</td>
            <td scope="row" class="text-uppercase">{{ data.Jurusan }}</td>
            <td scope="row" class="text-capitalize container-hari">
              <div v-for="(value, i) in data.Hari" :key="i" style="display: inline">
                <div class="btn-group btn-group-sm px-1 py-1 list-hari">
                  <div class="btn btn-secondary disabled">
                    <span>{{ value }}</span>
                  </div>
                </div>
              </div>
            </td>
            <td class="text-end">
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
    <ModalMapel />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  // data() {
  //   return {
  //     updateData: "",
  //   };
  // },
  computed: {
    ...mapState("mapel", ["mapel", 'listKelas']),
  },
  methods: {
    ...mapActions('mapel', ['deleteItem']),
    ...mapMutations('mapel', ['editItem']),
  },
};
</script>

<style scoped></style>
