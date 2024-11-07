import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch('index/submitLoad', null, { root: true })
    const result = await this.$axios.$get(
      `get-settings?sk=${data}&type=periode`
    );
    dispatch('index/submitLoad', null, { root: true })
    commit('setPeriode', result);
  },
  async inputUtama({ commit, state }, event) {
    commit('btn')
    const data = Object.fromEntries(new FormData(event.target));
    const program = localStorage.getItem('program')
    data["Program"] = program

    let label = "";
    if (data.Semester.toLowerCase() === "ganjil") {
      const ta = +data.Tahun + 1; // Tambahkan 1 pada tahun kedua
      label = `${data.Tahun}/${ta}`;
    } else {
      const ta = +data.Tahun - 1; // Tambahkan 1 pada tahun kedua
      label = `${ta}/${data.Tahun}`;
    }
    data["Label"] = label;
    try {
      const result = await this.$axios.$post(
        `input-settings?sk=${program}&type=periode`,
        data
      );
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Data berhasil di input",
        showConfirmButton: false,
        timer: 1500,
      });
      commit('btn')
      commit('updatePeriode', result);
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
  async updateItem({ commit, state }, sk) {
    const i = state.periode.findIndex((x) => x.SK === sk)
    const key = state.periode[i].SK.replace('#', '%23')
    const status = state.periode[i].Status
    const semester = state.periode[i].Semester
    const tahun = state.periode[i].Tahun
    const result = await Swal.fire({
      title: `Semester ${semester} TH. ${tahun}`,
      text: `Subject akan di ${status === "active" ? "Non-Aktif" : "Aktif"
        }kan`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Ya, ${status === "active" ? "Non-Aktifkan" : "Aktifkan"
        }`,
    });
    const data = {
      Status: status === "active" ? "inactive" : "active",
    };

    if (result.isConfirmed) {
      const request = await this.$axios.$put(
        `update-settings?sk=${key}&type=periode`,
        data
      );
      if (request) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: `Data berhasil di ${status === "active" ? "Non-Aktifkan" : "Aktifkan"}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        const response = {
          key,
          Status: status === "active" ? "inactive" : "active",
        };
        commit('updateSubject', response);
      }
    }
  },
}
