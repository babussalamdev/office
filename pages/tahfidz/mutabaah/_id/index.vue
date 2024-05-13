<template>
  <section id="rekaptahfidz">
    <div class="rekaptahfidz">
      <!-- table -->
      <div class="table-responsive animate__animated animate__fadeInUp">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th rowspan="2" class="text-center">Nama</th>
              <th colspan="4">Hafalan Baru</th>
              <th colspan="5">Absensi</th>
            </tr>
            <tr>
              <th>Awal</th>
              <th>Akhir</th>
              <th>Baru</th>
              <th>Jumlah</th>
              <th>T</th>
              <th class="bg-warning">S</th>
              <th class="bg-primary">I</th>
              <th class="bg-danger">A</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(data, index) in kaldik" :key="index">
                <td>{{ data.kegiatan }}</td>
                <td>{{ data.TglAwal }}</td>
                <td>{{ data.TglAkhir }}</td>
                <td :style="{ color: data.WarnaLabel }">{{ data.WarnaLabel }}</td>
                <td class="text-end">
                  <a href="#">
                    <i class="bx bx-pencil text-primary"></i>
                  </a>
                  <a href="#">
                    <i class="bx bx-trash text-danger"></i>
                  </a>
                </td>
              </tr> -->
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "mutabaah",
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
