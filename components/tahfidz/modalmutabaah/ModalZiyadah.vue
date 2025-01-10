<template>
  <div>
    <!-- Modal update -->
    <div class="modal fade hide" id="mutabaahupdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submitUpdate" id="mutabaahupdatemodal">
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
                    <input type="number" name="Page" id="halaman" class="form-control" :value="pageupdate" readonly>
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
                  <textarea name="Note" id="catatan" class="form-control" :value="updateData?.Note" placeholder="Leave a comment here" style="height: 100px"></textarea>
                  <label for="catatan">Catatan</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetModalUpdate()">Close</button>
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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
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
      subject: localStorage.getItem('subject')
    }
  },
  computed: {
    ...mapState('mutabaah', ['surah', 'detail', 'updateData', 'pageupdate', 'btn']),
    ...mapGetters('mutabaah', ['getSurahFrom', 'getSurahTo', 'getAyatFrom', 'getAyatTo', 'getNote']),
    surahfrom: {
      get() {
        return this.getSurahFrom
      },
      set(value) {
        this.$store.commit('mutabaah/setSurahFrom', value)
      }
    },
    surahto: {
      get() {
        return this.getSurahTo
      },
      set(value) {
        this.$store.commit('mutabaah/setSurahTo', value)
      }
    },
    ayatfrom: {
      get() {
        return this.getAyatFrom
      },
      set(value) {
        this.$store.commit('mutabaah/setAyatFrom', value)
      }
    },
    ayatto: {
      get() {
        return this.getAyatTo
      },
      set(value) {
        this.$store.commit('mutabaah/setAyatTo', value)
      }
    },
  },
  watch: {
    updateData(value) {
      if (value) {
        this.surahfrom = this.surah.find(x => x.name === this.updateData?.From?.name)
        this.ayatfrom = this.updateData?.From?.ayat
        this.surahto = this.surah.find(x => x.name === this.updateData?.To?.name)
        this.ayatto = this.updateData?.To?.ayat
      }
    },
    surah(value) {
      this.from = value
    },
  },
  methods: {
    ...mapActions('mutabaah', ['submitUpdate']),
    ...mapMutations('mutabaah', ['resetModalUpdate']),
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap');

form label {
  font-size: 14px;
}
</style>
