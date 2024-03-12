<template>
  <div class="container">
    <div class="card p-5">
      <div class="calendar animate__animated animate__fadeInUp">
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import '@fullcalendar/core/'
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
export default {
  props: ['transformedData'],
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: true,
        businessHours: true,
        dayMaxEvents: true,
        selectable: true,
        events: '',
        locale: 'ID',
      }
    }
  },
  methods: {
    loadCalendar() {
      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        nowIndicator: true,
        editable: true,
        businessHours: true,
        dayMaxEvents: true,
        selectable: true,
        events: this.transformedData,
        locale: 'ID',
      }
    }
  },
  watch: {
    transformedData: 'loadCalendar'
  },
};
</script>
