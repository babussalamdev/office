<template>
  <div class="row mb-3">
    <div class="col-12 col-md-6 d-flex align-items-center">
      <h2 style="font-size: 14px;" class="mb-3 mb-md-0">Data Finance Laundry</h2>
    </div>
    <div class="col-12 col-md-6">
      <div class="input-group">
        <button class="btn btn-sm text-white fw-bold" style="font-size: 12px; background-color: #34A853;">Export</button>
        <select class="form-select" style="font-size: 12px;" v-model="selectedYear" @change="getData">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>

        <!-- Dropdown untuk memilih bulan -->
        <select class="form-select" style="font-size: 12px;" v-model="selectedMonth" @change="getData">
          <option v-for="month in months" :key="month.value" :value="month.value">{{ month.name }}</option>
        </select>
        <!-- <span class="input-group-text" style="font-size: 12px; padding: 6px 8px !important;">start</span>
        <input type="date" class="form-control" style="font-size: 12px;" v-model="start">
        <span class="input-group-text" style="font-size: 12px; padding: 6px 8px !important;">end</span>
        <input type="date" class="form-control" style="font-size: 12px;" v-model="end"> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/finance', ['months', 'years']),
    ...mapGetters('laundry/finance', ['getStart', 'getEnd', 'getSelectedYear', 'getSelectedMonth']),
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
    },
    selectedYear: {
      get() {
        return this.getSelectedYear
      },
      set(value) {
        this.$store.commit('laundry/finance/setState', { key: 'selectedYear', value })
      }
    },
    selectedMonth: {
      get() {
        return this.getSelectedMonth
      },
      set(value) {
        this.$store.commit('laundry/finance/setState', { key: 'selectedMonth', value })
      }
    },
  },
  methods: {
    ...mapActions('laundry/finance', ['getData'])
  },
}
</script>

<style scoped></style>
