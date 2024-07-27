// Mendapatkan tanggal hari ini
const sekarang = new Date();

// Mendapatkan tanggal, bulan, dan tahun
const tanggal = sekarang.getDate();
const bulan = sekarang.getMonth() + 1; // Perlu ditambah 1 karena bulan dimulai dari 0
const tahun = sekarang.getFullYear();

// Membuat string untuk tanggal dengan format "DD/MM/YYYY"
const tanggalDalamFormat = `${tanggal}/${bulan}/${tahun}`;
export default () => ({
    santri: [],
    permissions: [],
    select: [],
    pagi: '',
    sore: '',
    updateData: '',
    date: tanggalDalamFormat,
    selectedMapel: ''
})
