export default {
    setkaldik(state, value) {
        state.kaldik = value
    },
    updatekaldik(state, value) {
        state.kaldik.push(value);
        state.kaldik.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    deleteMapel(state, value) {
        const i = state.mapel.findIndex((x) => x.SK === value);
        state.mapel.splice(i, 1);
    },
}