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
        const updatedData = state.santri.map(item => {
            // Cari objek dalam state.santri yang memiliki SK yang sama dengan yang ada di data.sort
            if (data.sort.includes(item.SK)) {
                // Salin objek agar tidak memodifikasi state langsung
                const updatedItem = { ...item };
                // Perbarui nilai 'Kelas' dari objek yang ditemukan
                updatedItem['Kelas'] = data.value;
                return updatedItem;
            }
            return item; // Kembalikan objek tanpa modifikasi jika tidak ada yang sesuai
        });

        // Perbarui state dengan data yang diperbarui
        state.santri = updatedData;
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