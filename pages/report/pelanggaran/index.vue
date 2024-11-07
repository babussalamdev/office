<template>
  <div>
    <h1>Pelanggaran</h1>
  </div>
</template>

<script>
export default {
  middleware: 'permission',
  meta: {
    permissions: ['report pelanggaran']
  },
};
</script>

<style lang="scss" scoped></style>
