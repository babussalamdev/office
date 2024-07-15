<template>
  <div>
    <div>
      <div class="row mb-3">
        <div class="col-12 col-md-9 d-flex align-items-center">
          <h2 class="text-capitalize mb-3 mb-md-0">
            data {{ $route.name.replace("-", " ") }}
          </h2>
        </div>
        <div class="col-12 col-md-3 d-flex justify-content-end">
          <div class="input-group">
            <button type="button" class="btn btn-primary btn-sm" @click="editBulk(data)"
              :disabled="data.length > 0 ? false : true">
              Edit
            </button>
            <select name="Kelas" id="kelas" v-model="angkatan" @change="changeUnit" class="form-select select"
              required>
              <option value="" selected disabled>Angkatan</option>
              <option v-for="(data, index) in years" :key="index" :value="data">
                {{ data }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <!-- Modal -->
        <!-- <KelasSantriModal @resetSelect="resetSelect" /> -->
        <KelasSantriModal />
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">
                <input class="form-check-input" type="checkbox" v-model="selectAll" @change="selectAllCheckbox" />
              </th>
              <th scope="col">Nama Santri</th>
              <th scope="col">Kelas</th>
              <th scope="col">Asrama</th>
              <th scope="col">Halaqah</th>
              <th scope="col">Ekskull</th>
              <!-- <th scope="col" class="text-end">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in santri" :key="index">
              <td>
                <input class="form-check-input" type="checkbox" v-model="selectedItems[data.SK]"
                  @change="getCheckedNames" />
              </td>
              <td class="text-capitalize align-middle">
                <h1>{{ data.Nama }}</h1>
                <p class="text-secondary mt-1">{{ data.Nip }}</p>
              </td>
              <td class="text-capitalize align-middle text-white" style="background: #176b87">
                {{ data.Kelas ? data.Kelas : "-" }}
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Asrama ? data.Asrama : "-" }}
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Halaqah ? data.Halaqah : "-" }}
              </td>
              <td class="text-capitalize align-middle">
                {{ data.Ekskull ? data.Ekskull : "-" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      selection: false,
      data: [],
      selectAll: false,
      selectedItems: {},
      isDataEmpty: true,
    };
  },
  watch: {
    santri: 'resetSelect',
  },
  computed: {
    ...mapState("santri/kelas", ["santri", 'years', 'select']),
    ...mapGetters('santri/kelas', ['getAngkatan']),
    angkatan: {
      get() {
        return this.getAngkatan
      },
      set(value) {
        this.$store.commit('santri/kelas/setAngkatan', value)
      }
    }
  },
  methods: {
    ...mapActions('santri/kelas', ['changeUnit']),
    ...mapMutations('santri/kelas', ['editBulk']),
    selectAllCheckbox() {
      for (const item of this.santri) {
        this.$set(this.selectedItems, item.SK, this.selectAll);
      }
      this.getCheckedNames();
    },
    getCheckedNames() {
      const checkedNames = Object.keys(this.selectedItems).filter(
        (key) => this.selectedItems[key]
      );
      this.data = checkedNames;
    },
    resetSelect() {
      this.data = [];
      this.selectAll = false;
      this.selectedItems = {};
    },
  },
};
</script>
