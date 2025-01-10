<template>
  <div>
    <!-- Modal -->
    <div class="modal fade hide" id="mutabaah" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submit" id="mutabaahForm">
            <!-- <div class="modal-header">
              <h3 class="modal-title fs-5" id="staticBackdropLabel">Input {{ subject }}</h3>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> -->
            <div class="modal-body">
              <div class="row">
                <div class="mb-3 col-8"><label class="typo__label mb-2">Surat From</label>
                  <multiselect style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 16px; font-weight: 600"
                    v-model="surahfrom" :options="surah" placeholder="Select one" label="name" track-by="name">
                  </multiselect>
                </div>
                <div class="mb-3 col-4"><label class="typo__label mb-2">Ayat from</label>
                  <multiselect v-model="ayatfrom" :options="surahfrom?.ayat" placeholder="Select one" label="number"
                    track-by="number"></multiselect>
                </div>

                <div class="mb-3 col-8"><label class="typo__label mb-2">Surat To</label>
                  <multiselect style="font-family: 'Noto Kufi Arabic', sans-serif; font-size: 16px; font-weight: 600;"
                    v-model="surahto" :options="surah" placeholder="Select one" label="name" track-by="name">
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
                    <input type="number" name="Page" id="halaman" class="form-control" :value="page" readonly>
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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      subject: localStorage.getItem('subject'),
    }
  },
  computed: {
    ...mapState('mutabaah', ['detail', 'page', 'btn']),
    ...mapGetters('mutabaah', ['getSurah', 'GET_SURAH_FROM', 'GET_SURAH_TO', 'GET_AYAT_FROM', 'GET_AYAT_TO']),

    surah: {
      get() {
        return this.getSurah
      },
    },
    surahfrom: {
      get() {
        return this.GET_SURAH_FROM
      },
      set(value) {
        this.$store.commit('mutabaah/SET_SURAH_FROM', value)
      }
    },
    ayatfrom: {
      get() {
        return this.GET_AYAT_FROM
      },
      set(value) {
        this.$store.commit('mutabaah/SET_AYAT_FROM', value)
      }
    },
    surahto: {
      get() {
        return this.GET_SURAH_TO
      },
      set(value) {
        this.$store.commit('mutabaah/SET_SURAH_TO', value)
      }
    },
    ayatto: {
      get() {
        return this.GET_AYAT_TO
      },
      set(value) {
        this.$store.commit('mutabaah/SET_AYAT_TO', value)
      }
    }
  },
  methods: {
    ...mapActions('mutabaah', ['submit']),
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
