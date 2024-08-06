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
            <th scope="col" class="nowrap">ID</th>
            <th scope="col" class="nowrap">Receipt</th>
            <th scope="col" class="nowrap">Tanggal</th>
            <th scope="col" class="nowrap">Asrama</th>
            <th scope="col" class="nowrap">Nama Santri</th>
            <th scope="col" class="nowrap">Jumlah Laundry</th>
            <th scope="col" class="nowrap">Jumlah Kelebihan</th>
            <th scope="col" class="nowrap">Lunas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dummyData" :key="index">
            <td class="text-capitalize align-middle nowrap">{{ index + 1 }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.ID }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Receipt }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Tanggal }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Asrama }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Jumlah }}</td>
            <td class="text-capitalize align-middle nowrap">{{ data.Kelebihan }}</td>
            <td class="text-capitalize align-middle nowrap">
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
  computed: {
    ...mapState('laundry/input', ['dummyData'])
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
.nowrap {
  white-space: nowrap;
}
</style>
