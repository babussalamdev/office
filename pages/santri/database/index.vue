<template>
  <section id="santri">
    <div class="santri">
      <div class="mt-3">
        <div class="d-flex flex-row-reverse mb-3 gap-3 align-items-center">
          <div class="upload-data-santri">
            <input
              type="file"
              class="form-control form-control-sm"
              id="inputGroupFile02"
            />
          </div>
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
      santri: [
        {
          nama: "Fauzan Gunawan",
          ortu: "Gunawan",
          alamat: "Bekasi, Jawa Barat",
          nisn: "321212412",
        },
        {
          nama: "Afifa Cantika",
          ortu: "Riyagung",
          alamat: "Cikarang, Jawa Barat",
          nisn: "145425232",
        },
      ],
    };
  },

  // async asyncData({ $axios }) {
  //   // const databaseSantri = await $axios.$get("get-database?santri=active");
  //   console.log(databaseSantri);
  //   return { databaseSantri };
  // },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
