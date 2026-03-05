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
                    @click="handleDelete(category, data.SK)"
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
  import Swal from "sweetalert2";
  import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    computed: {
      ...mapState("setupmutabaah", ["list"]),
    },
    methods: {
      ...mapMutations("setupmutabaah", ["updateMutabaah"]),
      ...mapActions("setupmutabaah", ["delPencatatan"]), // Map the action here

      // Wrapper method to handle the click from the template
      handleDelete(category, sk) {
        Swal.fire({
          title: "Are you sure?",
          text: `Do you want to delete the category "${category}"?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            // Bundle the arguments into a single object payload for Vuex
            this.delPencatatan({ category, sk });
          }
        });
      },
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
