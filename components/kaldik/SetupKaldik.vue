<template>
  <div class="table-responsive animate__animated animate__fadeInUp">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">Kegiatan</th>
          <th scope="col">Tanggal Dimulai</th>
          <th scope="col">Tanggal Berakhir</th>
          <th scope="col">Warna Label</th>
          <th scope="col" class="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in kaldik" :key="index">
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["kaldik"],
};
</script>

<style scoped></style>
