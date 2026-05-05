<template>
  <div>
    <div class="mb-3">
      <div class="row">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h2>Data Santri Laundry</h2>
        </div>
        <div class="col-12 col-md-6 d-flex align-items-center justify-content-end">
          <div class="input-group">
            <select class="form-select" aria-label="Default select example" v-model="selectedAsrama" @change="addNewData">
              <!-- Add this line below to show "Asrama" when nothing is selected -->
              <option value="" selected disabled>Asrama</option>
              <option v-for="(data, index) in asrama" :key="index" :value="data">{{ data }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Nama Santri</th>
            <th scope="col">Asrama</th>
            <th scope="col">Total Denda</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in datas" :key="index">
            <td class="text-capitalize align-middle">{{ data.Nama }}</td>
            <td class="text-capitalize align-middle">{{ data.Asrama }}</td>
            <td class="text-capitalize align-middle">{{ rupiah(data.DendaLaundry) }}</td>
            <td class="text-capitalize align-middle text-end">
              <a href="javascript:;" v-if="data.DendaLaundry !== 0" @click="editItem(data.SK, 'transfer')">
                <button class="btn btn-sm btn-warning" style="font-size: 12px">Transfer</button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
  import formatSet from "~/mixins/formatSet";
  export default {
    mixins: [formatSet],
    computed: {
      ...mapState("laundry/datasantri", ["datas", "asrama"]),
      ...mapGetters("laundry/datasantri", ["getSelectedAsrama"]),
      selectedAsrama: {
        get() {
          // If the store returns null or undefined, force it to return ""
          // This perfectly matches your <option value=""> placeholder!
          const value = this.getSelectedAsrama;
          return value === null || value === undefined ? "" : value;
        },
        set(value) {
          this.$store.commit("laundry/datasantri/setState", { key: "selectedAsrama", value });
        },
      },
    },
    methods: {
      ...mapActions("laundry/datasantri", {
        getDataByAsrama: "getDataByAsrama",
        changeEdit: "editItem", // local name : action name
      }),
      addNewData() {
        this.getDataByAsrama();
      },
      editItem(sk, type) {
        this.changeEdit({ sk, type });
      },
    },
  };
</script>

<style scoped></style>
