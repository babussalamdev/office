<template>
  <section id="kaldik">
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

export default {
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
        events: [
          {
            title: "event 1",
            date: "2024-03-01",
            backgroundColor: "#6420AA",
            borderColor: "#6420AA",
          },
          { title: "event 2", date: "2024-02-29" },
        ],
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
