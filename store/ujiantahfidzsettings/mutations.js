export default {
  setHalaqahSantri(state, value) {
    state.halaqahsantri = value;
  },
  setPendaftarUjian(state, value) {
    state.pendaftarujian = value;
  },
  move(state, data) {
    this.$router.push({ path: `/santri/ujiantahfidz/${data}` });
  },
  setSelectedType(state, value) {
    state.selectedType = value;
  },
  setListOptions(state, value) {
    state.listOptions = value;
  },
  setSelectedValue(state, value) {
    state.selectedValue = value;
  },
  setListPenguji(state, data) {
    state.listPenguji = data.pegawai;
  },

  updatePengujiPendaftar(state, data) {
    const pendaftarId = data.PK.replace(/#ujiantahfidz/g, "");
    const pendaftarLog = data.SK;

    const i = state.pendaftarujian.findIndex((x) => x.SK === pendaftarId && x.SKLOG === pendaftarLog);

    if (i !== -1) {
      state.pendaftarujian[i].Examiner_Name = data.Examiner_Name;
      state.pendaftarujian[i].Series = data.Examiner_SK;
      state.pendaftarujian[i].Date = data.Date;
    }
  },
};
