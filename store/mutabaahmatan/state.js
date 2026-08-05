export default () => ({
  santri: [],
  detail: "",
  detailMutabaah: [], // <-- Change this from "" to []  updateData: "",
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
  page: 0, // Total Halaman

  // Modal Update Variables
  fromPageUpdate: "",
  toPageUpdate: "",
  pageupdate: 0, // Total Halaman Update
  scoreUpdate: 0, // <-- ADD THIS
  noteupdate: "",
});
