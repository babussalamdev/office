<template>
  <section>
    <div class="invoice-page">
      <h1 class="text-center fw-bold mb-2 fs-1">{{ updateData.Nama }}</h1>
      <p class="text-center mb-5">{{ updateData.CNC }}</p>
      <p class="text-center mb-3">{{ updateData.Hashed_CNC }}</p>
      <qrcode-vue class="text-center" :value="updateData.Hashed_CNC" :size="500" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import html2pdf from 'html2pdf.js'
import html2canvas from 'html2canvas';
import bcrypt from 'bcryptjs';
import QrcodeVue from 'qrcode.vue';
export default {
  props: ['updateData'],
  data() {
    return {
      hashedCode: ''
    }
  },
  components: {
    QrcodeVue,
  },
  computed: {
    ...mapState('partner', ['profile', 'invoice'])
  },
  async mounted() {
    // this.hashedCode = await this.toHash(this.updateData.code);
    await this.downloadQrCode();
    // await this.exportRAR()
    await this.$emit('sendAction')
  },
  methods: {
    downloadQrCode() {
      this.$store.dispatch('index/submitLoad')
      const certificateElement = this.$el.querySelector('.invoice-page');

      html2canvas(certificateElement, { scale: 2 }).then(canvas => {
        // Konversi canvas ke data URL
        const imgData = canvas.toDataURL('image/jpeg', 0.98);

        // Buat link untuk mengunduh gambar
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${this.updateData.Nama} qrcode.jpg`;

        // Simulasikan klik untuk mengunduh
        link.click();
        this.$store.dispatch('index/submitLoad')
      });
    },
    toHash(code) {
      return bcrypt.hash(code, 10)
    },
    // async exportRAR() {
    //   const zip = new JSZip();

    //   const cncCards = [
    //     { id: 'Fauzan Gunawan', name: 'Kartu A', code: 'CNC-123457853' },
    //     { id: 'Yazid Gunawan', name: 'Kartu B', code: 'CNC-678906745' },
    //     { id: 'Harun Gunawan', name: 'Kartu C', code: 'CNC-578548598' },
    //     { id: 'Shodiq Gunawan', name: 'Kartu D', code: 'CNC-785478547' },
    //     // Tambahkan data CNC kartu lainnya
    //   ];

    //   for (const card of cncCards) {
    //     const certificateElement = this.$el.querySelector('.invoice-page');

    //     const canvas = await html2canvas(certificateElement, { scale: 2 });
    //     const imgData = canvas.toDataURL('image/jpeg', 0.98);

    //     // Tambahkan gambar ke ZIP dengan nama berdasarkan ID
    //     const base64Data = imgData.split(',')[1]; // Hanya ambil bagian base64
    //     zip.file(`${card.id}.jpg`, base64Data, { base64: true });
    //   }

    //   // Buat file ZIP dan simpan
    //   const content = await zip.generateAsync({ type: 'blob' });
    //   FileSaver.saveAs(content, 'qr-code.zip');
    // }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.invoice-page {
  margin: 0 auto;
  background-color: #fff !important;
  padding-top: 70px;
  width: 210mm;
  height: 270mm;
  margin: 0;
}
</style>


<!-- percobaan 1 -->
<!-- <template>
  <div>
    <div class="invoice-page" v-if="currentCard">
      <h1 class="text-center fw-bold mb-2 fs-1">{{ currentCard.id }}</h1>
      <p class="text-center mb-5">{{ currentCard.code }}</p>
      <p class="text-center mb-3">{{ currentCard.hashedCode }}</p>
      <qrcode-vue class="text-center" :value="currentCard.hashedCode" :size="500" />
    </div>
    <button @click="downloadCertificates">Download Certificates</button>
  </div>
</template>

<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';

export default {
  data() {
    return {
      cncCards: [
        { id: 'Fauzan Gunawan', name: 'Kartu A', code: 'CNC-123457853', hashedCode: 'hashed_value_1' },
        { id: 'Yazid Gunawan', name: 'Kartu B', code: 'CNC-678906745', hashedCode: 'hashed_value_2' },
      ],
      currentCard: null, // Untuk menyimpan kartu yang sedang ditampilkan
    };
  },
  async mounted() {
    // this.hashedCode = await this.toHash(this.updateData.code);
    // await this.downloadCertificate();
    await this.downloadCertificates()
    await this.$emit('sendAction')
  },
  methods: {
    async downloadCertificates() {
      const zip = new JSZip();

      for (const card of this.cncCards) {
        this.currentCard = card; // Update currentCard dengan data kartu saat ini

        // Tunggu sedikit agar Vue dapat merender elemen baru
        await this.$nextTick();

        const certificateElement = this.$el.querySelector('.invoice-page');
        const canvas = await html2canvas(certificateElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);

        const base64Data = imgData.split(',')[1];
        zip.file(`${card.id}.jpg`, base64Data, { base64: true });
      }

      const content = await zip.generateAsync({ type: 'blob' });
      FileSaver.saveAs(content, 'certificates.zip');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.invoice-page {
  margin: 0 auto;
  background-color: #fff !important;
  padding-top: 70px;
  width: 210mm;
  height: 270mm;
  margin: 0;
}
</style> -->


