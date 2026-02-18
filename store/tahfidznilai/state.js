export default () => ({
  // Data Lists
  listKelas: [], // This will hold the Halaqah list
  label: [], // Years
  semester: [], // Semesters for selected Year

  // Selections
  selectedLabel: "",
  selectedSemester: "",
  selectedKelas: "", // This holds the selected Halaqah object

  // Data
  santri: [],
  selectedQuran: "", // Stores settings/columns
  th: { Nama: "", Halaqah: "", Total: "" }, // Table Headers

  // UI
  globalLoad: false,
  btn: true,
});
