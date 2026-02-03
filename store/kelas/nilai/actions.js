import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch }, data) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const result = await this.$apiBase.$get(`get-mapel?subject=pengajar&program=${program}`);
    if (result.length > 0) {
      commit("setUnit", result);
      dispatch("index/submitLoad", null, { root: true });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Anda tidak mengajar mapel apapun",
      });
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async getSantri({ commit, state, dispatch, rootState }, data) {
    dispatch("index/submitLoad", null, { root: true });

    // VALIDATION: Ensure all 3 dropdowns are selected before fetching
    if (!state.selectedKelas || !state.selectedSemester || !state.selectedMapel) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    const program = localStorage.getItem("program");
    const datas = {};

    // USE STATE FROM VUEX (Set by component)
    datas["Filter"] = `penilaian-${state.selectedMapel.Jurusan}`;
    datas["Kelas"] = state.selectedKelas; // Updated
    datas["Subject"] = state.selectedMapel.Nama;
    datas["Tahun"] = rootState.index.label; // Assuming Tahun is still global
    datas["Semester"] = state.selectedSemester; // Updated to use local selection
    datas["Penilaian"] = state.selectedMapel.Penilaian;

    try {
      const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}`, datas);
      const obj = { key: "santri", value: result.data };
      commit("setState", obj);
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }

    dispatch("index/submitLoad", null, { root: true });
  },
  async setPenilaian({ commit, state, dispatch, rootState }, data) {
    // VALIDATION: Ensure all 3 dropdowns are selected before fetching
    if (!state.selectedKelas || !state.selectedSemester || !state.selectedMapel) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    if (data.type === "button") {
      dispatch("index/submitLoad", null, { root: true });
      const skSantri = state.santri[state.openEdit.index].SK.replace("#", "%23");
      const kelas = state.santri[state.openEdit.index].Kelas;
      const tahun = rootState.index.label;
      const semester = state.selectedSemester;
      try {
        const mapelKey = convertToCapitalizedFormat(state.selectedMapel.Nama);
        const datas = {};
        datas["Subject"] = state.selectedMapel.Nama;
        datas["SubAttribute"] = state.openEdit.key;
        datas[mapelKey] = `${state.nilai}/${state.selectedMapel.Penilaian[state.openEdit.key]}`;
        if (state.nilai > 100) {
          Swal.fire({
            title: "Warning!",
            text: "Nilai tidak boleh lebih dari 100.",
            icon: "warning",
            showConfirmButton: false,
            timer: 3000,
          });
          dispatch("index/submitLoad", null, { root: true });
        } else {
          const result = await this.$apiSantri.$post(
            `input-nilai-sisalam?type=nilaimapel&sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`,
            datas,
          );
          if (result) {
            dispatch("index/submitLoad", null, { root: true });
            data["result"] = result;
            commit("setPenilaian", data);
          }
        }
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: "Perubahan tidak tersimpan",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch("index/submitLoad", null, { root: true });
      }
    } else {
      if (state.openEdit && state.nilai) {
        dispatch("index/submitLoad", null, { root: true });
        data["type"] = "close";
        const skSantri = state.santri[state.openEdit.index].SK.replace("#", "%23");
        const kelas = state.santri[state.openEdit.index].Kelas;
        const tahun = rootState.index.label;
        const semester = state.selectedSemester;
        try {
          const mapelKey = convertToCapitalizedFormat(state.selectedMapel.Nama);
          const datas = {};
          datas["Subject"] = state.selectedMapel.Nama;
          datas["SubAttribute"] = state.openEdit.key;
          datas[mapelKey] = `${state.nilai}/${state.selectedMapel.Penilaian[state.openEdit.key]}`;
          if (state.nilai > 100) {
            Swal.fire({
              title: "Warning!",
              text: "Nilai tidak boleh lebih dari 100.",
              icon: "warning",
              timer: 3000,
              showConfirmButton: false,
            });
            dispatch("index/submitLoad", null, { root: true });
          } else {
            const result = await this.$apiSantri.$post(
              `input-nilai-sisalam?type=nilaimapel&sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`,
              datas,
            );
            if (result) {
              data["result"] = result;
              dispatch("index/submitLoad", null, { root: true });
              commit("setPenilaian", data);
            }
          }
        } catch (error) {
          dispatch("index/submitLoad", null, { root: true });
          Swal.fire({
            icon: "warning",
            title: "Perubahan tidak tersimpan",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      // close
      if (data) {
        data["type"] = "set";
        if (!state.nilai && state.openEdit) {
          Swal.fire({
            title: "Warning!",
            text: "Nilai tidak boleh kosong!",
            icon: "warning",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          commit("setPenilaian", data);
        }
      }
    }
  },
};

const convertToCapitalizedFormat = (text) => {
  const words = text.split(" ");

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  } else {
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("_");
  }
};
