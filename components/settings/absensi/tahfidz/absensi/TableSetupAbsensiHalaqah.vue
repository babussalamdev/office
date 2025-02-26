<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Sort</th>
            <th scope="col">Waktu Halaqoh</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in list" :key="i">
            <td scope="row">{{ i + 1 }}</td>
            <td scope="row" class="text-capitalize">{{ data.SK }}</td>
            <td scope="row" class="text-capitalize">
              <span class="px-3 py-1 rounded-pill text-white" :class="data.Status === 'active' ? 'bg-primary' : 'bg-secondary'">
                {{ data.Status }}
              </span>
            </td>
            <td class="text-end">
              <a href="javascript:;" @click="updateList(data.SK)">
                <button class="btn btn-sm" :class="data.Status === 'active' ? 'bg-primary' : 'bg-secondary'">
                  <i class="bx bx-power-off text-white"></i>
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("setupabsensihalaqah", ["list"]),
  },
  methods: {
    ...mapActions('setupabsensihalaqah', ['updateList']),
  },
};
</script>

<style scoped></style>
