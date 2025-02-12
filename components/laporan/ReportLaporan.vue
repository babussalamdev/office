<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <h2 class="mb-3">Report Laporan</h2>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" class="text-capitalize">Tercacat</th>
              <!-- <th scope="col" class="text-capitalize">Proses</th>
              <th scope="col" class="text-capitalize">Selesai/Terkendala</th> -->
              <th scope="col" class="text-capitalize">Job</th>
              <th scope="col" class="text-capitalize">Ruangan</th>
              <!-- <th scope="col" class="text-capitalize">PIU</th> -->
              <th scope="col" class="text-capitalize">Status</th>
              <th scope="col" class="text-capitalize text-end pe-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in listLaporan" :key="index">
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.SK.split(' ')[0] }}
                </p>
                <p>
                  {{ data.SK.split(' ')[1] }}
                </p>
              </td>
              <!-- <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.Timestamp?.proses ? data.Timestamp?.proses?.split(' ')[0] : '-' }}
                </p>
                <p>
                  {{ data.Timestamp?.proses ? data.Timestamp?.proses?.split(' ')[1] : '-' }}
                </p>
              </td>
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[0] : (data.Timestamp?.terkendala ? data.Timestamp?.terkendala?.split(' ')[0] : '-') }}
                </p>
                <p>
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[1] : (data.Timestamp?.terkendala ? data.Timestamp?.terkendala?.split(' ')[1] : '-') }}
                </p>
              </td> -->
              <td class="text-capitalize align-middle" scope="col">{{ data.Name }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.Location }}</td>
              <!-- <td class="text-capitalize align-middle" scope="col">{{ data.PIU }}</td> -->
              <td class="text-capitalize align-middle" scope="col">
                <span class="py-2 px-2 rounded-2"
                  :class="data.Status === 'proses' ? 'bg-success text-white' : data.Status === 'selesai' ? 'bg-primary text-white' : data.Status === 'terkendala' ? 'bg-danger text-white' : data.status === 'menunggu' ? 'bg-warning text-dark' : 'bg-info text-dark'">{{
                    data.Status }}</span>
              </td>
              <!-- <td class="text-capitalize align-middle" scope="col">{{ data.Note }}</td> -->
              <td class="text-end align-middle">
                <a href="javascript:;" @click="inputToReport(data.SK)">
                  <button class="btn btn-sm btn-primary">
                    <i class="bx bx-power-off text-white"></i>
                  </button>
                </a>
                <a href="javascript:;" @click="deleteReport(data.SK)">
                  <button class="btn btn-sm btn-danger">
                    <i class="bx bx-trash text-white"></i>
                  </button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- modal -->
    <ReportModal />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('scan', ['listLaporan']),
  },
  methods: {
    ...mapActions('scan', ['inputReport', 'deleteReport']),
    ...mapMutations('scan', ['inputToReport']),
  },
  watch: {
  },
}
</script>

<style scoped>
button {
  padding: inherit !important;
}

button i {
  font-size: 14px !important;
}
</style>
