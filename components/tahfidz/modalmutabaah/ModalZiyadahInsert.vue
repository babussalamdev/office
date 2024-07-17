<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="ziyadah" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <form @submit.prevent="submit" ref="ziyadah">

            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="mb-3 col-12 col-md-8"><label class="typo__label mb-2">Surat From</label>
                  <multiselect style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 16px; font-weight: 600"
                    v-model="surahfrom" :options="from" placeholder="Select one" label="name" track-by="name">
                  </multiselect>
                </div>
                <div class="mb-3 col-12 col-md-4"><label class="typo__label mb-2">Ayat from</label>
                  <multiselect v-model="ayatfrom" :options="surahfrom?.ayat" placeholder="Select one" label="number"
                    track-by="number"></multiselect>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-12 col-md-8"><label class="typo__label mb-2">Surat To</label>
                  <multiselect style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 16px; font-weight: 600"
                    v-model="surahto" :options="from" placeholder="Select one" label="name" track-by="name">
                  </multiselect>
                </div>
                <div class="mb-3 col-12 col-md-4"><label class="typo__label mb-2">Ayat To</label>
                  <multiselect v-model="ayatto" :options="surahto?.ayat" placeholder="Select one" label="number"
                    track-by="number"></multiselect>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col">
                  <label for="halaman" class="form-label">Halaman</label>
                  <input type="number" name="Page" id="halaman" class="form-control" :value="page">
                </div>
                <div class="mb-3 col">
                  <label for="score" class="form-label">Nilai</label>
                  <input type="number" name="Score" id="score" class="form-control" value="0">
                </div>
              </div>
              <div class="mb-3">
                <label for="catatan" class="form-label">Catatan</label>
                <textarea name="Note" id="catatan" class="form-control"></textarea>
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
      btn: true
    }
  },
  computed: {
    ...mapState('mutabaah', ['surah', 'detail'])
  },
  watch: {
    surah(value) {
      this.from = value
    },
    surahfrom : 'changefrom',
    surahto: 'changeto',
    ayatto(value) {
      if (this.ayatfrom.page !== '' && value.page !== '') {
        this.page = Math.abs(this.ayatfrom.page - this.ayatto.page) + 1
      }
    },
    ayatfrom(value) {
      if (this.ayatto.page !== '' && value.page !== '') {
        this.page = Math.abs(this.ayatfrom.page - this.ayatto.page) + 1
      }
    }
  },
  methods: {
    changefrom(){
      if(this.updateData){
        this.ayatfrom = this.updateData.From.ayat
      }else{
        if (this.surahfrom !== null) {
        this.ayatfrom = { number: '', page: '', juz: '' }
      } else {
        this.surahfrom = { name: '', ayat: [] }
      }
      }
    },
    changeto(){
      if(this.updateData){
        this.ayatto = this.updateData.To.ayat
      }else{
        if (this.surahto !== null) {
        this.ayatto = { number: '', page: '', juz: '' }
      } else {
        this.surahto = { name: '', ayat: [] }
      }
      }
    },
    nameWithLang({ name, language }) {
      return `${name} — [${language}]`
    },
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
      try {
        const result = await this.$apiSantri.$post(`input-logs?subject=halaqah&sk=${this.detail.SK.replace('#', '%23')}`, data)
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
          $('#ziyadah').modal('hide')
          this.$refs.ziyadah.reset()
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
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap');
</style>
