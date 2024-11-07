<template>
  <div>
    <div class=" mb-3 d-flex justify-content-between animate__animated animate__fadeInUp">
      <h2 class="text-capitalize">
        Highlight Santri
      </h2>
      <nuxt-link class="text-decoration-none" to="/dashboard/TableHighlight">Lihat Semua</nuxt-link>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th class="ps-3">Nama Siswa</th>
            <th>Kelas</th>
            <th>Status</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in filteredData" :key="index">
            <td class="ps-3 align-middle">
              {{ data.Nama }}
            </td>
            <td class="align-middle">{{ data.Kelas }}</td>
            <td class="align-middle">
              <span class="badge" :class="{
                'bg-danger': data?.Logs?.asrama.status === 'absen',
                'bg-primary': data?.Logs?.asrama.status === 'izin',
                'bg-warning': data?.Logs?.asrama.status === 'sakit',
              }">
                <!-- <span class="bg-danger"> -->
                {{ data?.Logs?.asrama.status }}
              </span>
            </td>
            <td class="align-middle">{{ data?.Logs?.asramaNote }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('home', ['highlight']),
    filteredData() {
      const data = this.highlight;
      // const limit = this.$route.path === "/card" ? 5 : data.length;
      return data.slice(0, 7);
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/dashboard/violation.css);

h2,
a {
  font-size: 14px;
}

tr th, tr td {
  white-space: nowrap;
}
</style>
