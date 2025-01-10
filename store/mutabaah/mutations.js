export default {

  setSantri(state, value) {
    state.santri = value
  },
  btn(state, value) {
    state.btn = !state.btn
  },

  // mutabaah details
  showDetail(state, value) {
    localStorage.setItem("subject", value.subject);
    const i = state.santri.findIndex((x) => x.SK === value.sk)
    state.detail = state.santri[i]
    this.$router.push(`/tahfidz/mutabaah/${value.sk.replace('#', '%23')}`)
  },
  setSurah(state, value) {
    state.surah = value
  },
  setDetailSantri(state, value) {
    state.detailMutabaah = value
  },
  pushDetail(state, value) {
    state.detailMutabaah.unshift(value)
    $('#mutabaah').modal('hide')
    $('#mutabaahForm')[0].reset()
    state.surahfrom = { name: '', ayat: [] }
    state.surahto = { name: '', ayat: [] }
    state.ayatfrom = { number: '', page: '', juz: '' }
    state.ayatto = { name: '', page: '', juz: '' }
    state.page = 0
  },
  editItem(state, value) {
    const i = state.detailMutabaah.findIndex((x) => x.SK === value)
    state.updateData = state.detailMutabaah[i]
    if (state.updateData) {
      $('#mutabaahupdate').modal('show')
    }
    // state.mt++
  },
  updateDetail(state, value) {
    const i = state.detailMutabaah.findIndex((x) => x.SK === value.SK);
    const updatedSantri = state.detailMutabaah.map((item, index) => {
      if (index === i) {
        return { ...item, ...value };
      }
      return item;
    });
    state.detailMutabaah = updatedSantri

    $('#mutabaahupdate').modal('hide')
    $('#mutabaahupdatemodal')[0].reset()

  },
  deleteDetail(state, value) {
    const i = state.detailMutabaah.findIndex((x) => x.SK === value)
    state.detailMutabaah.splice(i, 1)
  },

  // modalinsert
  SET_SURAH_FROM(state, value) {
    if (value !== null) {
      state.surahfrom = value
      state.surahto = value
      state.ayatfrom = { number: '', page: '', juz: '' }
      state.ayatto = { number: '', page: '', juz: '' }
    } else {
      state.surahfrom = { name: '', ayat: [] }
      state.surahto = { name: '', ayat: [] }
      state.ayatfrom = { number: '', page: '', juz: '' }
      state.ayatto = { number: '', page: '', juz: '' }
      state.page = 0
    }
  },
  SET_AYAT_FROM(state, value) {
    if (value !== null) {
      state.ayatto = value
      state.ayatfrom = value
      if (state.ayatto.page !== '' && value.page !== '') {
        state.page = Math.abs(state.ayatfrom.page - state.ayatto.page) + 1
      }
    } else {
      state.ayatfrom = { number: '', page: '', juz: '' }
      state.ayatto = { number: '', page: '', juz: '' }
      state.page = 0
    }
  },
  SET_SURAH_TO(state, value) {
    if (value !== null) {
      state.ayatto = { number: '', page: '', juz: '' }
      state.surahto = value
    } else {
      state.surahto = { name: '', ayat: [] }
      state.ayatto = { number: '', page: '', juz: '' }
      state.page = 0
    }
  },
  SET_AYAT_TO(state, value) {
    if (value !== null) {
      state.ayatto = value
      if (state.ayatfrom.page !== '' && value.page !== '') {
        state.page = Math.abs(state.ayatfrom.page - state.ayatto.page) + 1
      }
    } else {
      state.ayatto = { number: '', page: '', juz: '' }
      state.page = 0
    }
  },

  // modalziyadah
  setSurahFrom(state, value) {
    if (value !== null) {
      state.surahfromupdate = value
      state.surahtoupdate = value
      state.ayatfromupdate = { number: '', page: '', juz: '' }
      state.ayattoupdate = { number: '', page: '', juz: '' }
      state.pageupdate = 0
    } else {
      state.surahfromupdate = { name: '', ayat: [] }
      state.surahtoupdate = { name: '', ayat: [] }
      state.ayatfromupdate = { number: '', page: '', juz: '' }
      state.ayattoupdate = { number: '', page: '', juz: '' }
      state.pageupdate = 0
    }

  },
  setSurahTo(state, value) {
    if (value !== null) {
      state.ayattoupdate = { number: '', page: '', juz: '' }
      state.surahtoupdate = value
      state.pageupdate = 0
    } else {
      state.surahtoupdate = { name: '', ayat: [] }
      state.ayattoupdate = { number: '', page: '', juz: '' }
      state.pageupdate = 0
    }
  },
  setAyatFrom(state, value) {
    if (value !== null) {
      state.ayattoupdate = value
      state.ayatfromupdate = value
      if (state.ayattoupdate.page !== '' && value.page !== '') {
        state.pageupdate = Math.abs(state.ayatfromupdate.page - state.ayattoupdate.page) + 1
      }
    } else {
      state.ayatfromupdate = { number: '', page: '', juz: '' }
      state.ayattoupdate = { number: '', page: '', juz: '' }
      state.pageupdate = 0
    }
  },
  setAyatTo(state, value) {
    if (value !== null) {
      state.ayattoupdate = value
      if (state.ayatfromupdate.page !== '' && value.page !== '') {
        state.pageupdate = Math.abs(state.ayatfromupdate.page - state.ayattoupdate.page) + 1
      }
    } else {
      state.ayattoupdate = { number: '', page: '', juz: '' }
      state.pageupdate = 0
    }
  },
  resetModalUpdate(state) {
    state.surahfromupdate = { name: '', ayat: [] }
    state.surahtoupdate = { name: '', ayat: [] }
    state.ayatfromupdate = { number: '', page: '', juz: '' }
    state.ayattoupdate = { number: '', page: '', juz: '' }
    state.pageupdate = 0
    state.updateData = ''
  },
  setNote(state, value) {
    state.updateData.Note = value
  },
  setHalaqah(state, data) {
    state.listHalaqah = data.resultDua
    state.santri = data.result
    state.selectedHalaqah = data.result.MainHalaqah
  },
  setState(state, data) {
    state[data.key] = data.value
  }
}
