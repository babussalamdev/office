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
              <th scope="col">NISN</th>
              <th scope="col">Orang Tua</th>
              <th scope="col">Alamat</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(san, index) in santri" :key="index">
              <!-- <td>
                <input type="checkbox" />
              </td> -->
              <td class="text-capitalize">{{ san.Nama }}</td>
              <td>{{ san.Nisn }}</td>
              <td class="text-capitalize">{{ san.Orangtua }}</td>
              <td class="text-capitalize">{{ san.Alamat }}</td>
              <td class="text-end">
                <a href="jacascript:;" @click="resetPassword(san.SK)">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  computed: {
    ...mapState("santri/database", ["santri", 'years', 'select']),
  },
  methods: {
    ...mapActions('santri/database', ['resetPassword']),
    ...mapMutations('santri/database', ['editItem', 'deleteItem']),
  },
};
</script>

<style lang="scss" scoped></style>
