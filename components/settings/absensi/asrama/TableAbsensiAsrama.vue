<template>
  <div>
    <div>
      <div class="row mb-3">
        <div class="col-12 col-md-6 mb-3 mb-md-0 d-flex align-items-center">
          <h2>Absensi Asrama</h2>
        </div>
        <div class="col-12 col-md-6 d-flex flex-column flex-md-row gap-2 gap-md-0 justify-content-end">
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
        </div>
      </div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalAbsensiAsrama />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Status</th>
              <th scope="col">Catatan</th>
              <th scope="col">Waktu</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in filteredDatas" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nis }}</p>
              </td>
              <td class="text-capitalize align-middle">
                <i class="material-icons" :class="data.Logs?.asrama?.status === 'sekolah'
                  ? 'text-success'
                  : data.Logs?.asrama?.status === 'rumah'
                    ? 'text-secondary'
                    : data.Logs?.asrama?.status === 'sakit'
                      ? 'text-warning'
                      : data.Logs?.asrama?.status === 'izin'
                        ? 'text-primary'
                        : 'text-danger'
                  ">{{
                    data.Logs?.asrama?.status === "sekolah"
                      ? " school "
                      : data.Logs?.asrama?.status === "rumah"
                        ? " villa "
                        : data.Logs?.asrama?.status === "sakit"
                          ? " medication "
                          : data.Logs?.asrama?.status === "izin"
                            ? "hourglass_top"
                            : " person_off "
                  }}</i>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Logs?.asrama?.note === '' ? '-' : data.Logs?.asrama?.note }}
              </td>
              <td class="text-capitalize align-middle">
                <span v-if="data.Logs?.asrama?.time === ''">-</span>
                <h1>{{ data.Logs?.asrama?.time?.split(" ")[0] }}</h1>
                <p class="mt-1 text-secondary">
                  {{ data.Logs?.asrama?.time?.split(" ")[1] }}
                </p>
              </td>
              <td class="text-end align-middle">
                <a href="javascript:;" class="bg-success"
                  v-if="permissions.includes('sekolah') && data.Logs?.asrama?.status !== 'sekolah'"
                  @click="absen(data.SK, 'sekolah')">
                  <i class="material-icons"> school </i> Sekolah</a>
                <a href="javascript:;" class="bg-danger"
                  v-if="permissions.includes('absen') && data.Logs?.asrama?.status !== 'absen'"
                  @click="absen(data.SK, 'absen')">
                  <i class="material-icons"> person_off </i>
                  Absen</a>
                <a href="javascript:;" class="bg-warning"
                  v-if="permissions.includes('sakit') && data.Logs?.asrama?.status !== 'sakit'"
                  @click="absen(data.SK, 'sakit')">
                  <i class="material-icons"> medication </i> Sakit</a>
                <a href="javascript:;" class="bg-secondary"
                  v-if="permissions.includes('rumah') && data.Logs?.asrama?.status !== 'rumah'"
                  @click="absen(data.SK, 'rumah')">
                  <i class="material-icons"> villa </i> Pulang</a>
                  {{  }}
                <a href="javascript:;" class="bg-primary"
                  v-if="permissions.includes('izin') && data.Logs?.asrama?.status !== 'izin' && !data.Logs?.asrama?.antrian"
                  @click="absen(data.SK, 'izin')">
                  <i class="material-icons"> villa </i> Izin</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("asramaAbsensi", ["santri", "permissions", "select", 'table', 'perPage']),
    ...mapGetters('asramaAbsensi', ['getSelectKelas', 'filteredDatas', 'getPage', 'getSearch']),
    tanggalSekarang() {
      const today = new Date
      return today.toISOString().split('T')[0]
    },
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        const obj = { key: 'search', value }
        this.$store.commit('asramaAbsensi/setState', obj)
      }
    },
    page: {
      get() {
        return this.getPage
      },
      set(value) {
        const obj = { key: 'page', value }
        this.$store.commit('asramaAbsensi/setState', obj)
      }
    },
    selectKelas: {
      get() {
        return this.getSelectKelas
      },
      set(value) {
        const obj = { key: 'selectKelas', value }
        this.$store.commit('asramaAbsensi/setState', obj)
      }
    }
  },

  methods: {
    ...mapMutations('asramaAbsensi', ['setState']),
    absen(sk, type) {
      const index = this.santri.findIndex((x) => x.SK === sk)
      const data = {
        santri: this.santri[index],
        type: type,
      };
      const obj = { key: 'updateData', value: data }
      this.setState(obj)
      $("#modalAbsen").modal("show");
    },
    getAbsensi() {
      this.$store.dispatch("asramaAbsensi/getAbsensi");
    },
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
