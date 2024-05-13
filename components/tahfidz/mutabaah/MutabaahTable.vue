<template>
  <div>
    <div class="mb-3">
      <h2>Rekap Tahfidz</h2>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">Nama / Nis</th>
            <th scope="col">Hafalan Baru</th>
            <th scope="col">Murojaah</th>
            <th scope="col">Tilawah / Murojaah mandiri</th>
            <th scope="col">Tahsin</th>
            <th scope="col" class="text-start">Catatan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dummy" :key="index">
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
              <p class="text-secondary mt-1">{{ data.Nis }}</p>
            </td>
            <td class="text-center">
              <i class="material-icons bg-primary p-2 text-white rounded-circle"
                >library_add</i
              >
            </td>
            <td class="text-center">
              <i class="material-icons bg-warning p-2 text-white rounded-circle"
                >restart_alt</i
              >
            </td>
            <td class="text-center">
              <i class="material-icons bg-success p-2 text-white rounded-circle"
                >auto_stories</i
              >
            </td>
            <td class="text-center align-middle">
              <i class="material-icons bg-danger p-2 text-white rounded-circle"
                >mic</i
              >
            </td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dummy: [
        {
          Nama: "Fauzan Gunawan",
          Nis: "3423321",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
