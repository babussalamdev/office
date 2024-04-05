<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <MusyrifModal :updateData="updateData" />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Asrama</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in musyrif" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="text-secondary">{{ data.Nip }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{
                  data.Asrama[unit] === "off"
                    ? "belum dipilih"
                    : data.Asrama[unit]
                }}
              </td>

              <td class="text-end align-middle">
                <div class="action">
                  <a href="javascript:;" @click="editItem(index)">
                    <i class="bx bx-pencil text-success"></i>
                  </a>
                </div>
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
    ...mapState("pegawai/musyrif", ["musyrif", "asrama"]),
  },
  methods: {
    async editItem(index) {
      $("#updateDataMusyrif").modal("show");
      this.updateData = this.musyrif[index];
    },
  },
};
</script>
