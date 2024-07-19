<template>
  <div>
    <div>
      <div class="head d-flex align-items-center mb-3 justify-content-start">
        <h2 class="mb-3 mb-md-0">Absensi Tahfidz</h2>
        <!-- <select v-if="select.length > 0" class="form-select" name="Kelas" @change="getAbsensi" v-model="selectKelas">
          <option value="" selected>-- Kelas --</option>
          <option v-for="(data, index) in select" :key="index" :value="data">
            {{ data }}
          </option>
        </select> -->
      </div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalAbsensiTahfidz />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Asrama</th>
              <th scope="col" class="text-center">Pagi</th>
              <th scope="col" class="text-center">Sore</th>
              <!-- <th scope="col" class="text-end">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in datas" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.name }}</h1>
                <p class="mt-1 text-secondary">{{ data.nis }}</p>
              </td>
              <td class="text-capitalize align-middle">
                pulang
              </td>
              <td class="text-capitalize py-2">
                <div class="select-input mx-auto">
                  <div class="box-radio">
                    <!-- <label for="absen">Absen</label> -->
                    <i class="" @click="setAbsensi(data.sk, 'absensi')">Absen</i>
                  </div>
                  <div class="box-radio">
                    <!-- <input type="checkbox" id="terlambat" v-model="terlambatPagi" hidden>
                    <label for="terlambat">Terlambat</label> -->
                    <i class="">Terlambat</i>
                  </div>
                  <div class="box-radio">
                    <!-- <input type="checkbox" id="sakit" v-model="sakitPagi" hidden>
                    <label for="sakit">Sakit</label> -->
                    <i class="">Sakit</i>
                  </div>
                  <div class="box-radio">
                    <i class="">Izin</i>
                    <!-- <input type="checkbox" id="izin" v-model="izinPagi" hidden>
                    <label for="izin">Izin</label> -->
                  </div>
                </div>
              </td>
              <td class="text-capitalize py-2">
                <!-- <div class="select-input mx-auto">
                  <div class="box-radio">
                    <input type="radio" id="absenn" :value="`absen ${data.sk}`" v-model="sore" hidden>
                    <label for="absenn">Absen</label>
                  </div>
                  <div class="box-radio">
                    <input type="radio" id="terlambatt" :value="`terlambat ${data.sk}`" v-model="sore" hidden>
                    <label for="terlambatt">Terlambat</label>
                  </div>
                  <div class="box-radio">
                    <input type="radio" id="sakitt" :value="`sakit ${data.sk}`" v-model="sore" hidden>
                    <label for="sakitt">Sakit</label>
                  </div>
                  <div class="box-radio">
                    <input type="radio" id="izinn" :value="`izin ${data.sk}`" v-model="sore" hidden>
                    <label for="izinn">Izin</label>
                  </div>
                </div> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      absenPagi: false,
      izinPagi: false,
      sakitPagi: false,
      terlambatPagi: false,
      updateData: "",
      selectKelas: "",
      datas: [
        {
          name: 'Fauzan Gunawan',
          nis: 154814841,
          sk: 'santri#21546'
        }
      ]
    };
  },
  computed: {
    ...mapState("tahfidzAbsensi", ["santri", "permissions", "select"]),
    // ...mapGetters('tahfidzAbsensi', ['getAbsenPagi', 'getSore']),
    // pagi: {
    //   get() {
    //     return this.getAbsenPagi
    //   },
    //   set(value) {
    //     const obj = {
    //       name: 'pagi',
    //       value
    //     }
    //     this.$store.commit('tahfidzAbsensi/setStatus', obj)
    //   }
    // },
    // sore: {
    //   get() {
    //     return this.getSore
    //   },
    //   set(value) {
    //     const obj = {
    //       name: 'sore',
    //       value
    //     }
    //     this.$store.commit('tahfidzAbsensi/setStatus', obj)
    //   }
    // }
  },
  watch: {
    // absenPagi() {
    //   // this.setStatus('pagi')
    //   // absen(index, type) {
    //   this.absenPagi = false
    //   $("#modalAbsen").modal("show");
    //   // this.updateData = {
    //   //   santri: this.santri[index],
    //   //   type: type,
    //   // };
    // // },
    // },
    // sore() {
    //   this.setStatus('sore')
    // }
  },
  methods: {
    ...mapActions('tahfidzAbsensi', ['setStatus']),
    ...mapMutations('tahfidzAbsensi', ['setStatusHalaqah']),
    setAbsensi(sk, type) {
      const obj = {
        sk, type
      }
      this.setStatusHalaqah(obj)
      // this.updateData = {
      //   santri: this.santri[index],
      //   type: type,
      // };
    },
    getAbsensi() {
      const kelas = this.selectKelas;
      this.$store.dispatch("asramaAbsensi/getAbsensi", kelas);
    },
  },
};
</script>

<style scoped>
.select-input {
  max-width: 162px;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}
.box-radio i {
  width: 80px;
  height: 25px;
  border: 1px solid grey;
  cursor: pointer;
  border-radius: 2px;
}

.box-radio i {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .box-radio input:checked+label {
  background: grey;
  color: #fff;
} */
</style>
