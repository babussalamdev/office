export default {
  setState(state, data) {
    state[data.key] = data.value;
  },
  setEkskullOptions(state, value) {
    state.ekskullOptions = value;
    state.santri = [];
  },
};
