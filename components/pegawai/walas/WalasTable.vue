<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <WalasModal :updateData="updateData" />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Kelas</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in walas" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="text-secondary">{{ data.Nip }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{
                  data.Kelas[unit] === "off"
                    ? "belum dipilih"
                    : data.Kelas[unit]
                }}
              </td>

              <td class="text-end align-middle">
                <button class="btn btn-warning" @click="editItem(index)">
                  <i class="bx bx-pencil text-dark"></i>
                </button>
                <!-- <div class="action">
                  <a href="javascript:;"">
                  </a>
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      updateData: "",
      unit: "",
    };
  },

  mounted() {
    this.unit = localStorage.getItem("program");
  },
  computed: {
    ...mapState("pegawai/walas", ["walas", "kelas"]),
  },
  methods: {
    async editItem(index) {
      $("#updateDataWalas").modal("show");
      this.updateData = this.walas[index];
    },
  },
};
</script>
