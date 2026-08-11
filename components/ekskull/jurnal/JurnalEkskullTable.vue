<template>
  <div>
    <div class="animate__animated animate__fadeInUp">
      <h2 class="mb-2">Jurnal Ekskull</h2>
      <div class="d-flex justify-content-between mb-3">
        <div class="d-flex gap-2">
          <select class="form-select" v-model="selectedEkskull" @change="getData">
            <option value="" disabled selected>Ekskull</option>
            <option v-for="(data, index) in datas" :key="index" :value="data">
              {{ data }}
            </option>
          </select>
        </div>
        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inputModalJurnal" :disabled="!selectedEkskull">
          tambah data
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" class="text-capitalize">Waktu</th>
              <th scope="col" class="text-capitalize">judul / pembahasan</th>
              <th scope="col" class="text-capitalize">catatan kejadian / solusi</th>
              <th scope="col" class="text-capitalize text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="uniqueEkskull.length === 0">
              <td colspan="4" class="text-center">Anda tidak mengajar apapun hari ini</td>
            </tr>
            <tr v-for="(data, index) in values" :key="index">
              <td class="text-capitalize" scope="col">{{ data.SK.split("#")[2] }}</td>
              <td class="text-capitalize" scope="col">{{ data.Description }}</td>
              <td class="text-capitalize" scope="col">{{ data.Occurrence }}</td>
              <td class="text-capitalize text-end" scope="col">
                <a href="javascript:;" @click="editItem(data.SK)">
                  <button class="btn btn-sm btn-warning">
                    <i class="bx bx-pencil text-dark mb-0"></i>
                  </button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <JurnalMatanModal />
    <JurnalMatanModalUpdate />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

  export default {
    computed: {
      ...mapState("jurnalekskull", ["datas", "values", "schedule"]),
      ...mapGetters("jurnalekskull", ["getselectedEkskull"]),

      selectedEkskull: {
        get() {
          return this.getselectedEkskull; // Fix: Read from the mapped getter
        },
        set(value) {
          this.setState({ key: "selectedEkskull", value });
        },
      },
      uniqueEkskull() {
        // Filter the API response (datas) by matching the class extracted from the SK
        if (!this.selectedEkskull) return [];
        return this.datas.filter((item) => item.SK.split("#")[2] === this.selectedEkskull);
      },
      scheduleMatan() {
        // Cocokkan id/kode matan yang dipilih dengan SK yang di-split
        return this.uniqueEkskull.find((x) => x.SK.split("#")[3] === this.selectedEkskull);
      },
    },
    watch: {
      selectedEkskull(value) {
        this.setState({ key: "reset", value });
        if (value && this.selectedEkskull) {
          this.getData();
        }
      },
      scheduleEkskull(value) {
        if (value) {
          this.setState({ key: "schedule", value });
        }
      },
    },
    methods: {
      ...mapActions("jurnalekskull", ["getData"]),
      ...mapMutations("jurnalekskull", ["setState", "editItem"]),
    },
  };
</script>

<style scoped>
  a {
    font-size: 12px;
  }
  select {
    font-size: 12px;
    width: max-content !important;
  }
  .input-group label,
  .input-group input,
  .input-group i,
  .input-group span,
  button {
    font-size: 12px;
  }
  button {
    white-space: nowrap;
  }
  @media screen and (max-width: 576px) {
    select {
      width: 100% !important;
    }
  }
</style>
