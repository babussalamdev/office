<template>
  <div>
    <div class="card">
      {{ datas }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('laundry/finance', ['datas'])
  },
}
</script>

<style scoped></style>
