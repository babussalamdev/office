<template>
  <section id="settings">
    <div class="settings">
      <h2 class="text-capitalize mb-3">
        data {{ $route.name.replace("-", " ") }}
      </h2>
      <HalaqahSantriTable />
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
@import url(~/assets/css/santri/santri.css);
</style>
