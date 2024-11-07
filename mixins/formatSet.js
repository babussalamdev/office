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
        }
    },
}
