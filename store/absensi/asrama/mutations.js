export default {
    setkaldik(state, value) {
        state.kaldik = value
    },
    inputKaldik(state, value) {
        state.kaldik.push(value);
        state.kaldik.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },

    updateKaldik(state, value) {
        const i = state.kaldik.findIndex((x) => x.SK === value.SK)

        const data = state.kaldik[i]
        data.Nama = value.Nama
        data.Mulai = value.Mulai
        data.Berakhir = value.Berakhir
        data.Warna = value.Warna
    },
    deleteKaldik(state, value) {
        const i = state.kaldik.findIndex((x) => x.SK === value);
        state.kaldik.splice(i, 1);
    },
}