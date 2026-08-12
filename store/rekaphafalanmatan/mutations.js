// mutations.js (Keep exactly the same, no changes needed from your original structure)
export default {
  setState(state, data) {
    if (data.key === "details") {
      const sortedData = data.value.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
      state[data.key] = sortedData;
    } else {
      state[data.key] = data.value;
    }
  },

  setMatanList(state, data) {
    state.listMatan = data;
    if (data && data.length > 0) {
      state.selectedMatan = data[0].SK;
    } else {
      state.selectedMatan = "";
    }
  },
};
