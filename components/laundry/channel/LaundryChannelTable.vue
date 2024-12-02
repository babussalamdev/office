<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
        <h2>Channel Table</h2>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <span style="font-size: 12px !important;" class="bi bi-search input-group-text"></span>
          <input style="font-size: 12px !important;" v-model="search" type="text" class="form-control"
            placeholder="Search">
          <button style="font-size: 12px !important;" class="btn btn-sm btn-primary" data-bs-toggle="modal"
            data-bs-target="#laundryChannelAdd">Input Data</button>
        </div>
      </div>
    </div>
    <LaundryChannelAdd />
    <LaundryChannelEdit />
    <div class="table-responsive white-space-nowrap animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="nowrap">Nama</th>
            <th scope="col" class="nowrap">Type</th>
            <th scope="col" class="nowrap">Kategori</th>
            <th scope="col" class="nowrap">Kontak</th>
            <th scope="col" class="nowrap">Alamat</th>
            <th scope="col" class="nowrap">Catatan Tambahan</th>
            <th scope="col" class="nowrap text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in filteredDatas" :key="index">
            <td class="text-capitalize align-middle nowrap">{{ data?.Name }}</td>
            <td class="text-capitalize align-middle nowrap">
              <span class="px-2 py-1 rounded-1" :style="{ backgroundColor: data.PK === 'technician' ? '#A8CD89' : '#D4EBF8' }">
                {{ data.PK }}
              </span>
            </td>
            <td class="text-capitalize align-middle nowrap">{{ data.Category }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Contact }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Address }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Note }}</td>
            <td class="text-capitalize align-middle text-end">
              <a href="javascript:;" @click="editItem(data.SK)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil text-dark"></i>
                </button>
              </a>
              <a href="javascript:;" @click="deleteItem(data.SK)">
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
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/channel', ['datas']),
    ...mapGetters('laundry/channel', ['filteredDatas', 'getSearch']),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('laundry/channel/setState', { key: 'search', value })
      }
    }
  },
  methods: {
    ...mapActions('laundry/channel', ['deleteItem']),
    ...mapMutations('laundry/channel', ['editItem'])
  },
}
</script>

<style scoped></style>
