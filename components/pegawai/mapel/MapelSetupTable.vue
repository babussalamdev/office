<template>
  <div>
    <div>
      <div class="row mb-3">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h2 class="text-capitalize mb-3">setup mapel</h2>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end">
          <div class="input-group" style="font-size: 12px;" v-if="mapel.length > 0">
            <span class="input-group-text material-icons" style="font-size: 12px;"> search </span>
            <input type="text" class="form-control" v-model="search" style="font-size: 12px;" placeholder="search by pengajar">
          </div>
          <select name="Mapel" id="mapel" v-model="listKelas" @change="kelasLoad" class="form-select select" required>
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in kelas" :key="index" :value="data">
              {{ data.Nama }}
            </option>
          </select>
        </div>
      </div>
      <MapelSetupModal />
      <div class="table-responsive">
        <!-- Modal -->
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Mapel</th>
              <th scope="col">Hari</th>
              <th scope="col">Pengajar</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in filteredDatas" :key="index">
              <td class="text-capitalize align-middle">
                {{ data.Nama }}
              </td>
              <td scope="row" class="text-capitalize">
                <div v-for="(value, i) in data.Hari.split(', ')" :key="i" style="display: inline">
                  <div class="btn-group btn-group-sm px-1 py-1 list-permissions">
                    <div class="btn btn-dark disabled">
                      <span style="font-size: 12px">{{ value }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-capitalize align-middle">
                <h1>{{ data.GSIPK1 }}</h1>
              </td>
              <td class="text-end align-middle">
                <button class="btn btn-sm btn-warning" @click="editItem(data.SK)">
                  <i class="bx bx-pencil text-dark"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-group text-center float-end mt-3 mb-5" role="group">
      <button @click="page = 1" :disabled="page === 1" type="button" class="btn btn-primary btn-sm">
        &laquo;
      </button>
      <button @click="page--" :disabled="page === 1" type="button" class="btn btn-primary  btn-sm">
        Prev
      </button>
      <button class="btn btn-dark  btn-sm disabled">{{ `${page}` }}</button>
      <button @click="page++" :disabled="page >= Math.ceil(mapel.length / perPage)" class="btn btn-primary  btn-sm">
        Next
      </button>
      <button @click="page = Math.ceil(mapel.length / perPage)"
        :disabled="page >= Math.ceil(mapel.length / perPage)" type="button" class="btn btn-primary  btn-sm">
        &raquo;
      </button>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      unit: "",
      page: 1,
      perPage: 10,
      table: "",
      search: '',
      listKelas: "",
    };
  },
  // mounted() {
  //   this.unit = localStorage.getItem("program");
  // },
  computed: {
    ...mapState("pegawai/mapel", ["mapel", 'kelas']),
    filteredDatas() {
      // Jika ada filter pencarian
      if (this.search) {
        this.table = this.mapel?.filter((data) => {
          // Periksa apakah GSIPK1 ada dan cocok dengan pencarian
          return data.GSIPK1 ? data.GSIPK1.toLowerCase().includes(this.search.toLowerCase()) : false;
        });
      } else {
        // Jika tidak ada pencarian, tampilkan semua data
        this.table = this.mapel;
      }

      // Pagination
      let start = (this.page - 1) * this.perPage;
      let end = start + this.perPage;

      // Mengembalikan data yang dipotong sesuai pagination
      return this.table.slice(start, end);
    }

  },
  methods: {
    ...mapMutations('pegawai/mapel', ['editItem']),
    kelasLoad() {
      const program = localStorage.getItem("program");
      const data = {
        program: program,
        kelas: this.listKelas.Nama,
      };
      this.$store.dispatch(`pegawai/mapel/getKelas`, data);
    },
  },
};
</script>
