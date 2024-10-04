<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <h2 class="mb-2">Jurnal Page</h2>
      <div class="d-flex justify-content-between mb-3">
        <div class="d-flex">
          <select class="form-select" v-model="selectedKelas" @change="applyFilter">
            <option value="" selected disabled>Kelas</option>
            <option v-for="(data, index) in uniqueClasses" :key="index" :value="data">{{ data }}</option>
          </select>
          <select class="form-select" v-model="selectedMapel">
            <option value="" selected disabled>Mapel</option>
            <option v-for="(data, index) in uniqueLesson" :key="index" :value="data.Nama">{{ data.Nama }}</option>
          </select>
        </div>
        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inputModalJurnal"
          :disabled="!selectedMapel">
          tambah data
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" class="text-capitalize">Waktu</th>
              <th scope="col" class="text-capitalize">judul / pembahasan</th>
              <th scope="col" class="text-capitalize">catatan kejadian / solusi</th>
              <th scope="col" class="text-capitalize text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in values" :key="index">
              <td class="text-capitalize" scope="col">{{ data.SK.split('#')[2] }}</td>
              <td class="text-capitalize" scope="col">{{ data.Description }}</td>
              <td class="text-capitalize" scope="col">{{ data.Occurrence }}</td>
              <td class="text-capitalize text-end" scope="col">
                <a href="javascript:;" @click="editItem(data.SK)">
                  <button class="btn btn-sm btn-warning">
                    <i class="bx bx-pencil text-dark mb-0"></i>
                  </button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="btn-group text-center float-end mt-3 mb-5" role="group">
        <button @click="page = 1" :disabled="page === 1" type="button" class="btn btn-primary btn-sm">
          &laquo;
        </button>
        <button @click="page--" :disabled="page === 1" type="button" class="btn btn-primary  btn-sm">
          Prev
        </button>
        <button class="btn btn-dark  btn-sm disabled">{{ `${page ? page : 1}` }}</button>
        <button @click="page++" :disabled="page >= Math.ceil(santri?.length / perPage)" class="btn btn-primary  btn-sm">
          Next
        </button>
        <button @click="page = Math.ceil(santri.length / perPage)" :disabled="page >= Math.ceil(santri.length / perPage)"
          type="button" class="btn btn-primary  btn-sm">
          &raquo;
        </button>
      </div> -->
    </div>
    <JurnalModal />
    <JurnalModalUpdate />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('jurnal', ['datas', 'values', 'schedule']),
    ...mapGetters('jurnal', ['getSelectedMapel', 'getSelectedKelas']),
    selectedMapel: {
      get() {
        return this.getSelectedMapel
      },
      set(value) {
        this.$store.commit('jurnal/setState', { key: 'selectedMapel', value })
      }
    },
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        this.$store.commit('jurnal/setState', { key: 'selectedKelas', value })
      }
    },
    hariIni() {
      const today = new Date();
      const hariIni = today.toLocaleDateString('id-ID', { weekday: 'long' }).toLowerCase();
      return hariIni;
    },
    uniqueClasses() {
      // Get unique classes from data
      const classes = this.datas.map(item => item.Kelas);
      return [...new Set(classes)];
    },
    filteredData() {
      return this.datas.filter(item => {
        const matchesClass = item.Kelas === this.selectedKelas;
        this.selectedMapel = ''
        return matchesClass
      });
    },
    uniqueLesson() {
      return this.filteredData
        // .map(item => {
        //   const hariList = item.Hari.split(", ");
        //   const hariRelevan = hariList.find(hari => hari.includes(this.hariIni));
        //   if (hariRelevan) {
        //     return {
        //       Nama: item.Nama,
        //       SK: item.SK,
        //       Kelas: item.Kelas,
        //       Hari: hariRelevan
        //     };
        //   }
        //   return null;
        // })
        // .filter(item => item !== null); // Remove any null values
    },
    scheduleMapel() {
      return this.uniqueLesson.find((x) => x.Nama === this.selectedMapel)
    },
  },
  watch: {
    selectedKelas(value) {
      this.setState({ key: 'reset', value })
    },
    selectedMapel(value) {
      if (value) {
        this.getData()
      }
    },
    scheduleMapel(value) {
      if (value) {
        this.setState({ key: 'schedule', value })
      }
    }
  },
  methods: {
    ...mapActions('jurnal', ['getData']),
    ...mapMutations('jurnal', ['setState', 'editItem']),
    applyFilter() {
      this.filteredData;
    }
  },
};
</script>

<style scoped>
a {
  font-size: 12px;
}

select {
  font-size: 12px;
  width: max-content !important;
}

.input-group label,
.input-group input,
.input-group i,
.input-group span,
button {
  font-size: 12px;
}

button {
  white-space: nowrap;
}

@media screen and (max-width: 576px) {
  select {
    width: 100% !important;
  }
}
</style>
