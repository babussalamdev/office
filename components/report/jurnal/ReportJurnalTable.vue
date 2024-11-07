<template>
  <div class="animate__animated animate__fadeInUp">
    <h2 class="mb-3 mb-md-3">Report Jurnal</h2>
    <div class="d-flex justify-content-between mb-3 w-auto">
      <div class="d-flex">
        <div class="input-group">
          <span class="input-group-text">Date</span>
          <input style="width: max-content;" type="date" class="form-control" v-model="date">
        </div>
        <select class="form-select" aria-label="Default select example" v-model="selectedKelas" @change="addNewData">
          <option value="" selected disabled>Kelas</option>
          <option v-for="(data, index) in listKelas" :key="index" :value="data">{{ data.Nama }}</option>
        </select>
      </div>
      <button class="btn btn-success border-0">Export</button>
    </div>
    <div class="table-responsive" ref="input">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th class="text-uppercase">Description</th>
            <th class="text-uppercase">Occurrence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-capitalize">Belajar Katakana level 1</td>
            <td class="text-capitalize">Kelewat satu huruf</td>
          </tr>
          <!-- <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
            </td>
            <td v-for="(value, key) in data.Penilaian" :key="key">
              <div class="cursor-pointer">
                {{ value }}
              </div>
            </td>
            <td class="text-capitalize align-middle">
              {{ data.TotalScore }}
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('report/jurnal', ['listKelas']),
    ...mapGetters('report/jurnal', ['getDate', 'getSelectedKelas']),
    date: {
      get() {
        return this.getDate
      },
      set(value) {
        this.$store.commit('setState', { key: 'date', value })
      }
    },
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        this.$store.commit('setState', { key: 'selectedKelas', value })
      }
    }
  },
}
</script>

<style scoped>
a {
  font-size: 12px;
}

.form-select {
  font-size: 12px;
  width: max-content !important;
}

span {
  font-size: 12px;
}

button {
  font-size: 12px;
}

.form-check-label {
  font-size: 12px;
}

.form-control {
  font-size: 12px;
  width: 60px;
}

input {
  padding: 5px;
}
</style>
