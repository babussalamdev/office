<template>
  <div>
    <div class="card bg-secondary bg-opacity-10" style="padding: 12px; border-radius: 15px;">
      <div class="container-balance bg-white position-relative" style="border-radius: 10px; padding: 15px; border: 1px solid #ced4da; overflow: hidden;">
        <div class="circle"></div>
        <div class="position-relative" style="z-index: 2;">
          <div class="balance d-flex flex-column align-items-center justify-content-center mb-3">
            <div class="d-flex gap-1 bg-secondary-subtle px-2 py-1 rounded-pill mb-2">
              <i class="bi bi-info-circle" style="font-size: 8px !important;"></i>
              <p class="mb-0" style="font-size: 8px !important;">Balance</p>
            </div>
            <div class="balance">
              <h1 class="fw-bold" style="font-size: 24px;">{{ rupiah(datas?.pockets?.balance) }}</h1>
            </div>
          </div>
          <div class="cashflow">
            <div class="row">
              <div class="col-6 d-flex align-items-center gap-2">
                <div class="p-1 bg-success rounded-circle d-flex align-items-center justify-content-center"
                  style="height: 25px; width: 25px;">
                  <i class="bi bi-arrow-down text-white" style="font-size: 12px;"></i>
                </div>
                <div class="d-flex flex-column justify-content-center gap-1">
                  <small style="font-size: 10px;" class="text-secondary">debt</small>
                  <p class="mb-0" style="font-size: 14px;">{{ nominal(datas?.pockets?.debit) }}</p>
                </div>
              </div>
              <div class="col-6 d-flex align-items-center gap-2">
                <div class="p-1 bg-danger rounded-circle d-flex align-items-center justify-content-center"
                  style="height: 25px; width: 25px;">
                  <i class="bi bi-arrow-up text-white" style="font-size: 12px;"></i>
                </div>
                <div class="d-flex flex-column justify-content-center gap-1">
                  <small style="font-size: 10px;" class="text-secondary">credit</small>
                  <p class="mb-0" style="font-size: 14px;">{{ nominal(datas?.pockets?.credit) }}</p>
                </div>
              </div>
            </div>
        </div>
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

<style scoped>
/* .container-balance {
  z-index: 1;
} */
.circle {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  height: 100px;
  width: 100px;
  background-color: #7ed833 ;
  filter: blur(40px);
  border-radius: 50%;
  z-index: 1;
}
</style>
