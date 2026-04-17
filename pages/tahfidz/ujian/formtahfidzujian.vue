<template>
  <section id="rekaptahfidz">
    <div class="rekaptahfidz">
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="pendaftarantahfidzujian" autocomplete="off" />
        <label @click="move('pendaftarantahfidzujian')" class="btn btn-outline-dark" for="pendaftarantahfidzujian">Pendaftaran</label>

        <input type="radio" class="btn-check" name="btnradio" id="formtahfidzujian" autocomplete="off" checked />
        <label @click="move('formtahfidzujian')" class="btn btn-outline-dark text-white" style="background-color: #176b87" for="formtahfidzujian">
          Form Ujian
        </label>
      </div>

      <div class="py-3">
        <div class="table-responsive animate__animated animate__fadeInUp">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" class="text-start">Tanggal Ujian</th>
                <th scope="col" class="text-start">Nama</th>
                <th scope="col" class="text-start">Juz</th>
                <th scope="col" class="text-start">Halaqah</th>
                <th scope="col" class="text-start">Kelas</th>
                <th scope="col" class="text-start">Status</th>
                <th scope="col" class="text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in pendaftarujian" :key="index">
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Date }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Nama }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Juz }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Halaqah }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Kelas }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <span
                    class="badge rounded-pill"
                    :class="{
                      'bg-success': data?.Status === 'lulus',
                      'bg-danger': data?.Status === 'mengulang',
                      'bg-secondary': !data?.Status,
                    }"
                    style="font-size: 0.85rem; padding: 0.4em 0.8em; font-weight: 500">
                    {{ data?.Status || "-" }}
                  </span>
                </td>
                <td class="text-capitalize">
                  <a
                    href="javascript:;"
                    @click="isToday(data.Date) && !data.Status ? showDetail(data.SK) : null"
                    :class="{ 'text-muted opacity-50': !isToday(data.Date) || data.Status }"
                    :style="!isToday(data.Date) || data.Status ? 'cursor: not-allowed; pointer-events: none;' : ''">
                    <i class="bi bi-pencil-square h5"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  export default {
    async asyncData({ store }) {
      store.dispatch("tahfidzujian/changeUnitPendaftarUjian");
    },
    computed: {
      ...mapState("tahfidzujian", ["pendaftarujian"]),
    },
    mounted() {
      this.closeAllModals();
    },
    methods: {
      ...mapMutations("tahfidzujian", ["move", "showDetail"]),
      isToday(dateString) {
        if (!dateString) return false;

        const today = new Date().toISOString().split("T")[0]; // Returns "YYYY-MM-DD"

        // If your data.Date is in a different format,
        // ensure this comparison matches that format.
        return dateString === today;
      },
      showDetail(sk) {
        this.$store.commit("tahfidzujian/showDetail", { sk });
      },
      closeAllModals() {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
        // Menghapus kelas dan style dari body
        document.body.classList.remove("modal-open"); // Menghapus kelas
        document.body.style.overflow = ""; // Menghapus gaya inline
        document.body.style.paddingRight = ""; // Menghapus gaya inline
      },
    },
  };
</script>

<style>
  @import url(~/assets/css/santri/santri.css);
</style>
