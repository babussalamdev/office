<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Kegiatan</th>
            <th scope="col">Tanggal Dimulai</th>
            <th scope="col">Tanggal Berakhir</th>
            <th scope="col">Warna Label</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in kaldik" :key="index">
            <td class="text-capitalize">{{ data.Nama }}</td>
            <td>{{ data.TanggalMulai.split(',')[0] }}</td>
            <td>{{ data.TanggalAkhir.split(',')[0] }}</td>
            <td :style="{ color: data.WarnaLabel }"><i class='bx bxs-circle me-1'></i>{{ data.WarnaLabel }}</td>
            <td class="text-end">
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
    <ModalKaldik />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Swal from "sweetalert2";
import formatSet from "~/mixins/formatSet.js";

export default {
  data() {
    return {
      updateData: "",
    };
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kaldik/changeUnit`, program);
  },
  computed: {
    ...mapState("kaldik", ["kaldik"]),
  },
  mixins: [formatSet],

  methods: {
    ...mapActions('kaldik', ['deleteItem']),
    ...mapMutations('kaldik', ['editItem']),
  },
};
</script>

<style scoped></style>
