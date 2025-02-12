import Swal from "sweetalert2"

const today = new Date();
const year = today.getFullYear();
let month = (today.getMonth() + 1).toString().padStart(2, '0');
let day = today.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

export default {
  async inputLaporan({ commit, state, dispatch }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const qrcode = state.decodedText.replace(/#/g, '%23')
    try {
      const result = await this.$apiOB.$get(`get-log?type=report-scan&qrcode=${qrcode}&name=${data.laporan}`)
      if (result) {
        Swal.fire({
          text: 'Laporan berhasil terkirim!',
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        commit('resetLaporan')
        commit('btn')
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  // report
  async changeUnitReport({ commit, dispatch, state }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const reqReport = this.$apiOB.$get(`get-log?method=report`)
      const reqPegawai = this.$apiBase.$get(`get-pegawai?type=crew&program=sarpras&Jabatan=maintenance`)
      const [resReport, resPegawai] = await Promise.all([reqReport, reqPegawai])
      if (resReport, resPegawai) {
        commit('setState', { key: 'listLaporan', value: resReport })
        commit('setState', { key: 'listPegawai', value: resPegawai })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
    }
  },
  async inputReport({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const sk = state.updateToReport
    const request = {
      Status: 'menunggu',
      PIC: data.PIC,
      Timestamp: {
        menunggu: `${data.date} ${data.time}`
      }
    }
    try {
      const result = await this.$apiOB.$put(`update-log?type=my-job-maintenance&step=tasking&sk=${sk}`, request)
      if (result) {
        Swal.fire({
          text: 'Laporan berhasil diInput!',
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        commit('inputReport', sk)
        commit('btn')
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async deleteReport({ commit, state }, sk) {
    const name = state.listLaporan.find((x) => x.SK === sk).Name
    const result = await Swal.fire({
      title: name,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await this.$apiOB.$delete(
        `delete-log?value=maintenance&sk=${sk}`
      );
      commit('deleteReport', sk);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },


  // activity
  async changeUnitActivity({ commit, dispatch, state }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const reqActivity = this.$apiOB.$get(`get-log?method=activity`)
      const reqPegawai = this.$apiBase.$get(`get-pegawai?type=crew&program=sarpras&Jabatan=maintenance`)
      const [resActivity, resPegawai] = await Promise.all([reqActivity, reqPegawai])
      if (resActivity, resPegawai) {
        commit('setState', { key: 'activity', value: resActivity })
        commit('setState', { key: 'listPegawai', value: resPegawai })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async updateActivity({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const sk = state.updateToActivity.SK
    const request = {
      PIC: data.PIC,
      Timestamp: {
        menunggu: `${data.date} ${data.time}`
      }
    }
    try {
      const result = await this.$apiOB.$put(`update-log?type=my-job-maintenance&step=tasking&sk=${sk}`, request)
      if (result) {
        Swal.fire({
          text: 'Laporan berhasil diupdate!',
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        result['SK'] = sk
        commit('updateActivity', result)
        commit('btn')
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  // performance
  async changeUnitPerformance({ commit, dispatch, state }) {
    dispatch('index/submitLoad', null, { root: true })
    commit('setState', { key: 'start', value: formattedDate })
    commit('setState', { key: 'end', value: formattedDate })
    try {
      const result = await this.$apiOB.$get(`get-log?method=performance&startdate=${state.start}&enddate=${state.end}`)
      if (result) {
        commit('setState', { key: 'performance', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async getReportPerformance({ commit, dispatch, state }) {
    dispatch('index/submitLoad', null, { root: true })
    try {
      const result = await this.$apiOB.$get(`get-log?method=performance&startdate=${state.start}&enddate=${state.end}`)
      if (result) {
        commit('setState', { key: 'performance', value: result })
        dispatch('index/submitLoad', null, { root: true })
      }
    } catch (error) {
      dispatch('index/submitLoad', null, { root: true })
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

}
