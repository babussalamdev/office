<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-9 d-flex align-items-center">
        <i class="bi bi-arrow-left bg-primary p-2 rounded-circle text-white cursor-pointer" @click="backPage"></i>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th class="ps-3">Nama Siswa</th>
            <th>Kelas</th>
            <th>Status</th>
            <th>Note</th>
            <th>Date / Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in highlight" :key="index">
            <td class="ps-3">
              {{ data.Nama }}
            </td>
            <td>{{ data.Kelas }}</td>
            <td>
              <span class="badge" :class="{
                'bg-danger': data?.Logs?.asrama === 'absen',
                'bg-primary': data?.Logs?.asrama === 'izin',
                'bg-warning': data?.Logs?.asrama === 'sakit',
              }">
                <!-- <span class="bg-danger"> -->
                {{ data?.Logs?.asrama }}
              </span>
            </td>
            <td>{{ data?.Logs?.asramaNote }}</td>
            <td>{{ data?.Logs?.asramaTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  async asyncData({ store, route, redirect }) {
    const detail = store.state.home.highlight;
    if (detail === '') {
      return redirect('/')
    }
    return { detail }
  },
  computed: {
    ...mapState('home', ['highlight'])
  },
  methods: {
    backPage() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
@import url(~/assets/css/dashboard/violation.css);

.bi-arrow-left {
  cursor: pointer;
}
</style>
