<template>
  <div class="animate__animated animate__fadeInUp">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0">Lagger Mapel</h2>
      <button class="btn btn-success border-0">Export</button>
    </div>
    <div class="table-responsive" ref="input">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th class="text-uppercase text-center" v-for="(value, key) in dynamicKeys" :key="key">{{ value }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in santri" :key="index">
            <td class="text-capitalize align-middle">
              <h1>{{ data.Nama }}</h1>
            </td>
            <td class="text-center" v-for="key in dynamicKeys" :key="key">{{ data[key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState('report/lagger', ['select', 'openEdit']),
    ...mapGetters('report/lagger', ['getSelectedMapel', 'getDataSantri', 'getNilai']),
    nilai: {
      get() {
        return this.getNilai
      },
      set(value) {
        const obj = { key: 'nilai', value }
        this.$store.commit('kelas/nilai/setState', obj)
      }
    },
    santri: {
      get() {
        return this.getDataSantri
      },
      set(value) {
        const obj = { key: 'santri', value }
        this.$store.commit('report/lagger/setState', obj)
      }
    },

    dynamicKeys() {
      const excludeKeys = ["Nama", "SK"];
      // Pastikan data santri tidak kosong
      if (this.santri.length === 0) {
        return [];
      }
      
      const firstObject = this.santri[0];
      const allKeys = Object.keys(firstObject);
      // Filter key untuk menghilangkan "Nama" dan "SK"
      return allKeys.filter(key => !excludeKeys.includes(key));
    }

  },
  methods: {
    ...mapActions('kelas/nilai', ['getSantri', 'setPenilaian']),
  },
};
</script>

<style scoped>
a {
  font-size: 12px;
}

select {
  font-size: 12px;
  width: fit-content !important;
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

@media screen and (max-width: 576px) {
  select {
    width: 100% !important;
  }
}
</style>
