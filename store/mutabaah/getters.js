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
  getSurahFrom(state) {
    let data = { name: '', ayat: [] }
    if ( state.updateData ) {
      data = state.surah.find(x => x.name === state.updateData?.From?.name)
    }
    return data
  },
  getSurahTo(state) {
    let data = { name: '', ayat: [] }
    if ( state.updateData ) {
      data = state.surah.find(x => x.name === state.updateData?.To?.name)
    }
    return data
  },
  getAyatFrom(state) {
    let data = { number: '', page: '', juz: '' }
    if ( state.updateData ) {
      data = state.updateData?.From?.ayat
    }
    return data
  },
  getAyatTo(state) {
    let data = { number: '', page: '', juz: '' }
    if ( state.updateData ) {
      data = state.updateData?.To?.ayat
    }
    return data
  },
  getNote(state) {
    return state.updateData.Note
  },
  getSelectedHalaqah(state) {
    return state.selectedHalaqah
  }
}
