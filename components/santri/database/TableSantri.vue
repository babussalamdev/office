<template>
  <div>
    <div>
      <div class="table-responsive">
        <!-- Modal -->
        <ModalSantri />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <!-- <th scope="col">
                <input type="checkbox" />
              </th> -->
              <th scope="col">Nama</th>
              <th scope="col">Username</th>
              <th scope="col">NISN</th>
              <th scope="col">Orang Tua</th>
              <th scope="col">Alamat</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(san, index) in filteredDatas" :key="index">
              <!-- <td>
                <input type="checkbox" />
              </td> -->
              <td class="text-capitalize">{{ san.Nama }}</td>
              <td>{{ san.Username }}</td>
              <td>{{ san.Nisn }}</td>
              <td class="text-capitalize">{{ san.Orangtua }}</td>
              <td class="text-capitalize">{{ san.Alamat }}</td>
              <td class="text-end">
                <a href="javascript:;" @click="resetPassword(san.SK)">
                  <button class="btn btn-sm btn-danger">
                    <i class='bx bx-reset'></i>
                  </button>
                </a>
                <a href="#" @click="editItem(san.SK)">
                  <button class="btn btn-sm btn-warning">
                    <i class="bx bx-pencil text-dark"></i>
                  </button>
                </a>
                <!-- <button @click="deleteItem(index)">

                </button> -->
                <a href="javascript:;" @click="deleteItem(san.SK)">
                  <button class="btn btn-sm" :class="santri[index].Status === 'active'
                    ? 'bg-primary'
                    : 'bg-secondary'
                    ">
                    <i class="material-icons text-white">
                      power_settings_new
                    </i>
                  </button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-group text-center float-end mt-3 mb-5" role="group">
      <button @click="page = 1" :disabled="page === 1" type="button" class="btn btn-primary btn-sm">
        &laquo;
      </button>
      <button @click="page--" :disabled="page === 1" type="button" class="btn btn-primary  btn-sm">
        Prev
      </button>
      <button class="btn btn-dark  btn-sm disabled">{{ `${page}` }}</button>
      <button @click="page++" :disabled="page >= Math.ceil(santri.length / perPage)" class="btn btn-primary  btn-sm">
        Next
      </button>
      <button @click="page = Math.ceil(santri.length / perPage)" :disabled="page >= Math.ceil(santri.length / perPage)"
        type="button" class="btn btn-primary  btn-sm">
        &raquo;
      </button>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState("santri/database", ["santri", 'years', 'select', 'perPage']),
    ...mapGetters('santri/database', ['filteredDatas', 'getPage']),
    page: {
      get() {
        return this.getPage
      },
      set(value) {
        this.$store.commit('santri/database/setState', { key: 'page', value })
      }
    }
  },
  methods: {
    ...mapActions('santri/database', ['resetPassword']),
    ...mapMutations('santri/database', ['editItem', 'deleteItem']),
  },
};
</script>

<style lang="scss" scoped></style>
