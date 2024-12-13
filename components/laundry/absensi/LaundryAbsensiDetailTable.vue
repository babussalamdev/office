<template>
  <div>
    <div class="mb-2 d-flex align-items-center gap-3">
      <nuxt-link to="/laundry/absensi">
        <i class='bx bx-left-arrow-alt p-2 text-white rounded-circle bg-primary'></i>
      </nuxt-link>
    </div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-3 mb-md-0 d-flex align-items-center">
        <h2>Absensi - {{ name }}</h2>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end align-items-center">
        <div class="input-group">
          <span style="font-size: 12px;" class="input-group-text">Start</span>
          <input style="font-size: 12px;" type="date" class="form-control" v-model="start" :max="end">
          <span style="font-size: 12px;" class="input-group-text">End</span>
          <input style="font-size: 12px;" type="date" class="form-control" v-model="end" :min="start">
        </div>
      </div>
    </div>
    <div class="table-responsive white-space-nowrap animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="nowrap">Tanggal</th>
            <th scope="col" class="nowrap">Status</th>
            <th scope="col" class="nowrap">Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dataItem, index) in absensiDetail" :key="index">
            <td class="text-capitalize align-middle nowrap">{{ dataItem.CreatedAt }}</td>
            <td class="text-capitalize align-middle nowrap">{{ dataItem.Status }}</td>
            <td class="text-capitalize align-middle nowrap">{{ dataItem.Note }}</td>
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
      ...mapState('laundry/absensi', ['pegawai', 'absensiDetail']),
      ...mapGetters('laundry/absensi', ['getStart', 'getEnd']),
      name() {
        const id = this.$route.params.id
        const findData = this.pegawai.find((x) => x.SK === id)
        return findData.Nama
      },
      start: {
        get() {
          return this.getStart
        },
        set(value) {
          this.$store.commit('laundry/absensi/setState', { key: 'start', value })
        }
      },
      end: {
        get() {
          return this.getEnd
        },
        set(value) {
          this.$store.commit('laundry/absensi/setState', { key: 'end', value })
        }
      }
    },
    watch: {
      start() {
        const id = this.$route.params.id
        this.$store.dispatch('laundry/absensi/getByDate', id)
      },
      end() {
        const id = this.$route.params.id
        this.$store.dispatch('laundry/absensi/getByDate', id)
      }
    },
  }
</script>

<style scoped>

</style>
