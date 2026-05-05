export default {
  setState(state, data) {
    if (data.key === "asrama") {
      state[data.key] = data.value;
      state.values = [];
      state.selectedAsrama = ""; // Important to reset selected class when list changes
    } else if (data.key === "selectedAsrama") {
      state[data.key] = data.value;
      state.values = [];
    } else {
      state[data.key] = data.value;
    }
  },
  setPage(state, data) {
    state.datas = data;
  },
  editItem(state, data) {
    console.log(data);
    const i = state.datas.findIndex((x) => x.SK === data.SK);
    console.log(i);
    state.datas[i].DendaLaundry = data.DendaLaundry;
  },
};
