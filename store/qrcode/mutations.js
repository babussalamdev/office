export default {
  SET_STATE(state, data) {
    state[data.key] = data.value
  },
  DELETE_ITEM(state, data) {
    const i = state.santri.findIndex((x) => x.CNC === data)
    state.santri.splice(i, 1)
  },
  INPUT_CARD(state, data) {
    const transformedData = data.map(item => ({
      Nama: "Kartu belum dikaitkan",
      Kelas: "empty",
      CNC: item.SK,
      cardName: item.Name,
      SK: "empty"
    }));

    state.santri.push(transformedData)
  }
}
