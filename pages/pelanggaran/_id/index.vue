<template>
  <section id="pelanggaran">
    <div class="pelanggaran">
      <PelanggaranTableRecord :nama="nama" />
      <!-- <PelanggaranModalRecord /> -->
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store, params, redirect }) {
    if (store.state.pelanggaran.santri.length < 1) {
      return redirect("/pelanggaran");
    }
    const i = store.state.pelanggaran.santri.findIndex(
      (x) => x.SK === params.id
    );
    const nama = store.state.pelanggaran.santri[i].Nama;
    store.dispatch(`pelanggaran/getRecord`, params.id);
    return { nama };
  },
};
</script>

<style>
@import url(~/assets/css/pelanggaran/pelanggaran.css);
</style>
