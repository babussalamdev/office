<template>
  <section id="rekap">
    <div class="rekap">
      <div class="row mb-3">
        <div class="col-12 col-md-9 d-flex align-items-center">
          <i class="bi bi-arrow-left bg-primary p-2 rounded-circle text-white cursor-pointer" @click="backPage()"></i>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 col-md-6 mb-2 mb-md-0 d-flex align-items-center">
          <h1 class="mb-3 mb-md-0">Report Absensi Tahfidz</h1>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">From</span>
            <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
              v-model="startdetail">
            <span class="input-group-text" id="basic-addon1">To</span>
            <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="enddetail">
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">CreatedAt</th>
            <th scope="col" class="text-start">Status</th>
            <th scope="col" class="text-start">Session</th>
            <th scope="col" class="text-start">Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in details" :key="index">
            <td scope="col">{{ data.CreatedAt }}</td>
            <td scope="col">{{ data.Status }}</td>
            <td scope="col">{{ data.Session }}</td>
            <td scope="col">{{ data.Note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  async asyncData({ store, params }) {
    const id = params.id
    store.dispatch('report/tahfidz/absensi/getPageDetails', id)
    return { id }
  },
  computed: {
    ...mapState('report/tahfidz/absensi', ['santri', 'details']),
    ...mapGetters('report/tahfidz/absensi', ['getStartDetail', 'getEndDetail']),
    startdetail: {
      get() {
        return this.getStartDetail
      },
      set(value) {
        const obj = { key: 'startdetail', value }
        this.$store.commit('report/tahfidz/absensi/setState', obj)
      }
    },
    enddetail: {
      get() {
        return this.getEndDetail
      },
      set(value) {
        const obj = { key: 'enddetail', value }
        this.$store.commit('report/tahfidz/absensi/setState', obj)
      }
    }
  },
  watch: {
    startdetail() {
      this.getDetails(this.id)
    },
    enddetail() {
      this.getDetails(this.id)
    }
  },
  methods: {
    ...mapActions('report/tahfidz/absensi', ['getDetails']),
    backPage() {
      this.$router.push('/report/tahfidz/absensi')
    }
  },
}
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
