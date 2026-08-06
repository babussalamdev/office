const sekarang = new Date();
const tanggal = sekarang.getDate().toString().padStart(2, "0");
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, "0");
const tahun = sekarang.getFullYear();
const date = `${tahun}-${bulan}-${tanggal}`;

export default () => ({
  start: date,
  end: date,
  santri: [],
  details: [],

  // ADDED: Matan configurations
  listMatan: [],
  selectedMatan: "",
});
