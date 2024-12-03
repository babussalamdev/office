<template>
  <div>
    <div class="card p-3">
      <div class="container-balance d-flex flex-column align-items-center justify-content-center bg-danger">
        <div class="d-flex gap-1 bg-secondary-subtle px-2 py-1 rounded-pill mb-2">
          <i class="bi bi-info-circle" style="font-size: 14px !important;"></i>
          <p class="mb-0" style="font-size: 14px !important;">Balance</p>
        </div>
        <div class="balance">
          <h1 class="fw-bold" style="font-size: 24px;">{{ rupiah(datas.pockets.balance) }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import formatSet from '~/mixins/formatSet';
export default {
  mixins: [formatSet],
  computed: {
    ...mapState('laundry/finance', ['datas'])
  },
}
</script>

<style scoped></style>
