<template>
  <div>
    <!-- Modal -->
    <div class="modal fade hide" id="mutabaah" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submit" ref="mutabaah">
            <!-- <div class="modal-header">
              <h3 class="modal-title fs-5" id="staticBackdropLabel">Input {{ subject }}</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> -->
            <div class="modal-body">
              <div class="row">
                <div class="mb-3 col-8"><label class="typo__label mb-2">Surat From</label>
                  <multiselect style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 16px; font-weight: 600"
                    v-model="surahfrom" :options="from" placeholder="Select one" label="name" track-by="name">
                  </multiselect>
                </div>
                <div class="mb-3 col-4"><label class="typo__label mb-2">Ayat from</label>
                  <multiselect v-model="ayatfrom" :options="surahfrom?.ayat" placeholder="Select one" label="number"
                    track-by="number"></multiselect>
                </div>

                <div class="mb-3 col-8"><label class="typo__label mb-2">Surat To</label>
                  <multiselect style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 16px; font-weight: 600;"
                    v-model="surahto" :options="from" placeholder="Select one" label="name" track-by="name">
                  </multiselect>
                </div>
                <div class="mb-3 col-4"><label class="typo__label mb-2">Ayat To</label>
                  <multiselect v-model="ayatto" :options="surahto?.ayat" placeholder="Select one" label="number"
                    track-by="number"></multiselect>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col">
                  <div class="input-group">
                    <span class="input-group-text">Halaman</span>
                    <input type="number" name="Page" id="halaman" class="form-control" :value="page">
                  </div>
                </div>
                <div class="mb-3 col">
                  <div class="input-group">
                    <span class="input-group-text">Nilai</span>
                    <input type="number" name="Score" id="score" class="form-control" value="0" max="100" min="0">
                  </div>
                </div>
              </div>
              <div>
                <div class="form-floating">
                  <textarea name="Note" id="catatan" class="form-control" placeholder="Leave a comment here"
                    style="height: 100px"></textarea>
                  <label for="catatan">Catatan</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span>
                <button v-if="btn" type="submit" class="btn btn-primary">Save</button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </button>
              </span>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Multiselect from 'vue-multiselect'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      surahfrom: { name: '', ayat: [] },
      surahto: { name: '', ayat: [] },
      ayatfrom: { number: '', page: '', juz: '' },
      ayatto: { name: '', page: '', juz: '' },
      from: [
        {
          name: "", ayat: [
            {
              "number": '',
              "page": '',
              "juz": ''
            }],
        }
      ],
      page: 0,
      btn: true,
      subject: localStorage.getItem('subject'),
    }
  },
  computed: {
    ...mapState('mutabaah', ['surah', 'detail']),
  },
  watch: {
    surah(value) {
      this.from = value
    },
    surahfrom(value) {
      if (value !== null) {
        this.ayatfrom = { number: '', page: '', juz: '' }
      } else {
        this.surahfrom = { name: '', ayat: [] }
      }
      this.surahto = value
    },
    surahto(value) {
      if (value !== null) {
        this.ayatto = { number: '', page: '', juz: '' }
      } else {
        this.surahto = { name: '', ayat: [] }
      }
    },
    ayatto(value) {
      if (value !== null) {
        if (this.ayatfrom.page !== '' && value.page !== '') {
          this.page = Math.abs(this.ayatfrom.page - this.ayatto.page) + 1
        }
      }
    },
    ayatfrom(value) {
      if (value !== null) {
        if (this.ayatto.page !== '' && value.page !== '') {
          this.page = Math.abs(this.ayatfrom.page - this.ayatto.page) + 1
        }
      }
      this.ayatto = value
    }
  },
  methods: {
    async submit(event) {
      this.btn = false
      const data = Object.fromEntries(new FormData(event.target))
      const from = {
        name: this.surahfrom.name,
        ayat: this.ayatfrom
      }
      const to = {
        name: this.surahto.name,
        ayat: this.ayatto
      }
      data['Page'] = +data.Page
      data['Score'] = +data.Score
      data['From'] = from
      data['To'] = to

      const { Page, Score, Note, From, To } = data;
      const { name: fromName, ayat: fromAyat } = From;
      const { name: toName, ayat: toAyat } = To;

      // Cek apakah salah satu data kosong
      if (
        Page === 0 ||
        fromName === "" ||
        fromAyat.number === "" ||
        fromAyat.page === "" ||
        fromAyat.juz === "" ||
        toName === "" ||
        toAyat.name === "" ||
        toAyat.page === "" ||
        toAyat.juz === ""
      ) {
        Swal.fire({
          text: 'Data tidak boleh kosong!',
          icon: "error",
          timer: 3000,
          timerProgressBar: false,
          showConfirmButton: false,
        });
        this.btn = true
        return
      }

      // Jika semua data valid, lanjutkan dengan proses
      try {
        const program = localStorage.getItem('program')
        const sk = this.detail.SK.replace('#', '%23')
        const kelas = this.detail.Kelas
        const subject = localStorage.getItem('subject')
        const tahun = this.$auth.user.Label
        const semester = this.$auth.user.Semester
        const halaqah = this.$auth.user.Halaqah[program]
        const result = await this.$apiSantri.$post(`input-logs?kls=${kelas}&subject=${subject}&sksantri=${sk}&halaqah=${halaqah}&thn=${tahun}&smstr=${semester}`, data)
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil di input",
            showConfirmButton: false,
            timer: 1500,
          });
          this.btn = true
          this.$store.commit('mutabaah/pushDetail', result)
          $('#mutabaah').modal('hide')
          this.$refs.mutabaah.reset()
          this.surahfrom = { name: '', ayat: [] }
          this.surahto = { name: '', ayat: [] }
          this.ayatfrom = { number: '', page: '', juz: '' }
          this.ayatto = { name: '', page: '', juz: '' }
          this.page = 0
        }
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: error,
          showConfirmButton: false,
          timer: 1500,
        });
        this.btn = true
      }
    },
    onKeyboardShow() {
      // Menggeser tampilan atau mengubah gaya saat keyboard muncul
      console.log('berhasil')
      document.body.style.paddingBottom = '3000px'; // Ubah sesuai kebutuhan
    },
    onKeyboardHide() {
      // Mengembalikan gaya saat keyboard tersembunyi
      document.body.style.paddingBottom = '0';
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap');

label {
  font-size: 14px;
}

.multiselect .multiselect__content-wrapper {
  max-height: 150px !important;
}
</style>
