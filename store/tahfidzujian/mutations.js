export default {
  setHalaqahSantri(state, value) {
    state.halaqahsantri = value;
  },
  move(state, data) {
    this.$router.push({ path: `/tahfidz/ujian/${data}` });
  },
  showDetail(state, value) {
    localStorage.setItem("subject", value.subject);
    const i = state.halaqahsantri.findIndex((x) => x.SK === value.sk);
    state.detail = state.halaqahsantri[i];
    this.$router.push(`/tahfidz/ujian/${value.sk.replace("#", "%23")}`);
  },
};
