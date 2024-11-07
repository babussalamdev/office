<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 style="font-size: 14px;">Tabel Card</h2>
      <button style="font-size: 12px;" class="btn btn-sm btn-primary" data-bs-toggle="modal"
        data-bs-target="#cardModal">Tambah Kartu</button>
    </div>
    <!-- <div class="row mb-3">
      <div class="col-6 d-flex align-items-center">
      </div>
      <div class="col-6 d-flex justify-content-end gap-2">
      </div>
    </div> -->
    <!-- Modal -->
    <CardModal />
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">Nama Santri</th>
            <th scope="col" class="text-start">CNC</th>
            <th scope="col" class="text-end">Action</th>
            <!-- <th scope="col" class="text-end">Action</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in santri" :key="item.CNC">
            <td>{{ item.Nama }}</td>
            <td>{{ item.CNC }}</td>
            <td class="text-end">
              <a style="font-size: 12px;" href="javascript:;" class="btn btn-sm btn-danger" @click="deleteItem(item.CNC)">delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('card', ['santri'])
  },
  methods: {
    ...mapActions('card', ['deleteItem'])
  },
}
</script>

<style scoped></style>
