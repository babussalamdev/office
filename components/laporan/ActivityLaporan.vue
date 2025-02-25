<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <div class="row mb-3">
        <div class="col-12 col-md-6 d-flex align-items-center mb-1 mb-md-0">
          <h2 class="">Activity Laporan</h2>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end">
          <button class="btn btn-sm btn-primary" style="font-size: 12px;" type="button" data-bs-toggle="modal" data-bs-target="#modalAddActivity">Add +</button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" class="text-capitalize">Menunggu</th>
              <th scope="col" class="text-capitalize">Proses</th>
              <!-- <th scope="col" class="text-capitalize">Selesai/Terkendala</th> -->
              <th scope="col" class="text-capitalize">Job</th>
              <th scope="col" class="text-capitalize">Ruangan</th>
              <th scope="col" class="text-capitalize">PIC</th>
              <th scope="col" class="text-capitalize">Status</th>
              <th scope="col" class="text-capitalize text-end pe-4" v-if="unit === 'sarpras' && hasPersonaliaSarpras">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in activity" :key="index">
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.Timestamp?.menunggu ? data.Timestamp?.menunggu?.split(' ')[0] : '-' }}
                </p>
                <p>
                  {{ data.Timestamp?.menunggu ? data.Timestamp?.menunggu?.split(' ')[1] : '-' }}
                </p>
              </td>
              <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.Timestamp?.proses ? data.Timestamp?.proses?.split(' ')[0] : '-' }}
                </p>
                <p>
                  {{ data.Timestamp?.proses ? data.Timestamp?.proses?.split(' ')[1] : '-' }}
                </p>
              </td>
              <!-- <td class="text-capitalize" scope="col">
                <p class="mb-1">
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[0] : (data.Timestamp?.terkendala ?
                    data.Timestamp?.terkendala?.split(' ')[0] : '-') }}
                </p>
                <p>
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[1] : (data.Timestamp?.terkendala ?
                    data.Timestamp?.terkendala?.split(' ')[1] : '-') }}
                </p>
              </td> -->
              <td class="text-capitalize align-middle" scope="col">{{ data.Name }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.Location }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.PIC }}</td>
              <td class="text-capitalize align-middle" scope="col">
                <span class="py-2 px-2 rounded-2"
                  :class="data.Status === 'proses' ? 'bg-success text-white' : data.Status === 'selesai' ? 'bg-primary text-white' : data.Status === 'terkendala' ? 'bg-danger text-white' : 'bg-warning text-dark'">{{
                    data.Status }}</span>
              </td>
              <td class="text-end align-middle" v-if="unit === 'sarpras' && hasPersonaliaSarpras">
                <a v-if="data.Status === 'menunggu'" href="javascript:;" @click="updateToActivity(data.SK)">
                  <button class="btn btn-sm btn-warning">
                    <i class="bx bx-pencil text-dark"></i>
                  </button>
                </a>
              </td>
              <!-- <td class="text-capitalize align-middle" scope="col">{{ data.Note }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- modal -->
    <ActivityModal />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Activity from '~/pages/laporan/activity.vue';
export default {
  computed: {
    ...mapState('scan', ['activity']),
    ...mapState("index", ["unit"]),
    hasPersonaliaSarpras() {
      return this.$auth.user.Jabatan?.sarpras === 'personalia'
    }
  },
  methods: {
    ...mapMutations('scan', ['updateToActivity'])
  },
}
</script>

<style scoped>
select,
input {
  width: max-content;
}
</style>
