export default {
  setWalas(state, value) {
    state.walas = value.data.pegawai;
    state.kelas = value.data.select;
  },
  updateWalas(state, value) {
    const i = state.walas.findIndex((x) => x.SK === value.SK);
    state.walas[i].Kelas[value.Program] = value.Value;
  },
  inputSantriBulk(state, value) {
    state.santri = [...state.santri, ...value];
    state.santri.sort((a, b) => {
      return a.Nama - b.Nama;
    });
  },
  inputPegawaiSingle(state, value) {
    state.pegawai.push(value);
    state.pegawai.sort((a, b) => {
      return a.Nama - b.Nama;
    });
  },
  updatePegawai(state, value) {
    const i = state.pegawai.findIndex((x) => x.SK === value.SK);

    const data = state.pegawai[i];
    data.Nama = value.Nama;
    data.Lulusan = value.Lulusan;
    data.Nip = value.Nip;
    data.Program = value.Program;
    data.Personalia = value.Personalia;

    // if (i !== -1) {
    //     state.mapel[i] = { ...state.mapel[i], ...value };
    // }
  },
  updatePegawaiJabatan(state, value) {
    const i = state.pegawai.findIndex((x) => x.SK === value.SK);

    const data = state.pegawai[i];
    data.Jabatan = value.Jabatan;

    // if (i !== -1) {
    //     state.mapel[i] = { ...state.mapel[i], ...value };
    // }
  },

  setPeriode(state, data) {
    state.label = data.label;
    state.semester = data.semester;
  },

  updateSubject(state, value) {
    const i = state.pegawai.findIndex((x) => x.SK === value.key);
    state.pegawai[i].Status = value.Status;
  },
};
