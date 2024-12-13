<template>
  <section id="laundry">
    <div class="laundry">
      <LaundryAbsensiDetailTable />
    </div>
  </section>
</template>

<script>
  export default {
    async asyncData({ store, params, redirect }) {
      const pegawai = store.state.laundry.absensi.pegawai
      if (pegawai.length === 0) {
        redirect('/laundry/absensi')
      } else {
        const id = params.id
        store.dispatch('laundry/absensi/changeUnitDetail', id)
      }
    }
  }
</script>

<style scoped>

</style>
