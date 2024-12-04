<template>
  <div>
    <div class="container-transaction">
      <LaundryFinanceModalDelete />
      <div class="list-transaction mb-2" v-for="(group, index) in groupedTransactions" :key="index">
        <p style="font-size: 12px;" class="mb-2 ps-2">{{ financeDate(index) }}</p>
        <div class="card p-3 shadow" style="border-radius: 15px;" :class="isLastKey(index) ? 'mb-5' : 'mb-3'">
          <div v-for="(data, i) in group" :key="i">
            <a href="javascript:;" @click="showDelete(data, index)" class="list-transaction-detail d-flex justify-content-between">
              <div class="d-flex align-items-center gap-2"
                :class="(group.length > 1 && i !== group.length - 1) ? 'mb-3' : ''">
                <div style="width: 35px; height: 35px;"
                  class="d-flex align-items-center justify-content-center rounded-circle"
                  :class="data.PK === 'credit' ? 'bg-danger' : 'bg-success'">
                  <i class="bi text-white" :class="data.PK === 'credit' ? 'bi-credit-card' : 'bi-wallet'"
                    style="font-size: 14px;"></i>
                </div>
                <div class="d-flex flex-column gap-1">
                  <p class="fw-bold text-capitalize" style="font-size: 12px; max-width: 150px; white-space: wrap;">{{
                    data.Name }}</p>
                  <small style="font-size: 10px;">{{ data.SK }}</small>
                </div>
              </div>
              <div class="d-flex flex-column justify-content-center align-items-end gap-1"
                :class="(group.length > 1 && i !== group.length - 1) ? 'mb-3' : ''">
                <P style="font-size: 11px;">{{ rupiah(data.Amount) }}</P>
                <p style="font-size: 10px;">{{ data.PK }}</p>
              </div>
              <!-- <hr v-if="i !== group.length - 1" style="padding-block: -10px !important;"> -->
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import formatSet from '~/mixins/formatSet'
export default {
  mixins: [formatSet],
  computed: {
    ...mapState('laundry/finance', ['groupedTransactions']),
  },
  methods: {
    ...mapMutations('laundry/finance', { changeDelete: 'showDelete' }),
    showDelete(data, index) {
      this.changeDelete({ data, index })
    },
    isLastKey(key) {
      const keys = Object.keys(this.groupedTransactions);
      return key === keys[keys.length - 1];
    }
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(14, 12, 12);
}
</style>
