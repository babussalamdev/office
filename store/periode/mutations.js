export default {
    setPeriode(state, value) {
        state.periode = value
    },
    updatePeriode(state, value) {
        state.periode.push(value);
        state.periode.sort((a, b) => {
            return a.Sort - b.Sort;
        });

        $("#inputUtama")[0].reset()
        $("#InputDataUtama").modal("hide");
    },
    updateSubject(state, value) {
        const sk = value.key.replace('%23', '#')
        const i = state.periode.findIndex((x) => x.SK === sk);
        state.periode[i].Status = value.Status
        // state.periode.splice(i, 1);
    },

    // partikel
    btn(state) {
      state.btn = state.btn ? false : true
    }
}
