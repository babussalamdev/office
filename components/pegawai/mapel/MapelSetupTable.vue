<template>
  <div>
    <div>
      <MapelSetupModal />
      <div class="table-responsive">
        <!-- Modal -->
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Mapel</th>
              <th scope="col">Hari</th>
              <th scope="col">Pengajar</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in mapel" :key="index">
              <td class="text-capitalize align-middle">
                {{ data.Nama }}
              </td>
              <td scope="row" class="text-capitalize">
                <div v-for="(value, i) in data.Hari.split(', ')" :key="i" style="display: inline">
                  <div class="btn-group btn-group-sm px-1 py-1 list-permissions">
                    <div class="btn btn-dark disabled">
                      <span style="font-size: 12px">{{ value }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-capitalize align-middle">
                <h1>{{ data.GSIPK1 }}</h1>
              </td>
              <!-- <td class="text-capitalize align-middle">
                {{
                  data.Halaqah[unit] === "off"
                    ? "belum dipilih"
                    : data.Halaqah[unit]
                }}
              </td> -->
              <!-- <a href="javascript:;" @click="editItem(index)">
                <button class="btn btn-sm btn-warning">
                  <i class="bx bx-pencil text-dark"></i>
                </button>
              </a> -->
              <td class="text-end align-middle">
                <button class="btn btn-sm btn-warning" @click="editItem(data.SK)">
                  <i class="bx bx-pencil text-dark"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      unit: "",
    };
  },
  // mounted() {
  //   this.unit = localStorage.getItem("program");
  // },
  computed: {
    ...mapState("pegawai/mapel", ["mapel"]),
  },
  methods: {
    ...mapMutations('pegawai/mapel', ['editItem']),
  },
};
</script>
