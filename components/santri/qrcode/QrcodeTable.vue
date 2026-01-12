<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
        <h1 style="font-size: 14px">Create Qr Code</h1>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end align-items-center gap-2">
        <span>
          <button
            v-if="!selectedKelas"
            style="font-size: 12px"
            class="btn btn-sm btn-info text-white"
            data-bs-toggle="modal"
            data-bs-target="#topupModal">
            Balance Limit
          </button>
          <button v-if="!selectedKelas" style="font-size: 12px" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#cardModal">
            Tambah Kartu
          </button>
          <button v-if="selectedCards.length > 0 && !load" style="font-size: 12px" @click="downloadQr()" class="btn btn-sm btn-primary">
            QRCode
          </button>
          <button v-else-if="selectedCards.length > 0 && load" style="font-size: 12px" class="btn btn-sm btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
          </button>
          <button v-else style="font-size: 12px" class="btn btn-sm btn-primary" disabled>QRCode</button>
        </span>
        <select style="font-size: 12px; max-width: max-content" class="form-select" @change="getData" v-model="selectedKelas">
          <option value="">none</option>
          <option v-for="(data, index) in kelas" :key="index" :value="data.Nama">{{ data.Nama }}</option>
        </select>
      </div>
    </div>
    <!-- Modal -->
    <TopupModal />
    <CardModal />
    <div class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th class="text-start">
              <label>
                <input type="checkbox" @change="selectAll($event)" />
              </label>
            </th>
            <th scope="col" class="text-start">Nama Santri</th>
            <th scope="col" class="text-start">CNC</th>
            <th scope="col" class="text-end">Action</th>
            <!-- <th scope="col" class="text-end">Action</th> -->
          </tr>
        </thead>
        <tbody v-if="santri.length > 0">
          <tr v-for="(card, index) in santri" :key="index">
            <td>
              <label>
                <input type="checkbox" v-model="selectedCards" :value="card.CNC" />
              </label>
            </td>
            <td class="align-middle">{{ card.Nama }}</td>
            <td class="align-middle">{{ card.CNC }}</td>
            <td class="align-middle text-end">
              <a v-if="card.cardName === '-'" style="font-size: 12px" href="javascript:;" class="btn btn-sm btn-danger" @click="deleteItem(card.CNC)">
                <i class="material-icons">delete</i>
              </a>
              <a v-if="card.cardName !== '-'" style="font-size: 12px" href="javascript:;" class="btn btn-sm btn-warning" @click="resetPIN(card.CNC)">
                <i class="material-icons" title="Reset PIN">restart_alt</i>
              </a>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="py-3 text-center" colspan="3">Data tidak ada</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import QrcodeVue from "qrcode.vue";
  import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
  export default {
    components: {
      QrcodeVue,
    },
    computed: {
      ...mapState("qrcode", ["kelas", "santri", "load"]),
      ...mapGetters("qrcode", ["getSelectedKelas", "getSelectedCards"]),
      selectedKelas: {
        get() {
          return this.getSelectedKelas;
        },
        set(value) {
          const obj = { key: "selectedKelas", value };
          this.setState(obj);
        },
      },
      selectedCards: {
        get() {
          return this.getSelectedCards;
        },
        set(value) {
          const obj = { key: "selectedCards", value };
          this.setState(obj);
        },
      },
    },
    methods: {
      ...mapActions("qrcode", ["getData", "deleteItem", "downloadQr", "resetPIN"]),
      ...mapMutations("qrcode", ["setState"]),
      selectAll(event) {
        const value = event.target.checked ? this.santri.map((card) => card.CNC) : [];
        const obj = { key: "selectedCards", value };
        this.setState(obj);
      },
    },
  };
</script>
<style scoped>
  .material-icons {
    font-size: 12pt;
  }
</style>
