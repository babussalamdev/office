<template>
  <div class="table-responsive animate__animated animate__fadeInUp">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">Sort</th>
          <th scope="col">Semester</th>
          <th scope="col">Tahun</th>
          <th scope="col">Label</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, i) in periode" :key="i">
          <td scope="row">{{ data.Sort }}</td>
          <td scope="row" class="text-capitalize">{{ data.Semester }}</td>
          <td scope="row" class="text-uppercase">{{ data.Tahun }}</td>
          <td scope="row" class="text-uppercase">{{ data.Label }}</td>
          <td scope="row">
            <span class="item" :class="data.Status === 'active' ? 'bg-success' : 'bg-danger'">{{ data.Status }}</span>
          </td>
          <td class="text-end">
            <a href="javascript:;" @click="updateItem(data.SK)">
              <button class="btn btn-sm" :class="data.Status === 'active' ? 'btn-primary' : 'btn-secondary'">
                <i class='bx bx-power-off'></i>
                <!-- {{ data.Status === "active" ? "off" : "on" }} -->
              </button>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("periode", ["periode"]),
  },
  methods: {
    ...mapActions('periode', ['updateItem'])
  },
};
</script>

<style scoped></style>
