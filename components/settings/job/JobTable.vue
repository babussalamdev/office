<template>
  <div>
    <div class="row mb-3 animate__animated animate__fadeInUp">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h3 style="font-size: 14px;">Settings Job</h3>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end align-items-center gap-1">
          <!-- <div class="d-flex align-items-center">
            <select v-model="selectedGedung" class="form-select" style="font-size: 12px;">
              <option value="" disabled>gedung</option>
              <option v-for="(data, index) in listGedung" :key="index" :value="data.SK">{{ data.SK }}</option>
            </select>
          </div> -->
          <!-- Button trigger modal -->
          <div class="button-santri float-end">
            <button style="font-size: 12px;" type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#jobModal">
              Tambah Data
            </button>
          </div>
        </div>
      </div>
    <JobModalUpdate />
    <JobModal />
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Job</th>
            <!-- <th scope="col">Ruangan</th>
            <th scope="col">Job</th> -->
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in job" :key="i">
            <td scope="row" class="text-capitalize align-middle">{{ data.SK }}</td>
            <!-- <td scope="row" class="text-capitalize align-middle">
              {{ data.Ruangan }}
            </td> -->
            <!-- <td scope="row" class="text-capitalize align-middle">
              <div v-if="data.Name && data.Name.trim() !== ''">
                <div v-for="(value, index) in data.Name.split(',')" :key="index" style="display: inline">
                  <div class="btn-group btn-group-sm px-1">
                    <div class="btn btn-dark">
                      <span style="font-size: 12px;">{{ value }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </td> -->
            <td class="text-end align-middle">
              <!-- <a href="javascript:;">
                <button class="btn btn-sm btn-warning" @click="updateItem(data.PK)">
                  <i class='bx bx-pencil'></i>
                </button>
              </a> -->
              <a>
                <button class="btn btn-sm btn-danger" @click="deleteItem(data.SK)">
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('job', ['listGedung', 'btn', 'job']),
    ...mapGetters('job', ['getSelectedGedung']),
    selectedGedung: {
      get() {
        return this.getSelectedGedung
      },
      set(value) {
        this.$store.commit('job/setState', { key: 'selectedGedung', value })
      }
    },
  },
  methods: {
    ...mapActions('job', ['deleteItem']),
    ...mapMutations('job', ['updateItem']),
    ubahData(sk, status) {
      this.updateItem({ sk, status })
    },
  },
  watch: {
    selectedGedung(value) {
      if (value) {
        this.$store.dispatch('job/getJob')
      }
    }
  },
}
</script>

<style scoped>

</style>
