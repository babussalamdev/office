<template>
  <div class="mb-4 animate__animated animate__fadeInUp">
    <h3 class="mb-3">Report Sarpras</h3>
    <div class="container-box">
      <!-- maintenance -->
      <div v-if="this.$auth.user.Jabatan?.sarpras === 'personalia'" class="box d-flex justify-content-between align-items-center p-3 rounded-3">
        <div class="number">
          <h2>{{ sarprasData.maintenanceLength }}</h2>
          <p>Maintenance</p>
        </div>
        <div class="icon p-3 bg-info-subtle d-flex justify-content-center rounded-2 align-items-center">
          <span class="material-icons text-info">build</span>
        </div>
      </div>
      <!-- done -->
      <div class="box d-flex justify-content-between align-items-center p-3 rounded-3">
        <div class="number">
          <h2>{{ sarprasData.doneLength }}</h2>
          <p>Done</p>
        </div>
        <div class="icon p-3 bg-success-subtle d-flex justify-content-center rounded-2 align-items-center">
          <span class="material-icons text-success">done_all</span>
        </div>
      </div>
      <!-- failed -->
      <div class="box d-flex justify-content-between align-items-center p-3 rounded-3">
        <div class="number">
          <h2>{{ sarprasData.failedLength }}</h2>
          <p>Failed</p>
        </div>
        <div class="icon p-3 bg-danger-subtle d-flex justify-content-center rounded-2 align-items-center">
          <span class="material-icons text-danger">close</span>
        </div>
      </div>
      <!-- selesai -->
      <div class="box d-flex justify-content-between align-items-center p-3 rounded-3">
        <div class="number">
          <h2>{{ sarprasData.selesaiLength }}</h2>
          <p>Selesai</p>
        </div>
        <div class="icon p-3 bg-primary-subtle d-flex justify-content-center rounded-2 align-items-center">
          <span class="material-icons text-primary">check</span>
        </div>
      </div>
      <!-- terkendala -->
      <div class="box d-flex justify-content-between align-items-center p-3 rounded-3">
        <div class="number">
          <h2>{{ sarprasData.terkendalaLength }}</h2>
          <p>Terkendala</p>
        </div>
        <div class="icon p-3 bg-warning-subtle d-flex justify-content-center rounded-2 align-items-center">
          <span class="material-icons text-warning">error_outline</span>
        </div>
      </div>
      <!-- tertunda -->
      <div class="box d-flex justify-content-between align-items-center p-3 rounded-3">
        <div class="number">
          <h2>{{ sarprasData.tertundaLength }}</h2>
          <p>Tertunda</p>
        </div>
        <div class="icon p-3 bg-secondary-subtle d-flex justify-content-center rounded-2 align-items-center">
          <span class="material-icons text-secondary">hourglass_empty</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('home', ['sarprasData']),
  },
}
</script>

<style scoped>
h3 {
  font-size: 14px;
}
.container-box {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.box {
  background: #fff;
  box-shadow: 1px 1px 15px #e1e1e1;
}
.number h2 {
  font-size: 24px;
  margin-bottom: 5px;
  font-weight: bold;
}
.number p {
  font-size: 14px;
  color: grey;
}
@media screen and (max-width: 992px) {
  .container-box {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 768px) {
  .container-box {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 576px) {
  .container-box {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
