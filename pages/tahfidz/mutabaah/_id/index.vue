<template>
  <section id="rekaptahfidz">
    <div class="rekaptahfidz">
      <!-- table -->
      <ModalZiyadah />
      <ModalZiyadahInsert />
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
              <th rowspan="2" class="text-start">Tanggal</th>
              <th colspan="4">Dari</th>
              <th colspan="4">Sampai</th>
              <th rowspan="2">Nilai</th>
              <th rowspan="2">Hal.</th>
              <th rowspan="2">Action</th>
            </tr>
            <tr>
              <th class="text-center">Juz</th>
              <th class="text-center">Surat</th>
              <th class="text-center">Ayat</th>
              <th class="text-center">Halaman</th>
              <th class="text-center">Juz</th>
              <th class="text-center">Surat</th>
              <th class="text-center">Ayat</th>
              <th class="text-center">Halaman</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in detailZiyadah" :key="index">
                <td>{{ data.SK }}</td>
                <td class="text-center">{{ data.From.ayat.juz }}</td>
                <td class="text-center">{{ data.From.name }}</td>
                <td class="text-center">{{ data.From.ayat.number }}</td>
                <td class="text-center">{{ data.From.ayat.page }}</td>
                <td class="text-center">{{ data.To.ayat.juz }}</td>
                <td class="text-center">{{ data.To.name }}</td>
                <td class="text-center">{{ data.To.ayat.number }}</td>
                <td class="text-center">{{ data.To.ayat.page }}</td>
                <td class="text-center">{{ data.Score }}</td>
                <td class="text-center">{{ data.Page }}</td>
                <td class="text-end">
                  <a href="javascript:;" @click="showNote(data.Note)">
                    <i class='bx bx-message-alt-detail text-white btn btn-sm btn-primary'></i>
                  </a>
                  <a href="javascript:;" @click="editItem(data.SK)">
                    <i class="bx bx-pencil text-dark btn btn-sm btn-warning"></i>
                  </a>
                  <a href="#">
                    <i class="bx bx-trash text-white btn btn-sm btn-danger"></i>
                  </a>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2';
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: "mutabaah",
  async asyncData({ store, route, redirect }) {
    const detail = store.state.mutabaah.detail;
    if ( detail === '') {
      return redirect('/tahfidz/mutabaah')
    } else {
      store.dispatch('mutabaah/getDetailZiyadah', route.params.id)
    }
  },
  computed: {
    ...mapState('mutabaah', ['detail', 'detailZiyadah'])
  },
  methods: {
    ...mapMutations('mutabaah', ['editItem']),
    backPage() {
      this.$router.push('/tahfidz/mutabaah')
    },
    showNote(note) {
      Swal.fire({
        showConfirmButton: false,
        text: note
      });
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
