<template>
  <div>
    <section id="chart">
      {{sarprasData}}
    </section>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    computed: {
      ...mapState('home', ['sarprasData'])
    },
}
</script>

<style scoped>

</style>
