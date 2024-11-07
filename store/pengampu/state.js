const sekarang = new Date();

// Mendapatkan tanggal, bulan, dan tahun
const tanggal = sekarang.getDate().toString().padStart(2, '0');
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, '0'); // Perlu ditambah 1 karena bulan dimulai dari 0
const tahun = sekarang.getFullYear();

// Membuat string untuk tanggal dengan format "DD/MM/YYYY"
const tanggalDalamFormat = `${tahun}-${bulan}-${tanggal}`;

export default () => ({
  pegawai: [],
  select: '',
  permissions: [],
  pagi: '',
  sore: '',
  updateData: '',
  date: tanggalDalamFormat
})
