<template>
  <div>
    <div class="row mb-3">
      <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
        <h2 style="font-size: 14px;">Authority Table</h2>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-end">
        <div class="input-group">
          <span style="font-size: 12px !important;" class="bi bi-search input-group-text"></span>
          <input style="font-size: 12px !important;" v-model="search" type="text" class="form-control"
            placeholder="Search">
        </div>
      </div>
    </div>
    <div class="table-responsive white-space-nowrap animate__animated animate__fadeInUp">
      <table class="table table-hover table-striped">
        <thead>
          <tr>
            <th v-for="(data, index) in th" :key="index">{{ index }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in filteredDatas" :key="index">
            <td class="text-capitalize align-middle nowrap">{{ data.Nama }}</td>
            <td v-for="(value, i) in data.Authority" :key="i">
              <div class="form-switch">
                <input :checked="value === 'on'"
                v-if="(i === 'laundry' && hasPersonaliaRM) ||
                  (i === 'perpus' && hasPersonalia) ||
                  (i === 'ob' && hasPersonaliaSR) ||
                  i !== 'laundry' && i !== 'perpus' && i !== 'ob'"
                @change="
                  statusAuthority(
                    data.SK,
                    i,
                    $event
                  )
                  " class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import formatSet from '~/mixins/formatSet';
export default {
  mixins: [formatSet],
  computed: {
    ...mapState('authority', ['authority', 'th', 'datas']),
    ...mapState("index", ["personalia", 'personaliaKerumahtanggaan', 'personaliaSarpras']),
    ...mapGetters('authority', ['getSearch', 'filteredDatas']),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.$store.commit('authority/setState', { key: 'search', value })
      }
    },
    hasPersonalia() {
      return this.personalia === 'on' ? true : false
    },
    hasPersonaliaRM() {
      return this.personaliaKerumahtanggaan === 'on' ? true : false
    },
    hasPersonaliaSR() {
      return this.personaliaSarpras === 'on' ? true : false
    },
  },
  methods: {
    ...mapActions('authority', ['changeAuthority']),
    statusAuthority(sk, type, event) {
      this.changeAuthority({ sk, type, event })
    }
  },
};
</script>

<style></style>
