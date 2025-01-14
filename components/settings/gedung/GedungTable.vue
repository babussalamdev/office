<template>
  <div>
    <div class="row mb-3 animate__animated animate__fadeInUp">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h3 style="font-size: 14px;">Settings Gedung</h3>
        </div>
        <div class="col-12 col-md-6">
          <!-- Button trigger modal -->
          <div class="button-santri float-end">
            <button style="font-size: 12px;" type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#gedungModal">
              Tambah Data
            </button>
          </div>
        </div>
      </div>
    <GedungModal />
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in datas" :key="i">
            <td scope="row" class="text-capitalize align-middle">
              {{ data.SK }}
            </td>
            <td scope="row" class="align-middle">
              {{ data.Status }}
            </td>
            <td class="text-end align-middle">
              <a href="javascript:;">
                <button class="btn btn-sm" :class="data.Status === 'active' ? 'btn-primary' : 'btn-secondary'" @click="ubahData(data.SK, data.Status)">
                  <i class='bx bx-power-off'></i>
                </button>
              </a>
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
    ...mapState('gedung', ['datas'])
  },
  methods: {
    ...mapActions('gedung', ['deleteItem', 'updateItem']),
    ubahData(sk, status) {
      this.updateItem({ sk, status })
    }
  },
}
</script>

<style scoped>

</style>
