<template>
  <div>
    <!-- Modal update -->
    <div class="modal fade hide" id="mutabaahupdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submit" ref="mutabaahupdate">
            <!-- <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Input {{ subject }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> -->
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
                  <div class="input-group">
                    <span class="input-group-text">Halaman</span>
                    <input type="number" name="Page" id="halaman" class="form-control" :value="page">
                  </div>
                </div>
                <div class="mb-3 col">
                  <div class="input-group">
                    <span class="input-group-text">Nilai</span>
                    <input type="number" step="any" name="Score" id="score" class="form-control" :value="updateData?.Score" min='0' max="100">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-floating">
                  <textarea name="Note" id="catatan" class="form-control" v-model="note" placeholder="Leave a comment here" style="height: 100px"></textarea>
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
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    Multiselect
  },
  data() {
    return {
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
      subject: localStorage.getItem('subject')
    }
  },
  computed: {
    ...mapState('mutabaah', ['surah', 'detail', 'updateData']),
    ...mapGetters('mutabaah', ['getSurahFrom', 'getSurahTo', 'getAyatFrom', 'getAyatTo', 'getNote']),
    surahfrom: {
      get() {
        return this.getSurahFrom
      },
      set(value) {
        if (value !== null) {
          this.$store.commit('mutabaah/setSurahFrom', value)
        }
      }
    },
    surahto: {
      get() {
        return this.getSurahTo
      },
      set(value) {
        if (value !== null) {
          this.$store.commit('mutabaah/setSurahTo', value)
        }
      }
    },
    ayatfrom: {
      get() {
        return this.getAyatFrom
      },
      set(value) {
        if ( value !== null ) {
          this.$store.commit('mutabaah/setAyatFrom', value)
        }
      }
    },
    ayatto: {
      get() {
        return this.getAyatTo
      },
      set(value) {
        if ( value !== null ) {
          this.$store.commit('mutabaah/setAyatTo', value)
        }
      }
    },
    note: {
      get() {
        return this.getNote
      },
      set(value) {
        this.$store.commit('mutabaah/setNote', value)
      }
    }
  },
  watch: {
    updateData(value) {
      this.page = value.Page
      // this.changefrom()
      // this.changeto()
    },
    surah(value) {
      this.from = value
    },
    // surahfrom : 'changefrom',
    // surahto: 'changeto',
    ayatto:'countPage',
    ayatfrom: 'countPage'
  },
  methods: {
    countPage() {
      if (this.ayatto.page !== '' && this.ayatfrom.page !== '') {
        this.page = Math.abs(this.ayatfrom.page - this.ayatto.page) + 1
      }
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
        const sk = this.updateData.SK.replace(' ', '%20')
        const sksantri = this.detail.SK.replace('#', '%23')
        const subject = localStorage.getItem('subject')
        const result = await this.$apiSantri.$put(`update-logs?subject=${subject}&sksantri=${sksantri}&sk=${sk}`, data)
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Data berhasil di update",
            showConfirmButton: false,
            timer: 1500,
          });
          this.btn = true
          this.$store.commit('mutabaah/updateDetail', result)
          $('#mutabaahupdate').modal('hide')
          this.$refs.mutabaahupdate.reset()
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

form label {
  font-size: 14px;
}
</style>
