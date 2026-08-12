const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, "0");
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, "0");
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;

export default () => ({
  santri: [],
  permissions: [],
  kelasOptions: [], // Array populated by API (result.kelas)
  selectedKelas: "", // Now dynamic instead of fixed
  select: [], // Matan options array
  selectedMatan: "",
  updateData: "",
  date: date,
  dateNow: date,
  btn: true,
});
