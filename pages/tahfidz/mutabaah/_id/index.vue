<template>
  <section id="rekaptahfidz">
    <div class="rekaptahfidz">
      <!-- table -->
      <ModalZiyadah />
      <div class="row mb-3">
        <div class="col-12 col-md-9 d-flex align-items-center">
          <i class="bi bi-arrow-left bg-primary p-2 rounded-circle text-white cursor-pointer" @click="backPage"></i>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-12 col-md-9 d-flex align-items-center">
          <h2 class="text-capitalize mb-3 mb-md-0">
            Data Ziyadah - <b>{{ detail.Nama }}</b>
          </h2>
        </div>
        <div class="col-12 col-md-3 d-flex justify-content-end">
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#ziyadah">
            Tambah
          </button>
        </div>
      </div>
      <div class="table-responsive animate__animated animate__fadeInUp">
        <table class="table table-hover table-striped table-bordered border-danger">
          <thead>
            <tr>
              <th rowspan="2" class="text-start">Nama</th>
              <th colspan="4">Dari</th>
              <th colspan="5">Sampai</th>
              <th rowspan="2">Nilai</th>
              <th rowspan="2">Hal.</th>
              <th rowspan="2">Action</th>
            </tr>
            <tr>
              <th>Juz</th>
              <th>Surat</th>
              <th>Ayat</th>
              <th>Halaman</th>
              <th>Juz</th>
              <th>Surat</th>
              <th>Ayat</th>
              <th>Halaman</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(data, index) in kaldik" :key="index">
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
              </tr> -->
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: "mutabaah",
  async asyncData({ store, route, redirect }) {
    const detail = store.state.mutabaah.detail;
    if ( detail === '') {
      return redirect('/tahfidz/mutabaah')
    } else {
      store.dispatch('mutabaah/getDetailZiyadah', route.params.id.toUpperCase())
    }
  },
  computed: {
    ...mapState('mutabaah', ['detail'])
  },
  methods: {
    backPage() {
      this.$router.push('/tahfidz/mutabaah')
    }
  },
};
</script>

<style scoped>
@import url(~/assets/css/santri/santri.css);
i {
  cursor: pointer;
}
/* tr th {
  border: 1px solid white !important;
} */
</style>
