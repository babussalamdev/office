import Swal from "sweetalert2";

export default {
  async changeUnit({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    try {
      const resPeriode = await this.$apiBase.$get(`get-settings?sk=${program}&type=periode`);
      let currentLabel = rootState.index.label;

      if (!currentLabel) {
        currentLabel = localStorage.getItem("label"); // Only if you save it here
      }

      if (resPeriode && currentLabel) {
        const availableSemesters = resPeriode.filter((item) => item.Label === currentLabel);
        console.log(availableSemesters);
        commit("setState", { key: "semesterOptions", value: availableSemesters });

        // FIX: Set the initial selected semester to the active one if it's currently empty
        if (!state.selectedSemester && rootState.index.semester) {
          commit("setState", { key: "selectedSemester", value: rootState.index.semester });
        }
      } else {
        console.warn("Label Tahun Ajaran missing, cannot filter semesters");
      }
    } catch (error) {
      console.error("Failed to fetch periode:", error);
    }

    // 2. Fetch Active Settings (Used by the Input Page)
    const halaqah = this.$auth.user.Halaqah[program];
    const semester = rootState.index.semester;

    if (!semester) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    try {
      // We use state.selectedSemester here so it respects user changes later,
      // but defaults to the active one on first load
      const data = await this.$apiBase.$get(`get-settings?program=${program}&type=nilaiquran&hlq=${halaqah}&smstr=${state.selectedSemester}`);
      commit("setState", { key: "selectedQuran", value: data.quran });

      if (data.quran) {
        const userPermissions = rootState.index.permissions;
        if (!userPermissions) {
          dispatch("index/submitLoad", null, { root: true });
          return;
        }

        const datas = {
          Filter: "penilaian-quran",
          Halaqah: halaqah,
          Subject: "quran",
          Tahun: rootState.index.label,
          Semester: state.selectedSemester,
          Penilaian: state.selectedQuran.Penilaian,
        };

        if (userPermissions.includes("absensi pengampu")) {
          // Koordinator mode
          const Halaqah = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=halaqah`);
          commit("setState", { key: "selectHalaqah", value: Halaqah });

          const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}&type=pengampu`, datas);
          if (result) {
            commit("setState", { key: "santri", value: result.data });
            commit("setState", { key: "selectedByHalaqah", value: halaqah });

            const newData = state.selectedQuran.Penilaian || {};
            const newHeaders = { Nama: "" };
            for (const [key, value] of Object.entries(newData)) newHeaders[key] = value;
            if (state.th.hasOwnProperty("Total")) newHeaders["Total"] = state.th["Total"];

            commit("setState", { key: "th", value: newHeaders });
          }
        } else {
          // Pengampu Biasa mode
          const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}&type=pengampu`, datas);
          if (result) {
            commit("setState", { key: "santri", value: result.data });

            const newData = state.selectedQuran.Penilaian || {};
            const newHeaders = { Nama: "" };
            for (const [key, value] of Object.entries(newData)) newHeaders[key] = value;
            if (state.th.hasOwnProperty("Total")) newHeaders["Total"] = state.th["Total"];

            commit("setState", { key: "th", value: newHeaders });
          }
        }
      } else {
        Swal.fire({ position: "center", icon: "warning", text: "Penilaian untuk Quran belum di setup" });
      }
    } catch (error) {
      Swal.fire({ title: "Warning!", text: "Penilaian Tahfidz belum di setup", icon: "warning" });
    }
    dispatch("index/submitLoad", null, { root: true });
  },

  // --- RESTORED COORDINATOR ACTIONS ---
  async getType({ commit, state, dispatch }) {
    try {
      const type = state.selectedType;
      const program = localStorage.getItem("program");
      const result = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=${type}`);
      if (result) {
        commit("setType", { result, type });
      }
    } catch (error) {
      Swal.fire({ text: error, icon: "error", showConfirmButton: false, timer: 3000 });
    }
  },

  async getByKelas({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const kelas = state.selectedByKelas;

    // FIX: Use the user-selected semester from state, not the root default
    const semester = state.selectedSemester;

    try {
      const data = await this.$apiBase.$get(`get-settings?program=${program}&type=nilaiquran&kls=${kelas}&smstr=${semester}`);
      commit("setState", { key: "selectedQuran", value: data });

      if (data) {
        const datas = {
          Filter: "penilaian-quran",
          Kelas: kelas,
          Subject: "quran",
          Tahun: rootState.index.label,
          Semester: semester, // FIX: Use the selected semester here too
          Penilaian: state.selectedQuran.Penilaian,
        };
        const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}&type=pengampu`, datas);
        if (result) {
          commit("setState", { key: "santri", value: result.data });
          const newData = state.selectedQuran.Penilaian || {};
          const newHeaders = { Nama: "" };
          for (const [key, value] of Object.entries(newData)) newHeaders[key] = value;
          if (state.th.hasOwnProperty("Total")) newHeaders["Total"] = state.th["Total"];
          commit("setState", { key: "th", value: newHeaders });
        }
      } else {
        Swal.fire({ position: "center", icon: "warning", text: "Penilaian untuk Quran belum di setup" });
      }
    } catch (error) {
      Swal.fire({ title: "Warning!", text: "Penilaian Tahfidz belum di setup", icon: "warning" });
    }
    dispatch("index/submitLoad", null, { root: true });
  },

  async getByHalaqah({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const halaqah = state.selectedByHalaqah;

    // FIX: Use the user-selected semester from state
    const semester = state.selectedSemester;

    try {
      const data = await this.$apiBase.$get(`get-settings?program=${program}&type=nilaiquran&hlq=${halaqah}&smstr=${semester}`);
      commit("setState", { key: "selectedQuran", value: data.quran });

      if (data.quran) {
        const datas = {
          Filter: "penilaian-quran",
          Halaqah: halaqah,
          Subject: "quran",
          Tahun: rootState.index.label,
          Semester: semester, // FIX: Use the selected semester here too
          Penilaian: state.selectedQuran.Penilaian,
        };
        const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}&type=pengampu`, datas);
        if (result) {
          commit("setState", { key: "santri", value: result.data });
          const newData = state.selectedQuran.Penilaian || {};
          const newHeaders = { Nama: "" };
          for (const [key, value] of Object.entries(newData)) newHeaders[key] = value;
          if (state.th.hasOwnProperty("Total")) newHeaders["Total"] = state.th["Total"];
          commit("setState", { key: "th", value: newHeaders });
        }
      } else {
        Swal.fire({ position: "center", icon: "warning", text: "Penilaian untuk Quran belum di setup" });
      }
    } catch (error) {
      Swal.fire({ title: "Warning!", text: "Penilaian Tahfidz belum di setup", icon: "warning" });
    }
    dispatch("index/submitLoad", null, { root: true });
  },

  async setPenilaian({ commit, state, dispatch, rootState }, data) {
    const program = localStorage.getItem("program");
    if (data.type === "button") {
      dispatch("index/submitLoad", null, { root: true });
      const skSantri = state.santri[state.openEdit.index].SK.replace("#", "%23");
      const kelas = state.santri[state.openEdit.index].Kelas;
      const tahun = rootState.index.label;
      const semester = state.selectedSemester;
      try {
        const Key = "Quran";
        const datas = {
          Subject: Key,
          SubAttribute: state.openEdit.key,
          [Key]: `${state.nilai}/${state.selectedQuran.Penilaian[state.openEdit.key]}`,
        };
        if (state.nilai > 100) {
          Swal.fire({ title: "Warning!", text: "Nilai tidak boleh lebih dari 100.", icon: "warning", showConfirmButton: false, timer: 1500 });
        } else {
          const result = await this.$apiSantri.$post(
            `input-nilai-sisalam?type=nilaiquran&sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`,
            datas,
          );
          if (result) {
            data["result"] = result;
            commit("setPenilaian", data);
          }
        }
      } catch (error) {
        Swal.fire({ icon: "warning", title: "Perubahan tidak tersimpan", showConfirmButton: false, timer: 1500 });
      }
      dispatch("index/submitLoad", null, { root: true });
    } else {
      if (state.openEdit && state.nilai) {
        dispatch("index/submitLoad", null, { root: true });
        data["type"] = "close";
        const skSantri = state.santri[state.openEdit.index].SK.replace("#", "%23");
        const kelas = state.santri[state.openEdit.index].Kelas;
        const tahun = rootState.index.label;
        const semester = state.selectedSemester;
        try {
          const Key = "Quran";
          const datas = {
            Subject: Key,
            SubAttribute: state.openEdit.key,
            [Key]: `${state.nilai}/${state.selectedQuran.Penilaian[state.openEdit.key]}`,
          };
          if (state.nilai > 100) {
            Swal.fire({ title: "Warning!", text: "Nilai tidak boleh lebih dari 100.", icon: "warning", timer: 1500, showConfirmButton: false });
          } else {
            const result = await this.$apiSantri.$post(
              `input-nilai-sisalam?type=nilaiquran&sksantri=${skSantri}&tahun=${tahun}&semester=${semester}&Kelas=${kelas}`,
              datas,
            );
            if (result) {
              data["result"] = result;
              commit("setPenilaian", data);
            }
          }
        } catch (error) {
          Swal.fire({ icon: "warning", title: "Perubahan tidak tersimpan", showConfirmButton: false, timer: 1500 });
        }
        dispatch("index/submitLoad", null, { root: true });
      }
      if (data) {
        data["type"] = "set";
        if (!state.nilai && state.openEdit) {
          Swal.fire({ title: "Warning!", text: "Nilai tidak boleh kosong!", icon: "warning", timer: 1500, showConfirmButton: false });
        } else {
          commit("setPenilaian", data);
        }
      }
    }
  },

  // --- REPORT SPECIFIC ACTIONS ---
  async changeUnitBySemester({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    commit("resetForNewSemester");

    const program = localStorage.getItem("program");
    const status = state.selectedSemester.Status;
    const tahun = state.selectedLabel;
    const semester = state.selectedSemester.Semester;

    try {
      if (status === "inactive") {
        const result = await this.$apiBase.$get(`get-settings?sk=${tahun}%23${semester}%23&type=report-halaqah&program=${program}`);
        commit("setState", { key: "listKelas", value: result });
      } else {
        const userHalaqah = this.$auth.user.Halaqah[program];
        if (userHalaqah === "off") {
          const result = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=halaqah`);
          commit("setState", { key: "listKelas", value: result });
        } else {
          const singleOption = [{ SK: `${program}#${userHalaqah}`, Nama: userHalaqah }];
          commit("setState", { key: "listKelas", value: singleOption });
        }
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Gagal memuat data halaqah" });
    }
    dispatch("index/submitLoad", null, { root: true });
  },

  async getSantri({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    if (!state.selectedKelas) {
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    const rawHalaqah = state.selectedKelas.SK ? state.selectedKelas.SK.split("#")[1] : state.selectedKelas;
    const datas = {
      Filter: "penilaian-quran",
      Halaqah: rawHalaqah,
      Subject: "quran",
      Tahun: state.selectedLabel,
      Semester: state.selectedSemester.Semester,
    };

    try {
      const settingData = await this.$apiBase.$get(`get-settings?program=${program}&type=nilaiquran&hlq=${rawHalaqah}&smstr=${datas["Semester"]}`);

      if (!settingData.quran) {
        Swal.fire({ icon: "warning", text: "Setting penilaian belum ada." });
        dispatch("index/submitLoad", null, { root: true });
        return;
      }

      commit("setState", { key: "selectedQuran", value: settingData.quran });
      datas["Penilaian"] = settingData.quran.Penilaian;

      const result = await this.$apiSantri.$put(`get-nilai-sisalam?program=${program}&type=pengampu`, datas);

      if (result && result.data) {
        commit("setState", { key: "santri", value: result.data });

        const newData = settingData.quran.Penilaian || {};
        const newHeaders = { Nama: "", Halaqah: "" };
        for (const [key, value] of Object.entries(newData)) newHeaders[key] = value;
        if (state.th.hasOwnProperty("Total")) newHeaders["Total"] = state.th["Total"];
        commit("setState", { key: "th", value: newHeaders });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: "Gagal mengambil data nilai." });
    }

    dispatch("index/submitLoad", null, { root: true });
  },
};
