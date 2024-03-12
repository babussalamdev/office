<template>
  <section id="kaldik">
    {{ kaldik }}
    <div class="kaldik animate__animated animate__fadeIn">
      <div class="container">
        <div class="card p-5">
          <div class="calendar animate__animated animate__fadeInUp">
            <FullCalendar :options="calendarOptions" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapGetters } from "vuex";

export default {
  async asyncData({ store }) {
    const program = localStorage.getItem("program");
    store.dispatch(`kaldik/changeUnit`, program);
  },

  computed: {
    ...mapGetters("kaldik", ["getKaldik"]),
    kaldik: {
      get() {
        return this.getKaldik;
      },
    },
  },

  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        locale: "id",
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        initialEvents: this.kaldik,
      },
    };
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
