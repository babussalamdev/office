export default {
  setState(state, data) {
    if (data.key === "details") {
      const sortedData = data.value.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
      state[data.key] = sortedData;
    } else {
      state[data.key] = data.value;
    }
  },

  // ADDED: Mutation specifically for the Matan List
  setMatanList(state, data) {
    state.listMatan = data;
    // Auto-select the first matan if available
    if (data.length > 0) {
      state.selectedMatan = data[0].SK;
    } else {
      state.selectedMatan = "";
    }
  },
};
