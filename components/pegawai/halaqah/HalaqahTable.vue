<template>
  <div>
    <div>
      <div class="row mb-3">
        <div class="col-12 col-md-9 d-flex align-items-center">
          <h4 class="text-capitalize mb-3 mb-md-0" style="font-size: 14px">
            data {{ $route.name.replace("-", " ") }}
          </h4>
        </div>
        <div class="col-12 col-md-3 d-flex justify-content-end">
          <!-- <div class="input-group">
            <button type="button" class="btn btn-primary btn-sm" @click="editBulk(data)"
              :disabled="data.length > 0 ? false : true">
              Edit
            </button>
            <select name="Kelas" id="kelas" v-model="kelas" @change="loadHalaqah" class="form-select select" required>
              <option value="" selected disabled>Kelas</option>
              <option v-for="(data, index) in select" :key="index" :value="data">
                {{ data }}
              </option>
            </select>
          </div> -->
        </div>
      </div>
      <div class="table-responsive">
        <!-- Modal -->
        <HalaqahModal :updateData="updateData" />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Nama Halaqah</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in pengampu" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="text-secondary">{{ data.Nip }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{
                  data.Halaqah[unit] === "off"
                    ? "belum dipilih"
                    : data.Halaqah[unit]
                }}
              </td>

              <td class="text-end align-middle">
                <div class="action">
                  <a href="javascript:;" @click="editItem(index)">
                    <button class="btn btn-sm btn-warning">
                      <i class="bx bx-pencil text-dark"></i>
                    </button>
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
    ...mapState("pegawai/halaqah", ["pengampu", "halaqah"]),
  },
  methods: {
    async editItem(index) {
      $("#updateDataHalaqah").modal("show");
      this.updateData = this.pengampu[index];
    },
  },
};
</script>
