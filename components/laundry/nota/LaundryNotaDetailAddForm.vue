<template>
  <div>
    <div class="mb-3 d-flex align-items-center gap-3">
      <nuxt-link :to="`/laundry/nota/${sk.replace(/#/g, '%23')}`">
        <i class='bx bx-left-arrow-alt p-2 text-white rounded-circle bg-primary'></i>
      </nuxt-link>
      <h2 class="fw-bold">Input Nota</h2>
    </div>
    <div class="row">
      <div class="col-12 col-md-5">
        <div class="card p-4 border-0 rounded-3 shadow">
          <div class="mb-3">
            <label for="tag" class="form-label">Scan Tag</label>
            <input type="number" id="tag" name="BagID" class="form-control" v-model="tag" autofocus>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nama</label>
            <input type="text" id="name" name="Name" class="form-control" :value="dataFromTag.Name">
          </div>
          <div class="mb-3">
            <label for="subject" class="form-label">Subject</label>
            <input type="text" id="subject" name="Subject" class="form-control" :value="dataFromTag.Subject">
          </div>
          <div class="">
            <label for="qty" class="form-label">Kuantiti</label>
            <input type="number" id="qty" name="QTY" class="form-control">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: ['sk'],
  computed: {
    ...mapState('laundry/nota', ['datasDetail', 'dataFromTag']),
    ...mapGetters('laundry/nota', ['getTag']),
    tag: {
      get() {
        return this.getTag
      },
      set(value) {
        this.$store.commit('laundry/nota/setState', { key: 'tag', value })
      }
    }
  },
  methods: {
    // ...mapMutations('mutabaah', ['showDetail'])
    showDetail(sk, subject) {
      this.$store.commit('mutabaah/showDetail', { sk, subject })
    },
    detailView(receipt) {
      this.$router.push(`/laundry/nota/${receipt}`)
    },
  },
  watch: {
    tag() {
      this.$store.dispatch('laundry/nota/getDataTag')
    }
  },
};
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}

label, input {
  font-size: 14px;
}

button {
  font-size: 12px;
}

#tag::-webkit-inner-spin-button,
#tag::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#tag {
  -moz-appearance: textfield;
  /* Untuk Firefox */
}
</style>
