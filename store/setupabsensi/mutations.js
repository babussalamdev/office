export default {
    setAbsensi(state, value) {
        state.absensi = value.absensi
        state.struktur = value.struktur
    },
    inputStruktur(state, value) {
        state.absensi.push(value);
        state.absensi.sort((a, b) => {
            return a.Sort - b.Sort;
        });
    },
    deleteStruktur(state, value) {
        const i = state.absensi.findIndex((x) => x.SK === value);
        state.absensi.splice(i, 1);
    },
    updateStruktur(state, value) {
        const i = state.absensi.findIndex((x) => x.SK === value.SK)

        const data = state.absensi[i];
        data.Nama = value.Nama
        data.Permissions = value.Permissions
    },
}