<template>
  <div>
    <div>
      <div class="row mb-3">
        <div class="col-12 col-md-6 mb-3 mb-md-0 d-flex align-items-center">
          <h2>List Izin Asrama</h2>
        </div>
        <!-- <div class="col-12 col-md-6 d-flex flex-column flex-md-row gap-2 gap-md-0 justify-content-end">
          <a href="javascript:;" class="btn btn-sm btn-primary me-2" v-if="permissions.includes('izin')">Izin</a>
          <div class="input-group" v-if="santri.length > 0">
            <label for="search" class="input-group-text">
              <i class="material-icons">search</i>
            </label>
            <input id="search" type="text" class="form-control" v-model="search" placeholder="Cari Nama Santri">
          </div>
          <select v-if="select.length > 0" class="form-select order-1 order-md-2" name="Kelas" @change="getAbsensi"
            v-model="selectKelas">
            <option value="" selected>-- Kelas --</option>
            <option v-for="(data, index) in select" :key="index" :value="data">
              {{ data }}
            </option>
          </select>
        </div> -->
      </div>
      <!-- Modal -->
      <ModalAbsensiAsrama />
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Status</th>
              <th scope="col">Catatan</th>
              <th scope="col">Waktu</th>
              <th scope="col">PIC</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in filteredDatas" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
              </td>
              <td class="text-capitalize align-middle">
                <i class="material-icons" :class="data.Status === 'sekolah'
                  ? 'text-success'
                  : data.Status === 'rumah'
                    ? 'text-secondary'
                    : data.Status === 'sakit'
                      ? 'text-warning'
                      : data.Status === 'izin'
                        ? 'text-primary'
                        : 'text-danger'
                  ">{{
                    data.Status === "sekolah"
                      ? " school "
                      : data.Status === "rumah"
                        ? " villa "
                        : data.Status === "sakit"
                          ? " medication "
                          : data.Status === "izin"
                            ? "hourglass_top"
                            : " person_off "
                  }}</i>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Note === '' ? '-' : data.Note }}
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Date }}
              </td>
              <td class="text-capitalize align-middle">
                {{ data.PIC === '' ? '-' : data.PIC }}
              </td>
              <td class="text-end">
                <button @click="updateItem(data.SK)" style="font-size: 12px;"
                  class="btn btn-sm btn-warning">edit</button>
                <button @click="deleteItem(data.SK)" style="font-size: 12px;" class="btn btn-sm btn-danger">delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn-group text-center float-end mt-3 mb-5" role="group">
      <button @click="page = 1" :disabled="page === 1" type="button" class="btn btn-primary btn-sm">
        &laquo;
      </button>
      <button @click="page--" :disabled="page === 1" type="button" class="btn btn-primary  btn-sm">
        Prev
      </button>
      <button class="btn btn-dark  btn-sm disabled">{{ `${page ? page : 1}` }}</button>
      <button @click="page++" :disabled="page >= Math.ceil(santriIzin?.length / perPage)"
        class="btn btn-primary  btn-sm">
        Next
      </button>
      <button @click="page = Math.ceil(santriIzin.length / perPage)"
        :disabled="page >= Math.ceil(santriIzin.length / perPage)" type="button" class="btn btn-primary  btn-sm">
        &raquo;
      </button>
    </div>
    <ModalListIzinAsrama />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      search: '',
      page: 1,
      perPage: 10,
      table: []
    }
  },
  computed: {
    ...mapState("asramaAbsensi", ['santriIzin']),
    ...mapGetters('asramaAbsensi', []),
    filteredDatas() {
      const table = this.santriIzin.filter((data) => {
        return data.Nama.toLowerCase().includes(this.search.toLowerCase());
      });
      let start = (this.page - 1) * this.perPage;
      let end = start + this.perPage;
      return table.slice(start, end);
    },
  },

  methods: {
    ...mapActions('asramaAbsensi', ['deleteItem']),
    ...mapMutations('asramaAbsensi', ['updateItem'])
  },
};
</script>

<style scoped>
tr th,
tr td {
  white-space: nowrap;
}

.input-group label,
.input-group input,
.input-group i {
  font-size: 12px !important;
}
</style>
