import { v4 as uuidv4 } from "uuid";
export default {
    setDatabaseAll(state, value) {
        state.pegawai = value
    },
    setDatabase(state, value) {
        state.pegawai = value.pegawai
        state.select = value.select
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

        state.value = [];
        state.password = "";
        state.btn = true
        $("#inputPegawaiForm")[0].reset()
        $("#InputDataPegawai").modal("hide");
    },
    updatePegawai(state, value) {
        const i = state.pegawai.findIndex((x) => x.SK === value.SK)

        const data = state.pegawai[i]
        data.Nama = value.Nama;
        data.Lulusan = value.Lulusan;
        data.Nip = value.Nip;
        data.Program = value.Program;
        data.Personalia = value.Personalia

        state.value = [];
        state.updateData = ''
        $("#updatePegawaiAdmin")[0].reset()
        $("#updateDataPegawaiAdmin").modal("hide");
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
    setStatusPengampu(state, data) {
        const i = state.pegawai.findIndex((x) => x.SK === data.index)
        state.pegawai[i].Pengampu[data.unit] = data.Pengampu[data.unit]
    },
    setStatusPengajar(state, data) {
        const i = state.pegawai.findIndex((x) => x.SK === data.index)
        state.pegawai[i].Pengajar[data.unit] = data.Pengajar[data.unit]
    },
    setStatusPersonalia(state, data) {
        const i = state.pegawai.findIndex((x) => x.SK === data.index)
        state.pegawai[i].Personalia = data.Personalia
    },

    // partikel
    btn(state, value) {
      state.btn = state.btn ? false : true
    },
    setValue(state, value) {
      state.value = value
    },
    generatePassword(state, value) {
      state.btn = false;
      state.password = uuidv4().substr(0, 6);
      state.btn = true;
    },
    editItem(state, value) {
      const i = state.pegawai.findIndex((x) => x.SK === value)
      state.updateData = state.pegawai[i];
      $("#updateDataPegawaiAdmin").modal("show");
    },
}
