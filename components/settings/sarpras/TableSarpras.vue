<template>
  <div>
    <div>
      <div class="row mb-3">
        <div class="col-12 col-md-8 d-flex align-items-center mb-3 mb-md-0">
          <h2 class="mb-0" style="font-size: 14px;">Database Pegawai</h2>
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-end">
          <div class="input-group">
            <i style="font-size: 12px;" class="material-icons input-group-text"> search </i>
            <input style="font-size: 12px;" type="text" class="form-control" placeholder="Search" aria-label="Username"
              aria-describedby="basic-addon1" v-model="search">
          </div>
        </div>
      </div>
      <!-- Modal -->
       <ModalSarpras />
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIP</th>
              <th scope="col">Username</th>
              <th scope="col">Lulusan</th>
              <th scope="col">Jabatan</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in filteredDatas" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nip }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Username }}
              </td>
              <td class="text-capitalize align-middle">{{ data.Lulusan }}</td>
              <td class="text-capitalize align-middle">
                {{ data.Jabatan[unit] }}
              </td>
              <td class="text-end align-middle">
                <div class="action">
                  <a v-if="data.Jabatan[unit] !== 'personalia'" href="javascript:;" @click="editJabatan(data.SK)">
                    <button class="btn btn-sm btn-warning">
                      <i class="bx bx-pencil text-dark"></i>
                    </button>
                  </a>
                  <!-- <a href="javascript:;" @click="updateItem(data.Username, data.SK, data.Status)"><button
                      class="btn btn-sm" :class="data.Status === 'active'
                        ? 'btn-primary'
                        : 'btn-secondary'
                        ">
                      <i class="material-icons"> power_settings_new </i>
                    </button></a> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('sarpras', ['getSearch', 'filteredDatas']),
    ...mapState("index", ["unit"]),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('sarpras/setState', { key: 'search', value })
      }
    },
  },
  methods: {
    ...mapMutations('sarpras', ['editJabatan'])
  },
}
</script>

<style scoped>

</style>
