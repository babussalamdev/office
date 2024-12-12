<template>
  <div>
    <div class="mb-3">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h2>Data Santri Laundry</h2>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end">
          <input type="date" class="form-control" style="font-size: 12px; width: fit-content;" v-model="date">
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nama Santri</th>
            <th scope="col">Asrama</th>
            <th scope="col" class="text-center">Jumlah Laundry</th>
            <th scope="col" class="text-center">Jumlah Kelebihan</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in datas" :key="index">
            <td class="text-capitalize align-middle">{{ data.Name }}</td>
            <td class="text-capitalize align-middle">{{ data.Asrama }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.QTY }}</td>
            <td class="text-capitalize align-middle text-center">{{ data.Pinalty }}</td>
            <td class="text-capitalize align-middle">
              <span class="px-2 py-1 rounded-1" :class="data.Status === 'none' ? 'text-bg-secondary' : data.Status === 'free' ? 'text-bg-success' : data.Status === 'cash' ? 'text-bg-primary' : 'text-bg-warning'">
                {{ data.Status }}
              </span>
            </td>
            <td class="text-capitalize align-middle">{{ rupiah(data.Amount) }}</td>
            <td class="text-capitalize align-middle text-end">
              <a href="javascript:;" v-if="data.Status === 'none'" @click="editItem(data.SK, 'cash')">
                <button class="btn btn-sm btn-primary" style="font-size: 12px;">Cash</button>
              </a>
              <a href="javascript:;" v-if="data.Status === 'none'" @click="editItem(data.SK, 'transfer')">
                <button class="btn btn-sm btn-warning" style="font-size: 12px;">Transfer</button>
              </a>
            </td>
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
    ...mapState('laundry/datasantri', ['datas']),
    ...mapGetters('laundry/datasantri', ['getDate']),
    date: {
      get() {
        return this.getDate
      },
      set(value) {
        this.$store.commit('laundry/datasantri/setState', { key: 'date', value })
      }
    }
  },
  watch: {
    date() {
      this.$store.dispatch('laundry/datasantri/getDataByDate')
    }
  },
  methods: {
    ...mapActions('laundry/datasantri', { changeEdit: 'editItem'}),
    editItem(sk, type)   {
      this.changeEdit({sk, type})
    }
  },
}
</script>

<style scoped></style>
