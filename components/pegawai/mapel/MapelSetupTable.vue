<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <HalaqahModal :updateData="updateData" />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Mapel</th>
              <th scope="col">Hari</th>
              <th scope="col">Jam</th>
              <th scope="col">Pengajar</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in mapel" :key="index">
              <td class="text-capitalize align-middle">
                {{ data.Nama }}
              </td>
              <td scope="row" class="text-uppercase">
                <div
                  v-for="(value, i) in data.Hari.split(',')"
                  :key="i"
                  style="display: inline"
                >
                  <div
                    class="btn-group btn-group-sm px-1 py-1 list-permissions"
                  >
                    <div class="btn btn-secondary disabled">
                      <span>{{ value }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Jam === "" ? "belum dipilih" : data.Jam }}
              </td>
              <td class="text-capitalize align-middle">
                <h1>{{ data.Pengajar }}</h1>
                <p class="text-secondary mt-1">{{ data.Nip }}</p>
              </td>
              <!-- <td class="text-capitalize align-middle">
                {{
                  data.Halaqah[unit] === "off"
                    ? "belum dipilih"
                    : data.Halaqah[unit]
                }}
              </td> -->

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
        <!-- {{ mapel }} -->
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
      mapelMain: [
        {
          Mapel: "aqidah",
          Hari: "senin",
          Jam: "08.00",
          Nama: "fauzan gunawan",
          Nip: "2341312",
        },
        {
          Mapel: "fiqh",
          Hari: "selasa",
          Jam: "08.00",
          Nama: "afifa cantika",
          Nip: "2341312",
        },
        {
          Mapel: "bahasa arab",
          Hari: "rabu",
          Jam: "08.00",
          Nama: "shahla nazara",
          Nip: "2341312",
        },
      ],
    };
  },
  // mounted() {
  //   this.unit = localStorage.getItem("program");
  // },
  computed: {
    ...mapState("pegawai/mapel", ["mapel"]),
  },
  // methods: {
  //   async editItem(index) {
  //     $("#updateDataHalaqah").modal("show");
  //     this.updateData = this.pengampu[index];
  //   },
  // },
};
</script>
