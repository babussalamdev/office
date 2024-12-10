import Swal from "sweetalert2"
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    try {
      const result = await this.$apiLaundry.$get(`get-laundry?program=${program}&type=chart`)
      if (result) {
        commit('setPage', result)
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async dataNotaLaundryAdd({ commit, state }) {
    commit('btn')
    const program = localStorage.getItem('program')
    try {
      const data = {}
      const result = await this.$apiLaundry.$post(`input-laundry?program=${program}&type=chart`, data)
      if (result) {
        commit('setAddNota', result)
        commit('btn')
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  //detail
  async getDetail({ commit, dispatch }, id) {
    dispatch('index/submitLoad', null, { root: true })
    const part2 = id.split("#")[1];
    const identity = part2.slice(-3);
    const program = localStorage.getItem('program')
    try {
      const result = await this.$apiLaundry.$get(`get-laundry?program=${program}&type=inchart&chart=${identity}`)
      if (result) {
        commit('setGetDetail', result)
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async getDataTag({ commit, dispatch, state }) {
    commit("CLEAR_TIMEOUT");
    const timeout = setTimeout(() => {
      dispatch("fetchTagData");
    }, 500);
    commit("SET_TIMEOUT", timeout);

  },
  async fetchTagData({ state, commit, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiLaundry.$get(`get-bag?type=input-laundry&SK=${state.tag}`)
      if (result) {
        commit('setDataFromTag', result)
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async addDataPerSantri({ commit, state }, { event, route }) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    data['QTY'] = +data.QTY
    const part2 = route.sk.split("#")[1];
    const identity = part2.slice(-3);
    const program = localStorage.getItem('program')
    try {
      const result = await this.$apiLaundry.$post(`input-laundry?program=${program}&type=inchart&chart=${identity}`, data)
      if (result) {
        this.$router.push(`/laundry/nota/${route.sk.replace('#', '%23')}`);
        commit('btn')
      }
    } catch (error) {
      commit('btn')
      if (error.response) {
        const { status, data } = error.response
        if (status === 409) {
          Swal.fire({
            icon: "warning",
            text: 'Santri tersebut sudah terdata!',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "warning",
            text: error,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  },
}
