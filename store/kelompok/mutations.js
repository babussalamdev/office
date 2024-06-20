export default {
    setDataHalaqah(state, value) {
        state.halaqah = value
    },
    setDataAsrama(state, value) {
        state.asrama = value
    },
    updateHalaqah(state, value) {
        state.halaqah.push(value);
        state.halaqah.sort((a, b) => {
            return a.Sort - b.Sort;
        });

        $("#inputHalaqah")[0].reset()
        $("#InputDataHalaqoh").modal("hide");
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

        $("#inputAsrama")[0].reset()
        $("#InputDataAsrama").modal("hide");

    },
    deleteAsrama(state, value) {
        const i = state.asrama.findIndex((x) => x.SK === value);
        state.asrama.splice(i, 1);
    },

    // partikel
    btn(state) {
      state.btn = state.btn ? false : true
    },
}
