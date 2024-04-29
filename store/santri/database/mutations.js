export default {
    setDatabase(state, value) {
        state.santri = value.Santri
    },
    inputSantriBulk(state, value) {
        state.santri = [...state.santri, ...value];
        state.santri.sort((a, b) => {
            return a.Nama - b.Nama;
        });
    },
    inputSantriSingle(state, value) {
        state.santri.push(value)
        state.santri.sort((a, b) => {
            return a.Nama - b.Nama;
        });
    },
    updateSantri(state, value) {
        const i = state.santri.findIndex((x) => x.SK === value.SK)

        const data = state.santri[i]
        data.Nama = value.Nama;
        data.Nisn = value.Nisn;
        data.Orangtua = value.Orangtua;
        data.Alamat = value.Alamat;


        // if (i !== -1) {
        //     state.mapel[i] = { ...state.mapel[i], ...value };
        // }
    },
    deleteSantri(state, value) {
        const i = state.santri.findIndex((x) => x.SK === value);
        state.santri.splice(i, 1);
    },
}