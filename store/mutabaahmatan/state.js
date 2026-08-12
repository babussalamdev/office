export default () => ({
  kelas: [], // <-- ADD THIS
  selectedKelas: "", // <-- ADD THIS

  santri: [],
  detail: "",
  detailMutabaah: [],
  mt: 0,

  // Matan setup
  listMatan: [],
  selectedMatan: "",
  selectedMatanName: "",
  btn: true,
  list: {
    ziyadahmatan: "Ziyadah Matan",
  },

  // Modal Insert Variables
  fromPage: "",
  toPage: "",
  page: 0,

  // Modal Update Variables
  fromPageUpdate: "",
  toPageUpdate: "",
  pageupdate: 0,
  scoreUpdate: 0,
  noteupdate: "",
});
