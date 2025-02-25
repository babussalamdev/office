<template>
  <div>
    <ChartMaintenance />
    <div class="row">
      <div class="col-12 col-lg-6 mb-3">
        <div class="mb-3 animate__animated animate__fadeInUp">
          <h2 class="text-capitalize">
            Highlight Kebersihan
          </h2>
          <!-- <nuxt-link class="text-decoration-none" to="/dashboard/TableHighlight">Lihat Semua</nuxt-link> -->
        </div>
        <div class="table-responsive animate__animated animate__fadeInUp">
          <table class="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th class="ps-3">Ruangan</th>
                <th>Gedung</th>
                <th>PIC</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in sarprasData?.sedang" :key="index">
                <td class="ps-3 align-middle">
                  {{ data.Name }}
                </td>
                <td class="align-middle">{{ data.Series }}</td>
                <td class="align-middle">{{ data.PIC }}</td>
                <td class="align-middle">
                  <span class="py-1 px-2 rounded-1 bg-primary text-white">{{ data.Status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 col-lg-6" v-if="this.$auth.user.Jabatan?.sarpras === 'personalia'">
        <div class="mb-3 animate__animated animate__fadeInUp">
          <h2 class="text-capitalize">
            Highlight Maintenance
          </h2>
          <!-- <nuxt-link class="text-decoration-none" to="/dashboard/TableHighlight">Lihat Semua</nuxt-link> -->
        </div>
        <div class="table-responsive animate__animated animate__fadeInUp">
          <table class="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th class="ps-3">Laporan</th>
                <th>Gedung</th>
                <th>Ruangan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in filteredData" :key="index">
                <td class="ps-3 align-middle">
                  {{ data.Name }}
                </td>
                <td class="align-middle">{{ data.Series }}</td>
                <td class="align-middle">{{ data.Location }}</td>
                <td class="align-middle">
                  <span class="py-1 px-2 rounded-1 bg-warning text-dark">{{ data.Status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    computed: {
      ...mapState('home', ['sarprasData']),
      filteredData() {
        const data = this.sarprasData.maintenance;
        return data?.slice(0, 7);
      },
    },
}
</script>

<style scoped>
h2, a {
  font-size: 14px;
}

.table-responsive {
  overflow-x: auto;
  border-radius: 7px !important;
  box-shadow: 0 0 15px rgba(177, 177, 177, 0.4);
}
.table-responsive .table {
  width: 100%;
  margin-bottom: 0 !important;
}
.table-responsive .table thead tr th {
  padding: 15px 20px;
  background: #176b87;
  font-size: 12px;
  color: #fff;
}
.table-responsive .table tbody tr td {
  line-height: 16px;
  padding: 20px 20px;
  margin: auto;
  font-size: 12px;
}
.table-responsive .table tbody tr td .action {
  margin-top: 1px !important;
  height: 100%;
  min-width: 54px !important;
}
.table-responsive .table tbody tr td .personalia {
  font-size: 12px;
  color: #fff;
  border-radius: 30px;
  padding: 5px 15px;
}
.table-responsive .table tbody tr td span {
  font-size: 12px !important;
}
.table-responsive .table tbody tr td button {
  padding: 2px 5px 0.5px !important;
}
.table-responsive .table tbody tr td button i {
  font-size: 14px !important;
  padding: -5px !important;
}
@media screen and (max-width: 576px) {
 .table-responsive .table thead tr th {
    font-size: 12px;
  }
  .table-responsive .table tbody tr td {
    font-size: 12px;
  }
}
</style>
