<template>
  <section id="kaldik">
    <div class="kaldik animate__animated animate__fadeIn">
      <Calendar :transformedData="transformedData" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kaldik/changeUnit`, program);
  },

  computed: {
    ...mapGetters("kaldik", ["getKaldik"]),
    transformedData: {
      get() {
        return this.getKaldik;
      },
    },
  },
  methods: {
    handleDateClick: function (arg) {
      alert("date click! " + arg.dateStr);
    },
  },
};
</script>

<style scoped>
@import url(~/assets/css/kaldik/kladik.css);
</style>
