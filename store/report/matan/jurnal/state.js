const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, "0");
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, "0");
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;

export default () => ({
  date: date,
  matan: [], // renamed and set as array
  selectedMatan: "", // renamed
  kelas: [],
  selectedKelas: "",
  periode: [],
  label: [],
  semester: [],
  selectedLabel: "",
  selectedSemester: "",
  values: [],
  page: 1,
  perPage: 10,
});
