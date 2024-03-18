<template>
  <section id="santri">
    <div class="santri">
      <div class="mt-3">
        <div class="database-santri mb-3">
          <!-- Button trigger modal -->
          <div class="button-santri">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#InputDataSantri"
            >
              Tambah
              <!-- <i class="material-icons"> add </i> -->
            </button>
          </div>
          <div class="upload-data-santri input-group">
            <input
              type="file"
              class="form-control form-control-sm"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              ref="fileInput"
            />
            <span>
              <button
                v-if="btn"
                class="btn btn-sm btn-success"
                type="button"
                id="inputGroupFileAddon04"
                @click="handleUpload"
              >
                Tambah
              </button>
              <button
                v-else
                class="btn btn-success btn-sm"
                type="button"
                disabled
              >
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden" role="status">Loading...</span>
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- table -->
      <TableSantri :santri="santri" />
    </div>

    <!-- Modal -->
    <!-- <SantriDbModal /> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      btn: true,
      santri: [
        {
          nama: "Fauzan Gunawan",
          ortu: "Gunawan",
          alamat: "Bekasi, Jawa Barat",
          nisn: "321212412",
          username: "zangun",
        },
        {
          nama: "Afifa Cantika",
          ortu: "Riyagung",
          alamat: "Cikarang, Jawa Barat",
          nisn: "145425232",
          username: "fayaa",
        },
      ],
    };
  },

  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`santri/database/changeUnit`, program);
  },

  // async asyncData({ $axios }) {
  //   const databaseSantri = await $axios.$get("get-database?santri=active");
  //   console.log(databaseSantri);
  //   return { databaseSantri };
  // },
  methods: {
    async handleUpload() {
      const file = this.$refs.fileInput.files[0]; // Dapatkan file dari input file
      const reader = new FileReader();

      reader.onload = async () => {
        this.btn = false;
        try {
          const base64String = reader.result.split(",")[1];
          const program = localStorage.getItem("program");
          const base64 = base64String;
          const data = await this.$axios.$post(
            `/input-santri?method=bulk&program=${program}`,
            base64
          );
          console.log(data);
          this.btn = true;
        } catch (error) {
          console.error(error);
        }
      };

      if (file) {
        reader.readAsDataURL(file); // Baca konten file sebagai data URL
      }
    },
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
