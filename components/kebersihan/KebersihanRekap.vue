<template>
  <div>
    <!-- modal -->
    <KebersihanModal />

    <!-- table -->
    <div class="animate__animated animate__fadeInUp">
      <div class="row mb-3">
        <div class="col-12 col-md-6 d-flex align-items-center mb-1 mb-md-0">
          <h2 class="" style="font-size: 14px;">Ruangan - {{ listJob.length > 0 ? listJob[0].Name : '' }}</h2>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-end gap-1">
          <nuxt-link to="/kebersihan/scan">
            <button class="btn btn-sm btn-primary" style="font-size: 12px;">scan</button>
          </nuxt-link>
          <button class="btn btn-sm btn-danger" style="font-size: 12px;" @click="resetData">reset</button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <!-- <th scope="col" class="text-capitalize">Mulai</th> -->
              <th scope="col" class="text-capitalize">Selesai</th>
              <!-- <th scope="col" class="text-capitalize">Selesai/Terkendala</th> -->
              <th scope="col" class="text-capitalize">Ruangan</th>
              <th scope="col" class="text-capitalize">Job</th>
              <th scope="col" class="text-capitalize">PIC</th>
              <th scope="col" class="text-capitalize">Status</th>
              <th scope="col" class="text-capitalize text-end pe-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in listJob" :key="index">
              <!-- <td class="text-capitalize" scope="col">
                <p class="mb-0">
                  {{ data.Timestamp?.mulai ? data.Timestamp?.mulai?.split(' ')[0] : '-' }}
                </p>
                <p>
                  {{ data.Timestamp?.mulai ? data.Timestamp?.mulai?.split(' ')[1] : '-' }}
                </p>
              </td> -->
              <td class="text-capitalize" scope="col">
                <p class="mb-0">
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[0] : '-' }}
                </p>
                <p>
                  {{ data.Timestamp?.selesai ? data.Timestamp?.selesai?.split(' ')[1] : '-' }}
                </p>
              </td>
              <td class="text-capitalize align-middle" scope="col">{{ data.Name }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.Job }}</td>
              <td class="text-capitalize align-middle" scope="col">{{ data.PIC }}</td>
              <td class="text-capitalize align-middle" scope="col">
                <span class="py-2 px-2 rounded-2 bg-primary text-white">{{
                    data.Status }}</span>
              </td>
              <td class="text-end align-middle">
                <a href="javascript:;" @click="doneItem(data.SK)">
                  <button class="btn btn-sm btn-success" style="font-size: 12px;">
                    Done
                  </button>
                </a>
                <a href="javascript:;" @click="updateData(data.SK)">
                  <button class="btn btn-sm btn-danger" style="font-size: 12px;">
                    Failed
                  </button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('kebersihan', ['listJob'])
  },
  methods: {
    ...mapActions('kebersihan', ['doneItem']),
    ...mapMutations('kebersihan', ['updateData', 'resetData'])
  },
}
</script>

<style scoped>
select,
input {
  width: max-content;
}
</style>
