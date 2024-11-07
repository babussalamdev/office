<template>
  <div>
    <div class="mb-3">
      <h2>Data Santri Laundry</h2>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">No</th>
            <th scope="col">ID</th>
            <th scope="col">Tanggal</th>
            <th scope="col">Asrama</th>
            <th scope="col">Nama Santri</th>
            <th scope="col">Jumlah Laundry</th>
            <th scope="col">Jumlah Kelebihan</th>
            <th scope="col">Lunas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dummy" :key="index">
            <td class="text-capitalize align-middle">{{ data.ID }}</td>
            <td class="text-capitalize align-middle">{{ data.No }}</td>
            <td class="text-capitalize align-middle">{{ data.Tanggal }}</td>
            <td class="text-capitalize align-middle">{{ data.Asrama }}</td>
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle">{{ data.Jumlah }}</td>
            <td class="text-capitalize align-middle">{{ data.Kelebihan }}</td>
            <td class="text-capitalize align-middle">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="data.Keterangan === 'Lunas'" id="defaultCheck1">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      dummy: [
        {
          No: 1,
          ID: '2h54d8',
          Tanggal: '8/5/24',
          Asrama: 1,
          Nama: 'Ali Al Bantany',
          Jumlah: 3,
          Kelebihan: 1,
          Keterangan: 'Lunas'
        },
        {
          No: 2,
          ID: '2h54d8',
          Tanggal: '8/5/24',
          Asrama: 1,
          Nama: 'Utsaimin',
          Jumlah: 3,
          Kelebihan: 3,
          Keterangan: 'Belum Lunas'
        },
      ],
    };
  },
  computed: {
    ...mapState('mutabaah', ['santri'])
  },
  methods: {
    // ...mapMutations('mutabaah', ['showDetail'])
    showDetail(sk, subject) {
      this.$store.commit('mutabaah/showDetail', { sk, subject })
    },
  },
};
</script>

<style scoped>
input {
  width: 17px;
  height: 17px;
}

</style>
