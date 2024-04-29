<template>
  <section id="settings">
    <div class="settings">
      <KelasSantriTable />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    const angkatan = new Date().getFullYear();
    const data = {
      program: program,
      angkatan: angkatan,
    };
    store.dispatch(`santri/kelas/changeUnit`, data);
  },
};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
