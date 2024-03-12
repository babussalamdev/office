export default {
    setMapel(state, value) {
        state.mapel = value
    },
    updateMapel(state, value) {
        state.mapel.push(value);
        state.mapel.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    deleteMapel(state, value) {
        const i = state.mapel.findIndex((x) => x.SK === value);
        state.mapel.splice(i, 1);
    },
}