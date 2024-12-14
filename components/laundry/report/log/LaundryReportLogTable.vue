<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
        <h2>Report Log</h2>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <span style="font-size: 12px;" class="input-group-text">Start</span>
          <input style="font-size: 12px;" type="date" class="form-control" v-model="start" :max="end">
          <span style="font-size: 12px;" class="input-group-text">End</span>
          <input style="font-size: 12px;" type="date" class="form-control" v-model="end" :min="start">
        </div>
      </div>
    </div>
    <div class="table-responsive white-space-nowrap animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="nowrap">Nama Santri</th>
            <th scope="col" class="nowrap">Asrama</th>
            <th scope="col" class="nowrap text-center">QTY</th>
            <th scope="col" class="nowrap text-center">Pinalty</th>
            <th scope="col" class="nowrap">Status</th>
            <th scope="col" class="nowrap">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in datas" :key="index">
            <td class="text-capitalize align-middle nowrap">{{ data.Name }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Asrama }}</td>
            <td class="text-capitalize align-middle nowrap text-center">{{ data.QTY }}</td>
            <td class="text-capitalize align-middle nowrap text-center">{{ data.Pinalty }}</td>
            <td class="text-capitalize align-middle">
              <span class="px-2 py-1 rounded-1" :class="data.Status === 'none' ? 'text-bg-secondary' : data.Status === 'free' ? 'text-bg-success' : data.Status === 'cash' ? 'text-bg-primary' : 'text-bg-warning'">
                {{ data.Status }}
              </span>
            </td>
            <td class="text-capitalize align-middle nowrap">{{ rupiah(data.Amount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import formatSet from '~/mixins/formatSet';
export default {
  mixins: [formatSet],
  computed: {
    ...mapState('laundry/report/log', ['datas']),
    ...mapGetters('laundry/report/log', ['getStart', 'getEnd']),
    start: {
      get() {
        return this.getStart
      },
      set(value) {
        this.$store.commit('laundry/report/log/setState', { key: 'start', value })
      }
    },
    end: {
      get() {
        return this.getEnd
      },
      set(value) {
        this.$store.commit('laundry/report/log/setState', { key: 'end', value })
      }
    }
  },
  methods: {
    ...mapActions('laundry/report/log', ['getDataByDate'])
  },
  watch: {
    start() {
      this.getDataByDate()
    },
    end() {
      this.getDateByDate()
    }
  },
};
</script>

<style scoped></style>
