<template>
  <div>
    <h2 class="mb-3 text-capitalize animate__animated animate__fadeInUp">
      violation report
    </h2>
    <div class="chart-class animate__animated animate__fadeInUp">
      <table class="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th class="ps-3">Nama Siswa</th>
            <th>Jenis Pelanggaran</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in $parent.violation" :key="index">
            <td class="ps-3">
              <h3>
                {{ data.name }}
              </h3>
            </td>
            <td>
              <span
                class="item-violation"
                :class="{
                  'bg-primary': data.jenis === 'Bahasa',
                  'bg-success': data.jenis === 'Keamanan',
                  'bg-danger': data.jenis === 'Ibadah',
                  'bg-warning': data.jenis === 'Kebersihan',
                }"
              >
                {{ data.jenis }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url(~/assets/css/dashboard/violation.css);
</style>
