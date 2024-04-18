<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <HalaqahModal :updateData="updateData" />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Nama Kelas</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in pengampu" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="text-secondary mt-1">{{ data.Nip }}</p>
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Halaqah }}
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
      pengampu: [
        {
          Nama: "Fauzan Gunawan",
          Nip: "453423",
          Halaqah: "Abu Bakar",
        },
        {
          Nama: "Afifa Cantika",
          Nip: "645342",
          Halaqah: "Umar bin Khattab",
        },
      ],
    };
  },
  // mounted() {
  //   this.unit = localStorage.getItem("program");
  // },
  // computed: {
  //   ...mapState("pegawai/halaqah", ["pengampu", "halaqah"]),
  // },
  // methods: {
  //   async editItem(index) {
  //     $("#updateDataHalaqah").modal("show");
  //     this.updateData = this.pengampu[index];
  //   },
  // },
};
</script>
