import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    try {
      const resPeriode = await this.$apiBase.$get(`get-settings?sk=${program}&type=periode`);
      const label = rootState.index.label;
      const semester = rootState.index.semester;
      commit("setPeriode", { label, semester, resPeriode });

      const kelas = this.$auth.user.Kelas[program];
      if (kelas === "off") {
        const listKelas = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=kelas`);
        commit("setState", { key: "kelas", value: listKelas });
        dispatch("index/submitLoad", null, { root: true });
        return;
      }

      const result = await this.$apiBase.$get(`get-settings?sk=${program}%23${kelas}%23${semester}&type=mapel`);
      commit("setMapel", result);
      dispatch("index/submitLoad", null, { root: true });
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },

  // const program = localStorage.getItem('program')

  async getMapel({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const kelas = state.selectedKelas;
    const semester = rootState.index.semester;

    const status = state.selectedSemester.Status;

    if (status === "inactive") {
      const datas = {
        Filter: "mapel",
        Kelas: kelas,
        Tahun: state.selectedLabel,
        Semester: state.selectedSemester.Semester,
      };
      const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}`, datas);
      if (result.length > 0) {
        const arrayMapel = result.map((mataPelajaran) => ({ Nama: mataPelajaran }));
        commit("setMapel", { mapel: arrayMapel });
      } else {
        Swal.fire({
          icon: "error",
          title: "Mapel tidak ditemukan!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      const result = await this.$apiBase.$get(`get-settings?sk=${program}%23${kelas}%23${semester}&type=mapel`);
      commit("setMapel", result);
    }

    dispatch("index/submitLoad", null, { root: true });
  },
  async changeGetMapelSemester({ commit, state, dispatch }) {
    if (state.kelas.length > 0) {
      commit("resetWithClass");
    } else {
      dispatch("index/submitLoad", null, { root: true });
      const program = localStorage.getItem("program");
      const kelas = this.$auth.user.Kelas[program];

      const status = state.selectedSemester.Status;

      if (status === "inactive") {
        const datas = {
          Filter: "mapel",
          Kelas: kelas,
          Tahun: state.selectedLabel,
          Semester: state.selectedSemester.Semester,
        };
        const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}`, datas);
        const arrayMapel = result.map((mataPelajaran) => ({ Nama: mataPelajaran }));
        commit("setMapelSemester", { mapel: arrayMapel });
        // {"Filter":"mapel","Kelas":"7a","Tahun":"2024/2025","Semester":"ganjil"}
      } else {
        const result = await this.$apiBase.$get(`get-settings?sk=${program}%23${kelas}&type=mapel`);
        commit("setMapelSemester", result);
      }

      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async getSantri({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const datas = {};
    const status = state.selectedSemester.Status;
    datas["Subject"] = state.selectedMapel.Nama;
    datas["Tahun"] = state.selectedLabel;
    datas["Semester"] = state.selectedSemester.Semester;
    datas["Periode"] = status;
    try {
      if (status === "active") {
        datas["Filter"] = `report-${state.selectedMapel.Jurusan}`;
        datas["Kelas"] = state.selectedMapel.Kelas;
        datas["Penilaian"] = state.selectedMapel.Penilaian;
        const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}`, datas);
        console.log(datas);
        console.log(result);
        if (result) {
          const obj = { key: "santri", value: result.data, status };
          commit("setState", obj);
          dispatch("index/submitLoad", null, { root: true });
        }
      } else {
        datas["Filter"] = `report-non-jurusan`;
        datas["Kelas"] = !state.selectedKelas ? this.$auth.user.Kelas[program] : state.selectedKelas;
        datas["Penilaian"] = state.selectedMapel.Penilaian;
        const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}`, datas);
        console.log(datas);
        console.log(result);
        if (result) {
          const obj = { key: "santri", value: result.data, status };
          commit("setState", obj);
          dispatch("index/submitLoad", null, { root: true });
        }
      }
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
};
