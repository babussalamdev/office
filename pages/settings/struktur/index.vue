<template>
  <section id="struktur">
    <div class="struktur">
      <!-- mapel input -->
      <div class="row mt-3 animate__animated animate__fadeInUp">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <h3>Settings Struktur</h3>
        </div>
        <div class="col-12 col-md-6">
          <!-- Button trigger modal -->
          <div class="button-santri float-end">
            <button type="button" class="btn btn-sm btn-primary button-santri" @click="inputModal()">
              Tambah Data
            </button>
          </div>
        </div>
      </div>
      <!-- table -->
      <TableStruktur />
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  middleware: 'personalia',
  meta: {
    personalias: 'on'
  },
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`struktur/changeUnit`, program);
  },
  methods: {
    ...mapMutations('struktur', ['inputModal'])
  },
};
</script>

<style>
@import url(~/assets/css/setting/setting.css);
</style>
