<template>
  <section id="halaqoh">
    <div class="halaqoh animate__animated animate__fadeInUp">
      <div class="row">
        <!-- left side -->
        <!-- right side -->
        <!-- Asrama -->
        <div class="col-12">
          <div class="row mt-3 animate__animated animate__fadeInUp">
            <div class="col-12 col-md-6"></div>
            <div class="col-12 col-md-6">
              <!-- Button trigger modal -->
              <div class="button-santri float-end">
                <button
                  type="button"
                  class="btn btn-sm btn-primary button-santri"
                  data-bs-toggle="modal"
                  data-bs-target="#InputDataAsrama"
                >
                  Tambah Asrama
                </button>
              </div>
            </div>
          </div>

          <!-- table -->
          <TableAsrama />
        </div>
      </div>
    </div>

    <!-- modal -->
    <ModalKelompok />
  </section>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['setup asrama']
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kelompok/changeUnitAsrama`, program);
  },
  methods: {
    updateAsrama(data) {
      this.asrama.push(data);
      this.asrama.sort((a, b) => {
        return a.Sort - b.Sort;
      });
    },
    deleteAsrama(key) {
      const i = this.asrama.findIndex((x) => x.SK === key);
      this.asrama.splice(i, 1);
    },
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
