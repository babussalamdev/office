<template>
  <section id="settings">
    <div class="settings animate__animated animate__fadeInUp">
      <h2 class="text-capitalize mb-3">
        data {{ $route.name.replace("-", " ") }}
      </h2>
      <KelasSantriTable />
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
