<template>
  <section>
    <div class="invoice-page" v-for="(item, index) in santri" :key="index">
      <h1 class="text-center fw-bold mb-2 fs-1">{{ item.Nama }}</h1>
      <p class="text-center mb-5">{{ item.CNC }}</p>
      <qrcode-vue class="text-center" :value="item.Hashed_CNC" :size="500" />
    </div>
  </section>
</template>

<script>
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import QrcodeVue from 'qrcode.vue';
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('qrcode', ['santri'])
  },
  components: {
    QrcodeVue,
  },
  async mounted() {
    // this.hashedCode = await this.toHash(this.updateData.code);
    await this.downloadAllQrCodes();
    // await this.exportRAR()
    this.$emit('sendActionMulti')
  },
  methods: {
    async downloadAllQrCodes() {
      const promises = this.santri.map((item, index) => {
        return new Promise((resolve) => {
          this.$nextTick(() => {
            const certificateElement = this.$el.querySelectorAll('.invoice-page')[index];

            html2canvas(certificateElement, { scale: 2 }).then(canvas => {
              const imgData = canvas.toDataURL('image/jpeg', 0.98);
              resolve({ name: `${item.Nama} - ${item.CNC}.jpg`, data: imgData });
            });
          });
        });
      });

      Promise.all(promises).then(images => {
        const zip = new JSZip();

        images.forEach(image => {
          const imgBlob = this.dataURLtoBlob(image.data);
          zip.file(image.name, imgBlob);
        });
        const kelas = this.$store.state.qrcode.selectedKelas

        zip.generateAsync({ type: 'blob' }).then(content => {
          saveAs(content, `qrcodes ${kelas}.zip`);
        });
      });
    },

    dataURLtoBlob(dataURL) {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
    }
  }
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
</style>
