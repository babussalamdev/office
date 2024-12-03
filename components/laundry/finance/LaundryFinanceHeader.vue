<template>
  <div class="row mb-3">
    <div class="col-12 col-md-6 d-flex align-items-center">
      <h2 style="font-size: 14px;" class="mb-3 mb-md-0">Data Finance Laundry</h2>
    </div>
    <div class="col-12 col-md-6">
      <div class="input-group">
        <button class="btn btn-sm btn-success" style="font-size: 12px;">Export</button>
        <span class="input-group-text" style="font-size: 12px; padding: 6px 8px !important;">start</span>
        <input type="date" class="form-control" style="font-size: 12px;" v-model="start">
        <span class="input-group-text" style="font-size: 12px; padding: 6px 8px !important;">end</span>
        <input type="date" class="form-control" style="font-size: 12px;" v-model="end">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('laundry/finance', ['getStart', 'getEnd']),
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        this.$store.commit('laundry/finance/setState', { key: 'start', value })
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        this.$store.commit('laundry/finance/setState', { key: 'end', value })
      }
    }
  },
}
</script>

<style scoped></style>
