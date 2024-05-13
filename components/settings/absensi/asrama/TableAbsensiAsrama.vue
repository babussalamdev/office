<template>
  <div>
    <div>
      <div class="head d-flex align-items-center mb-3 justify-content-between">
        <h2 class="mb-3 mb-md-0">Absensi Asrama</h2>
        <select
          v-if="select.length > 0"
          class="form-select"
          name="Kelas"
          @change="getAbsensi"
          v-model="selectKelas"
        >
          <option value="" selected>-- Kelas --</option>
          <option v-for="(data, index) in select" :key="index" :value="data">
            {{ data }}
          </option>
        </select>
      </div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalAbsensiAsrama :updateData="updateData" />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Nama / NIS</th>
              <th scope="col">Status</th>
              <th scope="col">Catatan</th>
              <th scope="col">Waktu</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in santri" :key="index">
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="mt-1 text-secondary">{{ data.Nis }}</p>
              </td>
              <td class="text-capitalize align-middle">
                <i
                  class="material-icons"
                  :class="
                    data.StatusAsrama === 'hadir'
                      ? 'text-success'
                      : data.StatusAsrama === 'pulang'
                      ? 'text-secondary'
                      : data.StatusAsrama === 'sakit'
                      ? 'text-warning'
                      : data.StatusAsrama === 'izin'
                      ? 'text-primary'
                      : 'text-danger'
                  "
                  >{{
                    data.StatusAsrama === "hadir"
                      ? " school "
                      : data.StatusAsrama === "pulang"
                      ? " villa "
                      : data.StatusAsrama === "sakit"
                      ? " medication "
                      : data.StatusAsrama === "izin"
                      ? "hourglass_top"
                      : " person_off "
                  }}</i
                >
              </td>
              <td class="text-capitalize align-middle">
                {{ data.NoteAsrama }}
              </td>
              <td class="text-capitalize align-middle">
                <h1>{{ data.WaktuAsrama?.split(", ")[0] }}</h1>
                <p class="mt-1 text-secondary">
                  {{ data.WaktuAsrama?.split(", ")[1] }}
                </p>
              </td>
              <td class="text-end align-middle">
                <a
                  href="javasript:;"
                  class="bg-success"
                  v-if="permissions.includes('hadir')"
                  @click="absen(index, 'hadir')"
                >
                  <i class="material-icons"> school </i> Hadir</a
                >
                <a
                  href="javascript:;"
                  class="bg-danger"
                  v-if="permissions.includes('absen')"
                  @click="absen(index, 'absen')"
                >
                  <i class="material-icons"> person_off </i>
                  Absen</a
                >
                <a
                  href="javasript:;"
                  class="bg-warning"
                  v-if="permissions.includes('sakit')"
                  @click="absen(index, 'sakit')"
                >
                  <i class="material-icons"> medication </i> Sakit</a
                >
                <a
                  href="javasript:;"
                  class="bg-secondary"
                  v-if="permissions.includes('pulang')"
                  @click="absen(index, 'pulang')"
                >
                  <i class="material-icons"> villa </i> Pulang</a
                >
                <a
                  href="javasript:;"
                  class="bg-primary"
                  v-if="permissions.includes('izin')"
                  @click="absen(index, 'izin')"
                >
                  <i class="material-icons"> villa </i> Izin</a
                >
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
      selectKelas: "",
    };
  },
  computed: {
    ...mapState("asramaAbsensi", ["santri", "permissions", "select"]),
  },

  methods: {
    absen(index, type) {
      $("#modalAbsen").modal("show");
      this.updateData = {
        santri: this.santri[index],
        type: type,
      };
    },
    getAbsensi() {
      const kelas = this.selectKelas;
      this.$store.dispatch("asramaAbsensi/getAbsensi", kelas);
    },
  },
};
</script>

<style scoped></style>
