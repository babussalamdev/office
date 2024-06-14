import Swal from "sweetalert2";
export default {
  async changeUnit({ commit }, data) {
    const result = await this.$axios.$get(
      `settings-get-kelas?sk=${data}`
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
    data["Program"] = localStorage.getItem("program");
    try {
      const result = await this.$axios.$post(
        `settings-input-kelas?subject=kelas`,
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
    const key = sk.replace('#', '%23')
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
        `settings-delete-kelas?subject=kelas&sk=${key}`
      );
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
      commit('deleteKelas', key);
    }
  },

  // jurusan
  async inputJurusan({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Program"] = localStorage.getItem("program");
    try {
      const result = await this.$axios.$post(
        `settings-input-kelas?subject=jurusan`,
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
    const key = sk.replace('#', '%23')
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
        `settings-delete-kelas?subject=jurusan&sk=${key}`
      );
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
        commit('deleteJurusan', key);
      }
    }
  },

  // ekskull
  async inputEkskull({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    data["Program"] = localStorage.getItem("program");
    try {
      const result = await this.$axios.$post(
        `settings-input-kelas?subject=ekskull`,
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
    const key = sk.replace('#', '%23')
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
        `settings-delete-kelas?subject=ekskull&sk=${key}`
      );
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
      commit('deleteEkskull', key);
    }
  },
}
