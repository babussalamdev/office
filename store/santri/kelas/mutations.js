export default {
    setDatabase(state, value) {
        state.santri = value.Santri
        state.select = value.Select
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
    updateKelasSantri(state, data) {
        const updatedData = state.santri.map((item, index) => {
            const key = data.sort.map((sk) => {
                const i = state.santri.findIndex((x) => x.SK === sk)
                const datas = state.santri[i];
                datas['Kelas'] = data.value
                if (index === i) {
                    return data;
                }
                return item;
            })
            return key
        });
        console.log(updatedData)

        state.mapel = updatedData
    },
    setPengajar(state, value) {
        const i = state.mapel.findIndex((x) => x.SK === value.SK)
        const data = state.mapel[i];
        data['GSIPK1'] = value.GSIPK1

        const updatedData = state.mapel.map((item, index) => {
            if (index === i) {
                return data;
            }
            return item;
        });

        state.mapel = updatedData
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