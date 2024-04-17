<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <!-- <ModalPegawai
            :updateData="updateData"
            @deleteUpdateData="deleteUpdateData"
          /> -->
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
                    data.Status === 'pondok'
                      ? 'text-primary'
                      : data.Status === 'rumah'
                      ? 'text-success'
                      : data.Status === 'sakit'
                      ? 'text-warning'
                      : 'text-danger'
                  "
                  >{{
                    data.Status === "pondok"
                      ? " school "
                      : data.Status === "rumah"
                      ? " villa "
                      : data.Status === "sakit"
                      ? " medication "
                      : " person_off "
                  }}</i
                >
              </td>
              <td class="text-capitalize align-middle">{{ data.Catatan }}</td>
              <td class="text-capitalize align-middle">
                <h1>{{ data.Waktu.split(" ")[0] }}</h1>
                <p class="mt-1 text-secondary">
                  {{ data.Waktu.split(" ")[1] }}
                </p>
              </td>
              <td class="text-end align-middle">
                <a href="javasript:;" class="bg-success">
                  <i class="material-icons"> school </i> Hadir</a
                >
                <a href="javasript:;" class="bg-danger">
                  <i class="material-icons"> person_off </i> Absen</a
                >
                <a href="javasript:;" class="bg-warning">
                  <i class="material-icons"> medication </i> Sakit</a
                >
                <a href="javasript:;" class="bg-primary">
                  <i class="material-icons"> villa </i> Pulang</a
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
export default {
  data() {
    return {
      santri: [
        {
          Nama: "fauzan gunawan",
          Nis: "534241",
          Status: "rumah",
          Catatan: "",
          Waktu: "2024-04-15 14:30:00",
        },
        {
          Nama: "afifa cantika",
          Nis: "534241",
          Status: "pondok",
          Catatan: "",
          Waktu: "2024-04-15 14:30:00",
        },
        {
          Nama: "sari hariyanti",
          Nis: "534241",
          Status: "sakit",
          Catatan: "Panas Meriang",
          Waktu: "2024-04-15 14:30:00",
        },
        {
          Nama: "shahla nazara",
          Nis: "534241",
          Status: "absen",
          Catatan: "",
          Waktu: "2024-04-15 14:30:00",
        },
      ],
    };
  },
};
</script>
