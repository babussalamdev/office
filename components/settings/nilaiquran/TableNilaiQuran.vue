<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Kelas</th>
            <th scope="col">Semester</th>
            <th scope="col">Penilaian</th>
            <th scope="col" class="text-center">Total</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in quran" :key="i">
            <td scope="row">{{ data.SK.split('#')[1] }}</td>
            <td scope="row">{{ data.SK.split('#')[2] }}</td>
            <td scope="row">
              <div v-for="(value, index) in penilaian[i]" :key="index" style="display: inline">
                <div class="btn-group btn-group-sm px-0 py-0 me-1">
                  <div class="btn btn-secondary btn-sm disabled fs-6 align-middle">{{ value }}
                  </div>
                  <div class="btn btn-secondary btn-sm" @click="delScore(index, data.SK)">
                    <i class="material-icons fs-6">close</i>
                  </div>
                </div>
              </div>
            </td>
            <td scope="row" class="text-center">
              {{ totalNilai(penilaian[i]) }}
            </td>
            <td class="text-end">
              <a href="javascript:;" @click="inputScore(data.SK)">
                <button class="btn btn-sm btn-primary">
                  <i class="bx bx-plus"></i>
                </button>
              </a>
              <a href="javascript:;" @click="deleteItem(data.SK)">
                <button class="btn btn-sm btn-danger">
                  <i class="bx bx-trash text-white"></i>
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalNilaiQuran />
    <ModalPenilaianQuran />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      urlXlsx: ''
    };
  },
  computed: {
    ...mapState("setupnilaiquran", ["quran", 'penilaian']),
  },
  created() {
    if (process.env.NODE_ENV !== 'production') {
      this.urlXlsx = process.env.XlsxDev
    } else {
      this.urlXlsx = process.env.XlsxPro
    };
  },
  methods: {
    ...mapActions('setupnilaiquran', { deleteItem: 'deleteItem', changeStep: 'delScore', editItem: 'editItem' }),
    ...mapMutations('setupnilaiquran', ['inputScore']),
    delScore(index, sk) {
      const obj = { index, sk }
      this.changeStep(obj)
    },
    totalNilai(arr) {
      if (arr.length > 0) {
        return arr
          .map(item => {
            // Pisahkan string pada '-'
            const parts = item.split('-');
            // Ambil bagian setelah '-' dan konversi ke angka
            return parseFloat(parts[1]) || 0;
          })
          .reduce((acc, curr) => acc + curr, 0);
      }
    }
  },
};
</script>

<style scoped>
.fs-6 {
  font-size: 12px !important;
}

tr th {
  white-space: nowrap;
}

tr td {
  white-space: nowrap;
}
</style>
