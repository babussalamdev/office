<template>
  <div>
    <div class="row mb-3">
      <div class="col-6 d-flex align-items-center">
        <h1 style="font-size: 12px;">Create Qr Code</h1>
      </div>
      <div class="col-6 d-flex justify-content-end gap-2">
        <button style="font-size: 12px;" @click="createPDF()" class="btn btn-sm btn-primary">Create All</button>
        <select style="font-size: 12px; max-width: max-content;" class="form-select" @change="getData" v-model="selectedKelas">
          <option value="">kelas</option>
          <option v-for="(data, index) in kelas" :key="index" :value="data.Nama">{{ data.Nama }}</option>
        </select>
      </div>
    </div>
    <!-- Modal -->
    <KelasSantriModal />
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" class="text-start">Nama Santri</th>
            <th scope="col" class="text-start">CNC</th>
            <th scope="col" class="text-end">Action</th>
            <!-- <th scope="col" class="text-end">Action</th> -->
          </tr>
        </thead>
        <tbody>
          <!-- <tr>
            <td>Fauzan Gunawan</td>
            <td>CNC-652586586</td>
            <td class="text-end">
              <a style="font-size: 12px;" href="javascript:;" class="btn btn-sm btn-primary">create</a>
            </td>
          </tr>
          <tr>
            <td>Yazid Gunawan</td>
            <td>CNC-58549572</td>
            <td class="text-end">
              <a style="font-size: 12px;" href="javascript:;" class="btn btn-sm btn-primary">create</a>
            </td>
          </tr> -->
          <tr v-for="card in santri" :key="card.id">
            <td class="align-middle">{{ card.Nama }}</td>
            <td class="align-middle">{{ card.CNC }}</td>
            <!-- <td class="align-middle">
              <qrcode-vue :value="card.code" :size="100" />
            </td> -->
            <td class="align-middle text-end">
              <button style="font-size: 12px;" class="btn btn-sm btn-primary" @click="createQR(card)">Create
                QrCode</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <QrcodePdf v-if="qrcode" @sendAction="clear" :updateData="updateData" />
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import bcrypt from 'bcryptjs';
// import QrcodeVue from 'qrcode.vue';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    QrcodeVue,
  },
  computed: {
    ...mapState('qrcode', ['kelas', 'santri']),
    ...mapGetters('qrcode', ['getSelectedKelas']),
    selectedKelas: {
      get() {
        return this.getSelectedKelas
      },
      set(value) {
        this.$store.commit('qrcode/SET_STATE', { key: 'selectedKelas', value})
      }
    }
  },
  data() {
    return {
      // cncCards: [
      //   { id: 'Fauzan Gunawan', name: 'Kartu A', code: 'CNC-123457853' },
      //   { id: 'Yazid Gunawan', name: 'Kartu B', code: 'CNC-678906745' },
      //   { id: 'Harun Gunawan', name: 'Kartu C', code: 'CNC-578548598' },
      //   { id: 'Shodiq Gunawan', name: 'Kartu D', code: 'CNC-785478547' },
      //   // Tambahkan data CNC kartu lainnya
      // ],
      qrcode: false,
      updateData: ''
    };
  },
  methods: {
    ...mapActions('qrcode', ['getData']),
    createQR(card) {
      this.updateData = card
      this.qrcode = true
    },
    clear() {
      this.qrcode = false
    },
  },
}
</script>

<style scoped></style>
