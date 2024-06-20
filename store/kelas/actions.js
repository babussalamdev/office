import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const result = await this.$axios.$get(
      `get-settings?sk=${data}&type=kelas`
    );
    commit('setData', result);
  },
  async loadKelasPenilaian({ commit }) {
    const program = localStorage.getItem('program')
    const result = await this.$axios.$get(
      `get-database?subject=options&program=${program}&category=kelas`
    )
    commit('setkelasPenilaian', result)
  },
  async selectMapel({ commit }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$axios.$get(
      `get-nilai?subject=pengajar&program=${program}&kelas=${data}`
    )
    commit('selectMapel', result)
  },
  async selectPeriode({ commit }) {
    const program = localStorage.getItem('program')
    const result = await this.$axios.$get(
      `get-database?subject=options&program=${program}&category=periode`
    )
    commit('setPeriode', result)
  },
  async getNilai({ commit }, data) {
    const program = localStorage.getItem('program')
    const result = await this.$axios.$get(
      `get-nilai?program=${program}&kelas=${data.kelas}&mapel=${data.mapel}&jurusan=${data.jurusan}&periode=${data.periode}&subject=data`
    )
    commit('setNilai', result)
  },

  // settings-kelas
  async inputKelas({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem('program')
    data["Program"] = program
    try {
      const result = await this.$axios.$post(
        `input-settings?sk=${program}&type=kelas`,
        data
      );
      if (result) {
        commit('btn')
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('updateKelas', result);
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
  async deleteKelas({ commit, state }, sk) {
    const i = state.kelas.findIndex((x) => x.SK === sk)
    const name = state.kelas[i].Nama
    const key = sk.replace(/#/g, '%23')
    const result = await Swal.fire({
      title: name,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    });
    if (result.isConfirmed) {
      await this.$axios.$delete(
        `delete-settings?sk=${key}&type=kelas`
      );
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
      commit('deleteKelas', sk);
    }
  },

  // jurusan
  async inputJurusan({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem('program')
    data["Program"] = program
    try {
      const result = await this.$axios.$post(
        `input-settings?sk=${program}&type=jurusan`,
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
        commit('updateJurusan', result);
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
  async deleteJurusan({ commit, state }, sk) {
    const i = state.jurusan.findIndex((x) => x.SK === sk)
    const name = state.jurusan[i].Nama
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
      const result = await this.$axios.$delete(
        `delete-settings?sk=${key}&type=jurusan`
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('deleteJurusan', sk);
      }
    }
  },

  // ekskull
  async inputEkskull({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem('program')
    data["Program"] = program
    try {
      const result = await this.$axios.$post(
        `input-settings?sk=${program}&type=ekskull`,
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
        commit('updateEkskull', result);
      }
    } catch (error) {
      this.btn = true;
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async deleteItem({commit, state}, sk) {
    const i = state.ekskull.findIndex((x) => x.SK === sk)
    const name = state.ekskull[i].Nama
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
      await this.$axios.$delete(
        `delete-settings?sk=${key}&type=ekskull`
      );
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
      commit('deleteEkskull', sk);
    }
  },
}
