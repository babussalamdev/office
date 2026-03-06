export default () => ({
  // Shared & Input Page
  select: [],
  selectedMapel: "",
  santri: [],
  openEdit: "",
  nilai: 0,
  globalLoad: false,
  example: "",
  th: { Nama: "", Total: "" },
  selectedQuran: "",

  // Coordinator / Pengampu Input Page
  selectHalaqah: [],
  selectedByHalaqah: "",
  selectKelas: [],
  selectedByKelas: "",
  selectedType: "halaqah",
  btn: true,

  // Report Page
  listKelas: [], // Halaqah list for Report
  label: [], // Years
  semester: [], // Semesters for selected Year
  selectedLabel: "",
  selectedSemester: "",
});
