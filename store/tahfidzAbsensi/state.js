// import moment from "moment";
// import "moment-timezone";
// // const date = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");
// // const date = moment().tz("Asia/Jakarta").format("DD/MM/YYYY");
// const date = new Date();

// Mendapatkan tanggal hari ini
const sekarang = new Date();

// Mendapatkan tanggal, bulan, dan tahun
const tanggal = sekarang.getDate();
const bulan = sekarang.getMonth() + 1; // Perlu ditambah 1 karena bulan dimulai dari 0
const tahun = sekarang.getFullYear();

// Membuat string untuk tanggal dengan format "DD/MM/YYYY"
const tanggalDalamFormat = `${tanggal}/${bulan}/${tahun}`;

// Mendapatkan tanggal hari ini dalam zona waktu Asia/Jakarta
// const sekarang = new Date();
// const options = { timeZone: 'Asia/Jakarta' };

// // Mendapatkan tanggal, bulan, dan tahun dari zona waktu yang ditentukan
// const tanggal = sekarang.toLocaleDateString('en-GB', options); // 'en-GB' digunakan untuk format "DD/MM/YYYY"

// console.log("Tanggal hari ini dalam zona Asia/Jakarta:", tanggal);

// const sekarang = new Date();

// // Buat opsi untuk zona waktu Asia/Jakarta
// const options = {
//   day: '2-digit',
//   month: '2-digit',
//   year: 'numeric',
//   timeZone: 'Asia/Jakarta'
// };

// // Menggunakan Intl.DateTimeFormat dengan opsi zona waktu
// const formatter = new Intl.DateTimeFormat('en-GB', options);
// const tanggalDalamFormat = formatter.format(sekarang);

export default () => ({
    santri: [],
    permissions: [],
    select: [],
    pagi: '',
    sore: '',
    updateData: '',
    date: tanggalDalamFormat
})
