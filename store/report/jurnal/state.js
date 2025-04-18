const sekarang = new Date();

// Mendapatkan tanggal, bulan, dan tahun
const tanggal = sekarang.getDate().toString().padStart(2, '0');
const bulan = (sekarang.getMonth() + 1).toString().padStart(2, '0');
const tahun = sekarang.getFullYear();

// Membuat string untuk tanggal dengan format "DD/MM/YYYY"
const date = `${tahun}-${bulan}-${tanggal}`;

export default () => ({
    date: date,
    listKelas: [],
    selectedKelas: '',
    listMapel: [],
    selectedMapel: '',
    values: [],
    page: 1,
    perPage: 10
})
