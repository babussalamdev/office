<template>
  <div>
    <div class="row mb-3">
      <div class="col-6 d-flex align-items-center">
        <h1 style="font-size: 12px;">Create Qr Code</h1>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <select style="font-size: 12px; max-width: max-content;" class="form-select">
          <option value="">kelas</option>
          <option value="">7a</option>
          <option value="">7b</option>
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
            <th scope="col" class="text-start">CNC</th>
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
          <tr v-for="card in cncCards" :key="card.id">
            <td class="align-middle">{{ card.id }}</td>
            <td class="align-middle">{{ card.name }}</td>
            <td class="align-middle">{{ card.code }}</td>
            <td class="align-middle">
              <qrcode-vue :value="card.code" :size="100" />
            </td>
            <td class="align-middle">
              <button style="font-size: 12px;" class="btn btn-sm btn-primary" @click="createPDF(card)">Create PDF</button>
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
export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      cncCards: [
        { id: 'Fauzan Gunawan', name: 'Kartu A', code: 'CNC-123457853' },
        { id: 'Yazid Gunawan', name: 'Kartu B', code: 'CNC-678906745' },
        // Tambahkan data CNC kartu lainnya
      ],
      qrcode: false,
      updateData: ''
    };
  },
  methods: {
    createPDF(card) {
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
