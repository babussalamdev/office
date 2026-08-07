export default {
  setState(state, data) {
    state[data.key] = data.value;
  },
  setSelect(state, value) {
    state.select = value;
    state.santri = [];
  },
};
