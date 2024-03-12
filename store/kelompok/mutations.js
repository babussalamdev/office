export default {
    setData(state, value) {
        state.halaqah = value.halaqah
        state.asrama = value.asrama
    },
    updateHalaqah(state, value) {
        state.halaqah.push(value);
        state.halaqah.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    deleteHalaqah(state, value) {
        const i = state.halaqah.findIndex((x) => x.SK === value);
        state.halaqah.splice(i, 1);
    },
    updateAsrama(state, value) {
        state.asrama.push(value);
        state.asrama.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    deleteAsrama(state, value) {
        const i = state.asrama.findIndex((x) => x.SK === value);
        state.asrama.splice(i, 1);
    },
}