export default {
  methods: {
    formatDate(dateString) {
      // Periksa apakah dateString terdefinisi
      if (!dateString || typeof dateString !== 'string') {
        return ""; // Atau tangani sesuai kebutuhan Anda
      }

      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];

      // Pastikan dateString sesuai format yang diharapkan sebelum dibagi (split)
      if (dateString.indexOf('-') !== -1) {
        const [year, month, day] = dateString.split('-');
        // Pastikan year, month, dan day merupakan bilangan bulat yang valid sebelum digunakan
        const formattedDate = `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;

        return formattedDate;
      } else {
        return ""; // Atau tangani sesuai kebutuhan jika format tidak sesuai
      }
    },
    rupiah(a) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(a);
    },
    nominal(a) {
      if (a) {
        return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    financeDate(dateStr) {
      // Format yang diinginkan (hari, tanggal bulan tahun)
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      // Mendapatkan tanggal hari ini tanpa waktu (set jam menjadi 00:00:00)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Mengatur jam menjadi 00:00:00 agar hanya tanggal yang dihitung

      // Membuat objek Date dari string tanggal yang diberikan dan set jamnya menjadi 00:00:00
      const date = new Date(dateStr);
      date.setHours(0, 0, 0, 0); // Mengatur jam menjadi 00:00:00 agar hanya tanggal yang dihitung

      // Menghitung perbedaan hari antara tanggal yang diberikan dan hari ini
      const diffTime = today - date;
      const diffDays = diffTime / (1000 * 3600 * 24); // Menghitung perbedaan dalam hari

      // Jika tanggal adalah hari ini
      if (diffDays === 0) {
        return 'Hari ini';
      }
      // Jika tanggal adalah kemarin
      if (diffDays === 1) {
        return 'Kemarin';
      }
      // Jika tanggal lebih lama dari kemarin, tampilkan dalam format "Senin, 01 Desember 2024"
      return date.toLocaleDateString('id-ID', options);
    }
  },
}
