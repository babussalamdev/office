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
        <!-- Dropdown Selection Added Here -->
        <div class="mb-3" style="max-width: 250px">
          <select class="form-select" v-model="dropdownType" @change="fetchData">
            <option value="pendaftar">Penguji</option>
            <option value="halaqah">Halaqah Saya</option>
          </select>
        </div>

        <div class="table-responsive animate__animated animate__fadeInUp">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" class="text-start">Tanggal Ujian</th>
                <th scope="col" class="text-start">Nama</th>
                <th scope="col" class="text-start">Juz</th>
                <th v-if="dropdownType !== 'halaqah'" scope="col" class="text-start">Halaqah</th>
                <th scope="col" class="text-start">Kelas</th>
                <th scope="col" class="text-start">Score</th>
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
                <td v-if="dropdownType !== 'halaqah'" class="text-capitalize align-middle">
                  <h1>{{ data.Halaqah }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Kelas }}</h1>
                </td>
                <td class="text-capitalize align-middle">
                  <h1>{{ data.Score }}</h1>
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
                <td class="text-capitalize align-middle">
                  <a
                    href="javascript:;"
                    @click="isTodayOrPast(data.Date) ? openModal(data) : null"
                    :class="{ 'text-muted opacity-50': !isTodayOrPast(data.Date) }"
                    :style="!isTodayOrPast(data.Date) ? 'cursor: not-allowed; pointer-events: none;' : ''">
                    <i class="bi bi-journal-check h5"></i>
                  </a>
                </td>
                <!-- <td class="text-capitalize">
                  <a
                    href="javascript:;"
                    @click="isTodayOrPast(data.Date) ? showDetail(data.SK) : null"
                    :class="{ 'text-muted opacity-50': !isTodayOrPast(data.Date) }"
                    :style="!isTodayOrPast(data.Date) ? 'cursor: not-allowed; pointer-events: none;' : ''">
                    <i class="bi bi-pencil-square h5"></i>
                  </a>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <NilaiModal :show="isModalOpen" :studentData="selectedStudent" @close="isModalOpen = false" @refresh="fetchData" />
  </section>
</template>

<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    async asyncData({ store }) {
      store.dispatch("tahfidzujian/changeUnitPendaftarUjian");
    },
    data() {
      return {
        isModalOpen: false,
        selectedStudent: null,
      };
    },
    computed: {
      ...mapState("tahfidzujian", ["pendaftarujian"]),

      // MOVE THIS INSIDE THE COMPUTED OBJECT
      dropdownType: {
        get() {
          return this.$store.state.tahfidzujian.selectedType;
        },
        set(value) {
          this.$store.commit("tahfidzujian/setSelectedType", value);
        },
      },
    }, // <-- End of computed object

    mounted() {
      this.closeAllModals();
    },
    methods: {
      ...mapMutations("tahfidzujian", ["move", "showDetail"]),

      fetchData() {
        // This will now correctly trigger after the setter updates the state
        this.$store.dispatch("tahfidzujian/changeUnitPendaftarUjian");
      },
      openModal(data) {
        this.selectedStudent = data;
        this.isModalOpen = true;
      },
      isTodayOrPast(dateString) {
        if (!dateString) return false;

        // Get today's date and strip the time
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get the target date and strip the time
        const targetDate = new Date(dateString);
        targetDate.setHours(0, 0, 0, 0);

        // Return true if the target date is today or earlier
        return targetDate <= today;
      },
      showDetail(sk) {
        this.$store.commit("tahfidzujian/showDetail", { sk });
      },
      closeAllModals() {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      },
    },
  };
</script>

<style>
  @import url(~/assets/css/santri/santri.css);
</style>
