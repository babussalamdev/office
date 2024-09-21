<template>
  <section>
    <div class="invoice-page">
      <h1 class="text-center fw-bold mb-2 fs-1">{{ updateData.id }}</h1>
      <p class="text-center mb-5">{{ updateData.code }}</p>
      <p class="text-center mb-3">{{ hashedCode }}</p>
      <qrcode-vue class="text-center" :value="hashedCode" :size="500" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import html2pdf from 'html2pdf.js'
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
    this.hashedCode = await this.toHash(this.updateData.code);
    await this.downloadCertificate();
    await this.$emit('sendAction')
  },
  methods: {
    downloadCertificate() {
      const certificateElement = this.$el.querySelector('.invoice-page')

      var opt = {
        filename: `${this.updateData.id} qrcode`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
      };

      // New Promise-based usage:
      html2pdf().from(certificateElement).set(opt).save();
    },
    toHash(code) {
      return bcrypt.hash(code, 10)
    }
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
