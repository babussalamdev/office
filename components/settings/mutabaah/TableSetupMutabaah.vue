<template>
  <div>
    <div class="table-responsive animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Sort</th>
            <th scope="col">Category</th>
            <th scope="col">Pencatatan</th>
            <th scope="col" class="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in list" :key="i">
            <td scope="row">{{ i + 1 }}</td>
            <td scope="row" class="text-capitalize">{{ data.Name }}</td>
            <td scope="row" class="text-capitalize">{{ data?.Pencatatan || "-" }}</td>

            <td class="text-end">
              <a href="javascript:;" @click="updateList(data.SK)">
                <button class="btn btn-sm" :class="data.Status === 'active' ? 'bg-primary' : 'bg-secondary'">
                  <i class="bx bx-plus text-white"></i>
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
      ...mapState("setupmutabaah", ["list"]),
    },
    methods: {
      ...mapActions("setupmutabaah", ["updateList"]),
    },
  };
</script>

<style scoped></style>
