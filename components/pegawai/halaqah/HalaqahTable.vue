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
                belum dipilih
                <!-- {{  }} -->
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
    };
  },
  computed: {
    ...mapState("pegawai/musyrif", ["musyrif", "asrama"]),
  },
  methods: {
    async editItem(index) {
      $("#updateDataMusyrif").modal("show");
      this.updateData = this.musyrif[index];
      console.log(this.updateData);
    },
  },
};
</script>
