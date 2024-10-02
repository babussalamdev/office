<template>
  <div>
    <h2 style="font-size: 12px;" class="mb-2">Waktu Tidur</h2>
    <div class="row mb-3">
      {{ waktuSiang }}
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <div class="input-group mb-1" style="font-size: 12px;">
          <span class="input-group-text" style="font-size: 12px;">Pagi</span>
          <input type="time" class="form-control" style="font-size: 12px;" v-if="waktuSiang" v-model="waktuSiang.Start" @change="setDate($event.target.value, 'Tidur Siang')">
          <input type="time" class="form-control" style="font-size: 12px;" v-if="waktuSiang" v-model="waktuSiang.End">
        </div>
        <div class="input-group" style="font-size: 12px;">
          <span class="input-group-text" style="font-size: 12px;">Sore</span>
          <input type="time" class="form-control" style="font-size: 12px;" v-if="waktuSiang" v-model="waktuSiang.Start">
          <input type="time" class="form-control" style="font-size: 12px;" v-if="waktuSiang" v-model="waktuSiang.End">
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex align-items-center justify-content-end">
        <select class="form-select" style="font-size: 12px; max-width: max-content;">
          <option value="">asrama</option>
        </select>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nama Santri</th>
            <th scope="col">Waktu</th>
            <th scope="col">Status</th>
            <th scope="col">PIC</th>
            <th scope="col" class="text-end">Action</th>
            <!-- <th scope="col">Ekskull</th> -->
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('asrama/waktuTidur', ['getWaktuSiang', 'getWaktuMalam']),
    waktuSiang() {
      return this.getWaktuSiang
    }
  },
  methods: {
    setDate(date, time) {
      console.log(date, time)
    }
  },
}
</script>

<style scoped></style>
