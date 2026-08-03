const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, "0");
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, "0");
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;

export default () => ({
  santri: [],
  permissions: [],
  select: [],
  pagi: "",
  sore: "",
  updateData: "",
  date: date,
  selectedMatan: "", // renamed
  kelasOptions: [], // added to fetch from Auth user
  dateNow: date,
  btn: true,
});
