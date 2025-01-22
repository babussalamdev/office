<template>
  <section id="scan">
    <div class="scan">
        <LaporanModal />
        <div class="card">
          <h4 class="mb-3 text-center">Scan QrCode</h4>
          <div id="qrCodeScanner">
          </div>
        </div>
        <!-- <h3 class="mb-3 text-center">Mulai Bekerja!</h3>
        <p class="text-center mb-5">Scan QrCode ruangan yang tersedia untuk memulai pekerjaan anda</p> -->
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { Html5Qrcode } from "html5-qrcode";
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        camera: [],
        cameraId: '',
        scan: false,
        qrCodeScanner: null,
        data: { message: 'success' }
      }
    },
    mounted() {
      this.startScanner()
    },
    beforeDestroy() {
      if (this.qrCodeScanner) {
        this.qrCodeScanner.stop();
      }
    },
    methods: {
      async startScanner() {
        const config = { fps: 10, qrbox: 200 };
        this.qrCodeScanner = new Html5Qrcode('qrCodeScanner');

        this.qrCodeScanner.start({ facingMode: 'environment' }, config, async (decodedText) => {
          try {
            this.scan = true
            this.qrCodeScanner.pause(true);
            this.$store.commit('scan/setState', { key: 'decodedText', value: decodedText})
            this.$store.commit('scan/showModalNote')
            // const qrcode = decodedText.replace( /#/g, '%23')
            // const data = await this.$apiBase.$get(`get-log?type=user-scan&qrcode=${qrcode}`);
            // if (data) {
            //   if (data.message) {
            //     await Swal.fire({
            //       text: data.message,
            //       icon: 'warning',
            //       showConfirmButton: false,
            //     });
            //   } else {
            //     this.$router.push('/')
            //   }
            // }
            this.qrCodeScanner.resume(true);
            this.scan = false
          } catch (error) {
            console.error(error);
            this.scan = false
          }
        });
      },
    },
  }
</script>

<style scoped>
#qrCodeScanner {
  width: 300px;
  height: 100%;
  margin-inline: auto;
  position: relative;
  border: 2px solid #000;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  padding: 10px;
}

/* @media (max-width: 576px) {
  #qrCodeScanner {
    width: 100% !important;
  }
} */
  </style>
