<template>
  <section id="laundry">
    <div class="laundry">
      <!-- table -->
      <LaundryNotaDetailTable :id="id" />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store, params, redirect }) {
    const id = params.id
    store.dispatch('laundry/nota/getDetail', id)
    return { id }
    // if (store.state.pelanggaran.santri.length < 1) {
    //   return redirect("/pelanggaran");
    // }
    // const i = store.state.pelanggaran.santri.findIndex(
    //   (x) => x.SK?.split("#")[1] === params.id
    // );
    // const code = store.state.pelanggaran.santri[i].SK?.split("#")[0];
    // const data = {
    //   code: code,
    //   key: params.id,
    // };
    // const nama = store.state.pelanggaran.santri[i].Nama;
    // // this.nama = store.state.pelanggaran.santri[i].Nama;
    // store.dispatch(`pelanggaran/getRecord`, data);
    // return { nama };
  },
};
</script>

<style>
@import url(~/assets/css/laundry/laundry.css);
</style>
