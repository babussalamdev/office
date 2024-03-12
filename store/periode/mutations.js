export default {
    setPeriode(state, value) {
        state.periode = value
    },
    updatePeriode(state, value) {
        state.periode.push(value);
        state.periode.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    updateSubject(state, value) {
        const i = state.periode.findIndex((x) => x.SK === value.key);
        state.periode[i].Status = value.Status
        // state.periode.splice(i, 1);
    },
}