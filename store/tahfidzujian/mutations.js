export default {
  setHalaqahSantri(state, value) {
    state.halaqahsantri = value;
  },
  setPendaftarUjian(state, value) {
    state.pendaftarujian = value;
  },
  move(state, data) {
    this.$router.push({ path: `/tahfidz/ujian/${data}` });
  },
  showDetail(state, value) {
    const i = state.pendaftarujian.findIndex((x) => x.SK === value.sk);
    state.detail = state.pendaftarujian[i];
    this.$router.push(`/tahfidz/ujian/${value.sk.replace("#", "%23")}`);
  },
  setSelectedType(state, value) {
    state.selectedType = value;
  },
  setKoordinatorFilterBy(state, value) {
    state.koordinatorFilterBy = value;
  },
  setKoordinatorFilterValue(state, value) {
    state.koordinatorFilterValue = value;
  },
  setFilterOptions(state, value) {
    state.filterOptions = value;
  },
};
