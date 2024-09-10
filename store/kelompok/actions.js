import Swal from "sweetalert2";
export default {
  async changeUnitHalaqah({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const result = this.$apiBase.$get(
      `get-settings?sk=${data}&type=halaqah`
    );
    const kelas = this.$apiBase.$get(`get-settings?type=options&sk=smp&category=kelas`)
    const [ resResult, resKelas ] = await Promise.all([ result, kelas ])
    commit('setDataHalaqah', { resResult, resKelas });
    dispatch('index/submitLoad', null, { root: true })
  },
  async changeUnitAsrama({ commit }, data) {
    const result = await this.$axios.$get(
      `get-settings?sk=${data}&type=asrama`
    );
    commit('setDataAsrama', result);
  },

  // halaqah
  async inputHalaqah({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem('program')
    data["Program"] = program
    try {
      const result = await this.$apiBase.$post(
        `input-settings?sk=${program}&type=halaqah`,
        data
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        commit('updateHalaqah', result);
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
  async updateHalaqah({ commit, state}, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target))
    const sk = state.updateData.SK.replace('#', '%23')
    data['Status'] = state.updateData.Status
    data['Program'] = state.updateData.Program
    try {
      const result = await this.$apiBase.$put(`update-settings?sk=${sk}&type=halaqah`, data)
      if ( result ) {
        result['sk'] = state.updateData.SK
        commit('setKelasHalaqah', result)
        commit('btn')
        Swal.fire({
          icon: "success",
          text: "Berhasil diubah!",
          showConfirmButton: false,
          timer: 1500,
        });
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
  async deleteHalaqah({ commit, state }, sk) {
    const i = state.halaqah.findIndex((x) => x.SK === sk)
    const name = state.halaqah[i].Nama
    const key = sk.replace(/#/g, '%23')
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
      const result = await this.$apiBase.$delete(
        `delete-settings?sk=${key}&type=halaqah`
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('deleteHalaqah', sk);
      }
    }
  },

  // asrama
  async inputAsrama({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem('program')
    data["Program"] = program
    try {
      const result = await this.$apiBase.$post(
        `input-settings?sk=${program}&type=asrama`,
        data
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        commit('updateAsrama', result);
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
  async deleteItem({ commit, state }, sk) {
    const i = state.asrama.findIndex((x) => x.SK === sk)
    const name = state.asrama[i].Nama
    const key = sk.replace(/#/g, '%23')
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
      const result = await this.$apiBase.$delete(
        `delete-settings?sk=${key}&type=asrama`
      );
      if (result) {
        commit('deleteAsrama', sk);
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  },
}
