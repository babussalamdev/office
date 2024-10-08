<template>
  <div>
    <div class="row mb-3">
      <div class="col-6 d-flex align-items-center">
        <h1 style="font-size: 12px;">Create Qr Code</h1>
      </div>
      <div class="col-6 d-flex justify-content-end gap-2">
        <span>
          <button v-if="multibtn" style="font-size: 12px;" @click="createAll()" class="btn btn-sm btn-primary">Create All</button>
          <button v-else style="font-size: 12px;" class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
          </button>
        </span>
        <select style="font-size: 12px; max-width: max-content;" class="form-select" @change="getData"
          v-model="selectedKelas">
          <option value="">none</option>
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
          <tr v-for="card in santri" :key="card.id">
            <td class="align-middle">{{ card.Nama }}</td>
            <td class="align-middle">{{ card.CNC }}</td>
            <td class="align-middle text-end">
              <button style="font-size: 12px;" class="btn btn-sm btn-primary" @click="createQR(card)">Create
                QrCode</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <QrcodePdf v-if="qrcode" @sendAction="clear" :updateData="updateData" />
    <QrcodePdfMultiple v-if="multiqr" @sendActionMulti="clearMulti" />
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
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
        this.$store.commit('qrcode/SET_STATE', { key: 'selectedKelas', value })
      }
    }
  },
  data() {
    return {
      qrcode: false,
      multiqr: false,
      updateData: '',
      multibtn: true
    };
  },
  methods: {
    ...mapActions('qrcode', ['getData']),
    createQR(card) {
      this.updateData = card
      this.qrcode = true
    },
    async createAll() {
      this.multibtn = false
      this.multiqr = true
    },
    clear() {
      this.qrcode = false
    },
    clearMulti() {
      this.multiqr = false
      this.multibtn = true
    }
  },
}
</script>

<style scoped></style>
