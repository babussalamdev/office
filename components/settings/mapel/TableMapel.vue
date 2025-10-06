<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Sort</th>
            <th scope="col">Nama Mapel</th>
            <th scope="col">Jurusan</th>
            <th scope="col">Hari</th>
            <th scope="col">Penilaian</th>
            <th scope="col">Total</th>
            <th scope="col">KKM</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in mapel" :key="i">
            <td scope="row">{{ data.Sort }}</td>
            <td scope="row" class="text-capitalize">{{ data.Nama }}</td>
            <td scope="row" class="text-uppercase">{{ data.Jurusan }}</td>
            <td scope="row" class="text-capitalize container-hari">
              <div v-for="(value, i) in data.Hari.split(', ')" :key="i" style="display: inline">
                <div class="btn-group btn-group-sm px-1 py-1 list-hari">
                  <div class="btn btn-secondary disabled">
                    <span>{{ value }}</span>
                  </div>
                </div>
              </div>
            </td>
            <td scope="row" class="">
              <div v-for="(value, index) in Penilaian[i]" :key="index" style="display: inline">
                <div class="btn-group btn-group-sm px-0 py-0 me-1">
                  <div class="btn btn-secondary btn-sm disabled fs-6 align-middle">{{ value }}</div>
                  <div class="btn btn-secondary btn-sm" @click="delScore(index, data.SK)">
                    <i class="material-icons fs-6">close</i>
                  </div>
                </div>
              </div>
            </td>
            <td scope="row" class="text-center">
              {{ totalNilai(Penilaian[i]) }}
            </td>
            <td scope="row" class="text-center">
              {{ data?.Kkm }}
            </td>
            <td scope="row">{{ data.Status }}</td>
            <td class="text-end">
              <a :href="`${urlXlsx}/${data.XLSX}`" v-if="data.XLSX" download>
                <button class="btn btn-sm btn-success">
                  <i class="bx bx-download"></i>
                </button>
              </a>
              <a href="javascript:;" @click="inputScore(data.SK)">
                <button class="btn btn-sm btn-primary">
                  <i class="bx bx-plus"></i>
                </button>
              </a>
              <a href="javascript:;" @click="editItem(data.SK)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil"></i>
                </button>
              </a>
              <a href="javascript:;" @click="deleteItem(data.SK)">
                <button class="btn btn-sm btn-danger">
                  <i class="bx bx-trash text-white"></i>
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalMapel />
    <ModalMapelUpdate />
    <ModalMapelPenilaian />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from "vuex";
  export default {
    data() {
      return {
        urlXlsx: "",
      };
    },
    computed: {
      ...mapState("mapel", ["mapel", "listKelas", "Penilaian"]),
    },
    created() {
      if (process.env.NODE_ENV !== "production") {
        this.urlXlsx = process.env.XlsxDev;
      } else {
        this.urlXlsx = process.env.XlsxPro;
      }
    },
    methods: {
      ...mapActions("mapel", { deleteItem: "deleteItem", changeStep: "delScore", editItem: "editItem" }),
      ...mapMutations("mapel", ["inputScore"]),
      delScore(index, sk) {
        const obj = { index, sk };
        this.changeStep(obj);
      },
      totalNilai(arr) {
        if (arr.length > 0) {
          return arr
            .map((item) => {
              // Pisahkan string pada '-'
              const parts = item.split("-");
              // Ambil bagian setelah '-' dan konversi ke angka
              return parseFloat(parts[1]) || 0;
            })
            .reduce((acc, curr) => acc + curr, 0);
        }
      },
    },
  };
</script>

<style scoped>
  .fs-6 {
    font-size: 12px !important;
  }

  tr th {
    white-space: nowrap;
  }

  tr td {
    white-space: nowrap;
  }
</style>
