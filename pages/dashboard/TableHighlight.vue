<template>
  <div>
    <div class="row mb-3">
      <div class="col-6 col-md-6 d-flex align-items-center">
        <i class="bi bi-arrow-left bg-primary p-2 rounded-circle text-white cursor-pointer" @click="backPage"></i>
      </div>
      <div class="col-6 col-md-6 d-flex align-items-center justify-content-end gap-2">
        <select class="form-select" v-model="selectedKelas" @change="applyFilter">
          <option value="all">All</option>
          <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">{{ data }}</option>
        </select>
        <select class="form-select" v-model="selectedAsrama" @change="applyFilter">
          <option value="all">All</option>
          <option v-for="(data, index) in uniqueStatus" :key="index" :value="data.status">{{ data.status }}</option>
        </select>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th class="ps-3">Nama Siswa</th>
            <th>Kelas</th>
            <th>Status</th>
            <th>Note</th>
            <th>Date / Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in filteredData" :key="index">
            <td class="ps-3">
              {{ data.Nama }}
            </td>
            <td>{{ data.Kelas }}</td>
            <td>
              <span class="badge" :class="{
                'bg-danger': data?.Logs?.asrama.status === 'absen',
                'bg-primary': data?.Logs?.asrama.status === 'izin',
                'bg-warning': data?.Logs?.asrama.status === 'sakit',
              }">
                <!-- <span class="bg-danger"> -->
                {{ data?.Logs?.asrama.status }}
              </span>
            </td>
            <td>{{ data?.Logs?.asrama.note === '' ? '-' : data?.Logs?.asrama.note }}</td>
            <td>{{ data?.Logs?.asrama.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      selectedKelas: 'all',
      selectedAsrama: 'all',
    }
  },
  mounted() {
    this.closeAllModals();;
  },
  async asyncData({ store, route, redirect }) {
    const detail = store.state.home.highlight;
    if (detail === '') {
      return redirect('/')
    }
    return { detail }
  },
  computed: {
    ...mapState('home', ['highlight']),
    uniqueClasses() {
      // Get unique classes from data
      const classes = this.detail.map(item => item.Kelas);
      return [...new Set(classes)];
    },
    uniqueStatus() {
      // Get unique classes from data
      const status = this.detail.map(item => item.Logs.asrama);
      return [...new Set(status)];
    },
    filteredData() {
      return this.detail.filter(item => {
        const matchesClass = this.selectedKelas === 'all' || item.Kelas === this.selectedKelas;
        const matchesAsrama = this.selectedAsrama === 'all' || item.Logs.asrama.status === this.selectedAsrama;
        return matchesClass && matchesAsrama;
      });
    }
  },
  methods: {
    closeAllModals() {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      // Menghapus kelas dan style dari body
      document.body.classList.remove('modal-open'); // Menghapus kelas
      document.body.style.overflow = ''; // Menghapus gaya inline
      document.body.style.paddingRight = ''; // Menghapus gaya inline
    },
    backPage() {
      this.$router.push('/')
    },
    applyFilter() {
      // Recompute the filtered data
      this.filteredData;
    }
  },
}
</script>

<style scoped>
@import url(~/assets/css/dashboard/violation.css);

.bi-arrow-left {
  cursor: pointer;
}

select {
  font-size: 12px;
  width: fit-content;
}
</style>
