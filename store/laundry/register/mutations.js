export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setPage(state, data) {
    state.listAsrama = data
    state.datas = []
    state.selectedAsrama = ''
  },
  setGetData(state, data) {
    state.datas = data
  },
  setGetDataModal(state, data) {
    // Merging data berdasarkan SK, cuma ambil Name dan SK aja
    const mergedData = data.reduce((acc, item) => {
      // Cek kalau SK sudah ada di accumulator
      if (!acc.some(entry => entry.SK === item.SK)) {
        // Masukin data baru yang cuma ada SK dan Name
        acc.push({ SK: item.SK, Name: item.Name });
      }
      return acc;
    }, []);
    state.datasModal = mergedData
  },
  editRegisterLaundry(state, id) {
    const data = state.datas.find((x) => x.BagID === id)
    if (data.Status === 'active' || data.Status === 'lost') {
      state.updateData = data
      $('#laundryRegisterModal').modal('show')
    }
  },
  resetUpdateData(state) {
    state.updateData = ''
  },
  btn(state) {
    state.btn = !state.btn
  },
  updateData(state, value) {
    const i = state.datas.findIndex((x) => x.BagID === state.updateData.BagID)
    state.datas[i].Status = value.Status
    $('#laundryRegisterModal').modal('hide')
    $('#formRegisterUpdate')[0].reset()
    state.updateData = ''
  },
  updateDataToActive(state, value) {
    const i = state.datas.findIndex((x) => x.BagID === value.SK)
    state.datas[i].Status = value.Status
  },
  addTagToSantri(state, data) {
    if (state.selectedAsrama === state.selectedAsramaModal) {
      const find = state.datas.find((x => x.SK === data.Subject))
      if ( find.BagID === 'santri tidak memiliki tas') {
        console.log('kosong')
      } else {
        console.log('punya satu atau lebih')
      }
      // const count = state.datas.filter(item => item.SK === data.Subject).length;
      // if ( count === 1 )
    }
  }
}
