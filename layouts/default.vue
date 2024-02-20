<template>
  <main>
    <Sidebar />
    <div class="content">
      <nuxt />
    </div>
  </main>
</template>

<script>
import Sidebar from "~/components/all/Sidebar.vue";

export default { components: { Sidebar } };
</script>

<style>
@import url(~/assets/css/reset.css);
@import url(~/assets/css/style.css);
main {
  background-color: #176b87;
  height: max-content;
  padding-left: 208px;
  padding-top: 20px;
  /* padding-bottom: 20px; */
}
.content {
  background: #f1f5f9;
  height: 1000px;
  border-top-left-radius: 20px;
  padding: 10px 20px;
}
</style>
