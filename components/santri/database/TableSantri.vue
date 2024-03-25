<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalSantri :updateData="updateData" :years="years" />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col">Nama</th>
              <th scope="col">NISN</th>
              <th scope="col">Orang Tua</th>
              <th scope="col">Alamat</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(san, index) in santri" :key="index">
              <td>
                <input type="checkbox" />
              </td>
              <td class="text-capitalize">{{ san.Nama }}</td>
              <td>{{ san.Nisn }}</td>
              <td class="text-capitalize">{{ san.Orangtua }}</td>
              <td class="text-capitalize">{{ san.Alamat }}</td>
              <td class="text-end">
                <a href="#" @click="editItem(index)">
                  <i class="bx bx-pencil text-primary"></i>
                </a>
                <a href="#" @click="rmv(san.id, san.name)">
                  <i class="bx bx-trash text-danger"></i>
                </a>
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
  props: ["years"],
  data() {
    return {
      updateData: "",
    };
  },
  computed: {
    ...mapState("santri/database", ["santri"]),
  },
  methods: {
    async editItem(index) {
      $("#updateDataSantri").modal("show");
      this.updateData = this.santri[index];
    },
  },
};
</script>

<style lang="scss" scoped></style>
