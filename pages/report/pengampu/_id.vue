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
          <h1 class="mb-3 mb-md-0">Report Absensi Pengampu</h1>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">From</span>
            <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1"
              v-model="start">
            <span class="input-group-text" id="basic-addon1">To</span>
            <input type="date" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="end">
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
    store.dispatch('report/pengampu/getDetails', id)
    return { id }
  },
  computed: {
    ...mapState('report/pengampu', ['santri', 'details']),
    ...mapGetters('report/pengampu', ['getStart', 'getEnd']),
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        const obj = { key: 'start', value }
        this.$store.commit('report/pengampu/setState', obj)
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        const obj = { key: 'end', value }
        this.$store.commit('report/pengampu/setState', obj)
      }
    }
  },
  watch: {
    start() {
      this.getDetails(this.id)
    },
    end() {
      this.getDetails(this.id)
    }
  },
  methods: {
    ...mapActions('report/pengampu', ['getDetails']),
    backPage() {
      this.$router.push('/report/pengampu')
    }
  },
}
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
