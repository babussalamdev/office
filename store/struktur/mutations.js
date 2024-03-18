export default {
    setStruktur(state, value) {
        state.struktur = value
    },
    inputStruktur(state, value) {
        state.struktur.push(value);
        state.struktur.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    updateStruktur(state, value) {
        const i = state.struktur.findIndex((x) => x.SK === value.SK)

        const data = state.struktur[i];
        data.Sort = value.Sort;
        data.Nama = value.Nama
        data.Permissions = value.Permissions


        // if (i !== -1) {
        //     state.mapel[i] = { ...state.mapel[i], ...value };
        // }
    },
    deleteStruktur(state, value) {
        const i = state.struktur.findIndex((x) => x.SK === value);
        state.struktur.splice(i, 1);
    },
}