export default {
  setHalaqahSantri(state, value) {
    state.halaqahsantri = value;
  },
  setPendaftarUjian(state, value) {
    state.pendaftarujian = value;
  },
  move(state, data) {
    this.$router.push({ path: `/settings/ujiantahfidz/${data}` });
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
};
