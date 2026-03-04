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
            <td scope="row">
              <div v-if="data.Pencatatan && Object.keys(data.Pencatatan).length > 0" class="d-flex flex-wrap gap-2">
                <div v-for="(name, category) in data.Pencatatan" :key="category" class="input-group input-group-sm" style="width: auto">
                  <span class="input-group-text text-white text-capitalize fs-6 border-secondary" style="background-color: #176b87">
                    {{ category }}
                  </span>

                  <span class="input-group-text bg-white text-dark text-capitalize fs-6 border-secondary">
                    {{ name }}
                  </span>

                  <button
                    class="btn btn-outline-danger d-flex align-items-center px-1 border-secondary"
                    @click="delPencatatan(category, data.SK)"
                    title="Remove this category">
                    <i class="bx bx-x"></i>
                  </button>
                </div>
              </div>
              <span v-else>Methode pencatatan belum di masukan</span>
            </td>

            <td class="text-end">
              <a href="javascript:;" @click="updateMutabaah(data.SK)">
                <button class="btn btn-sm bg-primary">
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
      ...mapMutations("setupmutabaah", ["updateMutabaah"]),
    },
  };
</script>

<style scoped>
  .fs-6 {
    font-size: 12px !important;
  }

  tr th,
  tr td {
    white-space: nowrap;
  }
</style>
