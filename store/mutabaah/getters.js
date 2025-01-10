export default {
  getKelas(state) {
    return state.kelas
  },
  getAsramaShow(state) {
    return state.asramaShow
  },
  getUpdateData(state) {
    surahfrom = { name: '', ayat: [] }
    surahto = { name: '', ayat: [] }
    ayatfrom = { number: '', page: '', juz: '' }
    ayatto = { name: '', page: '', juz: '' }

    return state.updateData
  },

  // insert
  getSurah(state) {
    return state.surah
  },
  GET_SURAH_FROM(state) {
    return state.surahfrom
  },
  GET_AYAT_FROM(state) {
    return state.ayatfrom
  },
  GET_SURAH_TO(state) {
    return state.surahto
  },
  GET_AYAT_TO(state) {
    return state.ayatto
  },


  // update
  getSurahFrom(state) {
    return state.surahfromupdate
  },
  getSurahTo(state) {
    return state.surahtoupdate
  },
  getAyatFrom(state) {
    return state.ayatfromupdate
  },
  getAyatTo(state) {
    return state.ayattoupdate
  },
  getSelectedHalaqah(state) {
    return state.selectedHalaqah
  }
}
