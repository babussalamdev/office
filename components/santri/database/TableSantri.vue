<template>
  <div class="table-responsive animate__animated animate__fadeInUp">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" />
          </th>
          <th scope="col">Nama</th>
          <th scope="col">NISN</th>
          <th scope="col">Orang Tua</th>
          <th scope="col">Alamat</th>
          <th scope="col" class="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(san, index) in santri" :key="index">
          <td>
            <input type="checkbox" />
          </td>
          <td>{{ san.nama }}</td>
          <td>{{ san.nisn }}</td>
          <td>{{ san.ortu }}</td>
          <td>{{ san.alamat }}</td>
          <td class="text-end">
            <a href="#" @click="edit(san.id)">
              <i class="bx bx-pencil text-primary"></i>
            </a>
            <a href="#" @click="rmv(san.id, san.name)">
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
  props: ["santri"],
};
</script>

<style lang="scss" scoped></style>
