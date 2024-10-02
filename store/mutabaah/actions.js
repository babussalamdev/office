import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch, rootState }, data) {
    dispatch('index/submitLoad', null, { root: true });

    const program = localStorage.getItem('program');
    const halaqah = this.$auth.user.Halaqah[program];

    // Fungsi untuk menunggu hingga status terisi
    const waitForStatus = () => {
      return new Promise((resolve) => {
        const checkStatus = () => {
          const status = rootState.index.permissions;
          if (status && status.length > 0) {
            resolve(status);
          } else {
            setTimeout(checkStatus, 100); // Cek lagi setelah 100 ms
          }
        };
        checkStatus();
      });
    };

    // Tunggu hingga status terisi
    const status = await waitForStatus();

    if (status.includes('report tahfidz')) {
      const result = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=halaqah`)
      commit('setHalaqah', result)
      dispatch('index/submitLoad', null, { root: true });
      return;
    }

    const result = await this.$apiSantri.$get(
      `get-santri-sisalam?subject=halaqah&program=${program}&filter=${halaqah}`
    );

    if (result) {
      commit('setSantri', result);
      dispatch('index/submitLoad', null, { root: true });
    }
  },
  async getHalaqahKoordinator({ commit, dispatch, state }) {
    dispatch('index/submitLoad', null, { root: true });

    const program = localStorage.getItem('program');
    const halaqah = state.selectedHalaqah;
    const result = await this.$apiSantri.$get(
      `get-santri-sisalam?subject=halaqah&program=${program}&filter=${halaqah}`
    );

    if (result) {
      commit('setSantri', result);
      dispatch('index/submitLoad', null, { root: true });
    }
  },
  async getDetail({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const sk = data.replace('#', '%23')
    const subject = localStorage.getItem('subject')
    const reqDetail = this.$apiSantri.$get(`get-logs?subject=${subject}&sksantri=${sk}`)
    const reqSurah = this.$apiBase.$get(`get-quran?subject=surah`)
    const [resSurah, resDetail] = await Promise.all([reqSurah, reqDetail])
    commit('setDetailSantri', resDetail)
    commit('setSurah', resSurah)
    dispatch('index/submitLoad', null, { root: true })
  },
  // async kelasLoad({ commit, state }) {
  //   const program = localStorage.getItem('program')
  //   const result = await this.$apiSantri.$get(
  //     `get-santri-sisalam?subject=kelas&program=${program}&opsi=asrama&filter=${state.kelas}`
  //   );
  //   commit('setSantri', result);
  // },
  // async updateDataSantriAsrama({commit, state}, event) {
  //   commit('btn')
  //   const data = {};
  //   const program = localStorage.getItem("program");
  //   data["value"] = state.asramaShow;
  //   data["sort"] = state.updateData;
  //   try {
  //     const result = await this.$axios.$put(
  //       `update-santri?sk&program=${program}&bulk=Asrama`,
  //       data
  //     );
  //     if (result) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         text: "Your work has been saved",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       commit('btn')
  //       commit('updateAsramaSantri', data);
  //     }
  //   } catch (error) {
  //     commit('btn')
  //     console.log(error);
  //     Swal.fire({
  //       text: error,
  //       icon: "error",
  //       timer: 3000,
  //       timerProgressBar: false,
  //       showConfirmButton: false,
  //     });
  //   }
  // },
}
