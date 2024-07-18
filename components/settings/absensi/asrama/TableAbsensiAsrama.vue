<template>
  <div>
    <div>
      <div class="head d-flex align-items-center mb-3 justify-content-start">
        <h2 class="mb-3 mb-md-0">Absensi Asrama</h2>
        <!-- <select v-if="select.length > 0" class="form-select" name="Kelas" @change="getAbsensi" v-model="selectKelas">
          <option value="" selected>-- Kelas --</option>
          <option v-for="(data, index) in select" :key="index" :value="data">
            {{ data }}
          </option>
        </select> -->
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
                <i class="material-icons" :class="data.Logs.asrama === 'sekolah'
                    ? 'text-success'
                    : data.Logs.asrama === 'rumah'
                      ? 'text-secondary'
                      : data.Logs.asrama === 'sakit'
                        ? 'text-warning'
                        : data.Logs.asrama === 'izin'
                          ? 'text-primary'
                          : 'text-danger'
                  ">{{
                    data.Logs.asrama === "sekolah"
                      ? " school "
                      : data.Logs.asrama === "rumah"
                        ? " villa "
                        : data.Logs.asrama === "sakit"
                          ? " medication "
                          : data.Logs.asrama === "izin"
                            ? "hourglass_top"
                            : " person_off "
                  }}</i>
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
                <a href="javasript:;" class="bg-success" v-if="permissions.includes('sekolah')"
                  @click="absen(index, 'sekolah')">
                  <i class="material-icons"> school </i> Sekolah</a>
                <a href="javascript:;" class="bg-danger" v-if="permissions.includes('absen')"
                  @click="absen(index, 'absen')">
                  <i class="material-icons"> person_off </i>
                  Absen</a>
                <a href="javasript:;" class="bg-warning" v-if="permissions.includes('sakit')"
                  @click="absen(index, 'sakit')">
                  <i class="material-icons"> medication </i> Sakit</a>
                <a href="javasript:;" class="bg-secondary" v-if="permissions.includes('rumah')"
                  @click="absen(index, 'rumah')">
                  <i class="material-icons"> villa </i> Pulang</a>
                <a href="javasript:;" class="bg-primary" v-if="permissions.includes('izin')"
                  @click="absen(index, 'izin')">
                  <i class="material-icons"> villa </i> Izin</a>
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
