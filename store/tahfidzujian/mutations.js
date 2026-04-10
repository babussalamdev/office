export default {
  setHalaqahSantri(state, value) {
    state.halaqahsantri = value;
  },
  move(state, data) {
    console.log(data);
    this.$router.push({ path: `/tahfidz/ujian/${data}` });
  },
};
