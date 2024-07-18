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
            Data {{ subject }} - <b>{{ detail.Nama }}</b>
          </h2>
        </div>
        <div class="col-12 col-md-3 d-flex justify-content-end">
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mutabaah">
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
            <tr v-for="(data, index) in detailMutabaah" :key="index">
              <td>{{ data.SK }}</td>
              <td class="text-center">{{ data.From.ayat.juz }}</td>
              <td class="text-center" style="font-family: 'Noto Kufi Arabic', sans-serif;">{{ data.From.name }}</td>
              <td class="text-center">{{ data.From.ayat.number }}</td>
              <td class="text-center">{{ data.From.ayat.page }}</td>
              <td class="text-center">{{ data.To.ayat.juz }}</td>
              <td class="text-center" style="font-family: 'Noto Kufi Arabic', sans-serif;">{{ data.To.name }}</td>
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
                <a href="javascript:;" @click="deleteItem(data.SK)">
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
  data() {
    return {
      subject: localStorage.getItem('subject')
    }
  },
  async asyncData({ store, route, redirect }) {
    const detail = store.state.mutabaah.detail;
    if (detail === '') {
      return redirect('/tahfidz/mutabaah')
    } else {
      store.dispatch('mutabaah/getDetail', route.params.id )
    }
  },
  computed: {
    ...mapState('mutabaah', ['detail', 'detailMutabaah'])
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
    },
    async deleteItem(sk) {
      const i = this.detailMutabaah.findIndex((x) => x.SK === sk)
      const data = this.detailMutabaah[i]
      const skSantri = data.PK.replace(/#/g, '%23')
      const result = await Swal.fire({
        title: data.SK,
        text: "Data akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const subject = localStorage.getItem('subject')
        const result = await this.$apiSantri.$delete(
          `delete-logs?subject=${subject}&sksantri=${skSantri}&createdat=${data.SK}`
        );
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil dihapus!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$store.commit('mutabaah/deleteDetail', data.SK);
        }
      }
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/santri/santri.css);
@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap');

i {
  cursor: pointer;
}

/* tr th {
  border: 1px solid white !important;
} */
</style>
