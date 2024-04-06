export default {
    setMusyrif(state, value) {
        state.pengampu = value.data.pegawai
        state.halaqah = value.data.select
    },
    updateHalaqah(state, value) {
        const i = state.pengampu.findIndex((x) => x.SK === value.SK)
        state.pengampu[i].Halaqah[value.Program] = value.Value
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
        data.Personalia = value.Personalia


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

}