export default {
    setDatabaseAll(state, value) {
        state.pegawai = value
    },
    setDatabase(state, value) {
        state.pegawai = value.pegawai
        state.jabatan = value.jabatan
    },
    inputSantriBulk(state, value) {
        state.santri = [...state.santri, ...value];
        state.santri.sort((a, b) => {
            return a.Nama - b.Nama;
        });
    },
    inputPegawaiSingle(state, value) {
        state.pegawai.push(value)
        state.pegawai.sort((a, b) => {
            return a.Nama - b.Nama;
        });
    },
    updatePegawai(state, value) {
        const i = state.pegawai.findIndex((x) => x.SK === value.SK)

        const data = state.pegawai[i]
        data.Nama = value.Nama;
        data.Lulusan = value.Lulusan;
        data.Nip = value.Nip;
        data.Program = value.Program;


        // if (i !== -1) {
        //     state.mapel[i] = { ...state.mapel[i], ...value };
        // }
    },
    updatePegawaiJabatan(state, value) {
        const i = state.pegawai.findIndex((x) => x.SK === value.SK)

        const data = state.pegawai[i]
        data.Jabatan = value.Jabatan


        // if (i !== -1) {
        //     state.mapel[i] = { ...state.mapel[i], ...value };
        // }
    },

    updateSubject(state, value) {
        const i = state.pegawai.findIndex((x) => x.SK === value.key);
        state.pegawai[i].Status = value.Status
    },

    // on off
    setStatusPengajar(state, data) {
        state.pegawai.Pengajar = data
    },
    setStatusPengampu(state, data) {
        state.pegawai.Pengajar = data
    },
}