export default () => ({
  santri: [],
  detail: "",
  surah: [],
  detailMutabaah: "",
  updateData: "",
  mt: 0,

  // Matan setup
  listMatan: [],
  selectedMatan: "",
  selectedMatanName: "",
  btn: true,
  list: {
    ziyadah: "Ziyadah", // Only 1 type for Mutabaah Matan
  },

  // modalinsert
  surahfrom: { name: "", ayat: [] },
  surahto: { name: "", ayat: [] },
  ayatfrom: { number: "", page: "", juz: "" },
  ayatto: { name: "", page: "", juz: "" },
  page: 0,

  // modalupdate
  surahfromupdate: { name: "", ayat: [] },
  surahtoupdate: { name: "", ayat: [] },
  ayatfromupdate: { number: "", page: "", juz: "" },
  ayattoupdate: { name: "", page: "", juz: "" },
  pageupdate: 0,
  noteupdate: "",
});
