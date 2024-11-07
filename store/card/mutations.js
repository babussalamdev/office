export default {
  SET_STATE(state, data) {
    state[data.key] = data.value
  },
  DELETE_ITEM(state, data) {
    const i = state.santri.findIndex((x) => x.CNC === data)
    state.santri.splice(i, 1)
  },
  INPUT_CARD(state, data) {
    console.log(data)
  }
}
