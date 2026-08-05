<template>
  <section id="rekaptahfidz">
    <div class="rekaptahfidz">
      <!-- table -->
      <ModalZiyadahMatan />
      <ModalZiyadahInsertMatan />
      <div class="row mb-3">
        <div class="col-12 col-md-9 d-flex align-items-center">
          <i class="bi bi-arrow-left bg-primary p-2 rounded-circle text-white cursor-pointer" @click="backPage"></i>
        </div>
      </div>
      <!-- Inside _id.vue -> template -->
      <div class="row mb-3">
        <div class="col-12 col-md-9 d-flex align-items-center">
          <h2 class="text-capitalize mb-3 mb-md-0">
            Data {{ baseSubject }} {{ matanName }} -
            <b>{{ detail.Nama }}</b>
          </h2>
        </div>
        <div class="col-12 col-md-3 d-flex justify-content-end">
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#mutabaah">Tambah</button>
        </div>
      </div>

      <!-- Inside _id.vue -->
      <div class="table-responsive animate__animated animate__fadeInUp">
        <table v-if="detailMutabaah" class="table table-hover table-striped table-bordered border-danger">
          <thead>
            <tr>
              <th class="text-start">Tanggal</th>
              <th class="text-center">Dari Halaman</th>
              <th class="text-center">Sampai Halaman</th>
              <th class="text-center">Total Halaman</th>
              <th class="text-center">Nilai</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in detailMutabaah" :key="index">
              <td>{{ data.SK }}</td>
              <!-- Outputting data.From and data.To directly -->
              <td class="text-center">{{ data?.From }}</td>
              <td class="text-center">{{ data?.To }}</td>
              <td class="text-center">{{ data?.Page }}</td>
              <td class="text-center">{{ data?.Score }}</td>
              <td class="text-center">
                <a href="javascript:;" @click="showNote(data.Note)">
                  <i class="bx bx-message-alt-detail text-white btn btn-sm btn-primary"></i>
                </a>
                <a href="javascript:;" @click="editItem(data.SK)">
                  <i class="bx bx-pencil text-dark btn btn-sm btn-warning"></i>
                </a>
                <a href="javascript:;" @click="deleteItem(data.SK)">
                  <i class="bx bx-trash text-white btn btn-sm btn-danger"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
  import Swal from "sweetalert2";
  import { mapState, mapMutations } from "vuex"; // Removed mapActions as it's not used directly here

  export default {
    name: "mutabaahmatan", // FIX: Updated component name
    // Inside _id.vue -> data()
    data() {
      return {
        // Splits "ziyadahmatan#sma#..." and only takes "ziyadahmatan"
        baseSubject: localStorage.getItem("subject") ? localStorage.getItem("subject").split("#")[0] : "",

        // Gets the clean human-readable Matan name we just saved
        matanName: localStorage.getItem("matan_name") || "",
      };
    },
    async asyncData({ store, route, redirect }) {
      // FIX: Changed state reference to mutabaahmatan
      const detail = store.state.mutabaahmatan.detail;
      if (detail) {
        // FIX: Dispatched from mutabaahmatan
        store.dispatch("mutabaahmatan/getDetail", route.params.id);
      } else {
        // FIX: Redirect updated to correct path
        redirect("/kelas/mutabaahmatan");
      }
    },
    mounted() {
      this.closeAllModals();
    },
    computed: {
      // FIX: Mapped from mutabaahmatan module
      ...mapState("mutabaahmatan", ["detail", "detailMutabaah"]),
    },
    methods: {
      // FIX: Mapped from mutabaahmatan module
      ...mapMutations("mutabaahmatan", ["editItem"]),
      closeAllModals() {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      },
      backPage() {
        // FIX: Route updated to correct path
        this.$router.push("/kelas/mutabaahmatan");
      },
      showNote(note) {
        Swal.fire({
          showConfirmButton: false,
          text: note,
        });
      },
      // Inside _id.vue -> methods
      async deleteItem(sk) {
        const i = this.detailMutabaah.findIndex((x) => x.SK === sk);
        const data = this.detailMutabaah[i];
        const skSantri = data.PK.replace(/#/g, "%23");

        const result = await Swal.fire({
          title: data.SK,
          text: "Data akan dihapus secara permanen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          // FIX: Encode the subject before passing it to the API endpoint
          const subject = localStorage.getItem("subject").replace(/#/g, "%23");

          const res = await this.$apiSantri.$delete(`delete-logs?subject=${subject}&sksantri=${skSantri}&createdat=${data.SK}`);

          if (res) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Data berhasil dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$store.commit("mutabaahmatan/deleteDetail", data.SK);
          }
        }
      },
    },
  };
</script>

<style scoped>
  @import url(~/assets/css/santri/santri.css);
  @import url("https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap");

  i {
    cursor: pointer;
  }

  tr th,
  tr td {
    white-space: nowrap;
  }
</style>
