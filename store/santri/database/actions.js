import state from "./state";
import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, state, dispatch }, data) {
    const program = localStorage.getItem('program')
    const tahunMulai = 2018;
    const tahunSekarang = new Date().getFullYear();
    const years = Array.from(
      { length: tahunSekarang - tahunMulai + 2 },
      (_, index) => tahunMulai + index
    );
    const kelas = await this.$apiBase.$get(`get-settings?sk=${program}&type=kelas`)
    commit('setDatabase', { years, kelas: kelas.kelas });
  },
  async getSantri({ commit, state, dispatch }) {
    dispatch('index/submitLoad', null, { root: true })
    const program = localStorage.getItem('program')
    let result
    if ( state.angkatan ) {
      result = await this.$apiSantri.$get(
        `get-santri-sisalam?subject=${state.angkatan}&program=${program}&opsi=none`
      );
    } else {
      result = await this.$apiSantri.$get(
        `get-santri-sisalam?subject=kelas&program=${program}&opsi=${state.kelas}`
      );
    }
    commit('setSantri', result )
    dispatch('index/submitLoad', null, { root: true })
  },
  async inputSantri({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem("program");
    data['Program'] = program
    try {
      const result = await this.$apiSantri.$post(
        `input-santri-sisalam?method=single`,
        data
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${result.Password}`,
          text: "Password diatas harap disimpan!",
        });
        commit('btn')
        commit('inputSantriSingle', result);
      }
    } catch (error) {
      commit('btn')
      Swal.fire({
        text: error,
        icon: "error",
        timer: 3000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
    }
  },
  async updateSantri({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const key = state.updateData.SK.replace('#', '%23');
    const program = localStorage.getItem("program");
    data['Program'] = program
    try {
      const result = await this.$apiSantri.$put(
        `update-santri-sisalam?sk=${key}`,
        data
      );
      if(result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        data["SK"] = state.updateData.SK;
        commit('updateSantri', data);
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
  async deleteSantri({commit, state}, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const status = data.status;
    const note = data.alasan;
    const key = state.deleteData.SK.replace('#', '%23')
    const user = state.deleteData.Username;
    const program = localStorage.getItem("program");
    try {
      const result = await this.$apiSantri.$delete(
        `delete-santri-sisalam?username=${user}&sk=${key}&program=${program}&status=${status}&note=${note}`
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di non aktifkan",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('btn')
        const shortKey = state.deleteData.SK;
        commit('deleteSantri', shortKey);
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
      commit('btn')
    }
  },

  async resetPassword({ commit, state }, data ) {
    const i = state.santri.findIndex((x) => x.SK === data)
    const nama = state.santri[i].Nama
    try {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: `Anda akan mereset password akun ${nama}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, reset sekarang!'
      });

      if (result.isConfirmed) {
        const username = state.santri[i].Username
        const result = await this.$apiSantri.$put(`change-password-sisalam?username=${username}`)
        if ( result ) {
          await Swal.fire({
            title: 'Reset Berhasil!',
            text: `Kata sandi baru adalah: ${result.password}`,
            icon: 'success'
          });
        }
      } else {
        await Swal.fire({
          title: 'Dibatalkan',
          text: 'Reset kata sandi Anda dibatalkan.',
          icon: 'error'
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: 'Terjadi kesalahan saat mereset kata sandi.',
        icon: 'error'
      });
      console.error('Error mereset kata sandi:', error);
    }

  }
}
