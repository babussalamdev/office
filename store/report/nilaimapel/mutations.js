export default {
  setState(state, data) {
    if (data.key === "kelas") {
      state[data.key] = data.value;
      state.santri = [];
      state.selectedMapel = "";
      state.selectedKelas = ""; // Important to reset selected class when list changes
      state.mapel = "";
      state.th = { Nama: "", Total: "" };
    } else if (data.key === "selectedLabel") {
      state.semester = state.label[data.value];
      state.selectedSemester = "";
      state.santri = [];
      state.selectedMapel = "";
      state.selectedKelas = "";
      state.mapel = "";
      state.th = { Nama: "", Total: "" };
      state[data.key] = data.value;
    } else if (data.key === "selectedSemester") {
      state[data.key] = data.value;
    } else if (data.key === "santri") {
      if (data.status === "active") {
        const newData = state.selectedMapel?.Penilaian || {};
        // Menyiapkan objek header baru
        const newHeaders = { Nama: "" };
        // Tambahkan data baru dari selectedMapel.Penilaian
        for (const [key, value] of Object.entries(newData)) {
          newHeaders[key] = value;
        }
        // Tambahkan 'Total' jika ada sebelumnya
        if (state.th.hasOwnProperty("Total")) {
          newHeaders["Total"] = state.th["Total"];
        }
        console.log(newHeaders);
        // Update th dengan header baru
        state.th = newHeaders;
      } else {
        const penilaian = data.value[0].Penilaian;
        const newData = penilaian || {};
        // Menyiapkan objek header baru
        const newHeaders = { Nama: "" };
        // Tambahkan data baru dari selectedMapel.Penilaian
        for (const [key, value] of Object.entries(newData)) {
          newHeaders[key] = value;
        }
        // Tambahkan 'Total' jika ada sebelumnya
        if (state.th.hasOwnProperty("Total")) {
          newHeaders["Total"] = state.th["Total"];
        }
        // Update th dengan header baru
        state.th = newHeaders;
      }
      state[data.key] = data.value;
    } else if (data.key === "updateSantri") {
      const newData = data.value.map((item) => {
        const penilaian = item.feedback;

        const remappedPenilaian = Object.keys(penilaian).reduce((acc, key) => {
          const [value, weight] = penilaian[key].split("/").map(Number);

          // Calculate the weighted score
          const rawWeighted = (weight / 100) * value;

          // Round to 2 decimal places to prevent 20.000000001
          acc[key] = Number(rawWeighted.toFixed(2));

          return acc;
        }, {});

        // --- FIX: YOU MUST RETURN THE ITEM HERE ---
        return {
          ...item,
          Penilaian: remappedPenilaian,
        };
      });

      const updatedData = state.santri.map((oldItem) => {
        // Now newData is valid, so .find() will work
        const newItem = newData.find((n) => n && n.SK === oldItem.SK);

        if (newItem) {
          const updatedItem = {
            ...oldItem,
            ...newItem,
            // Calculate Total Score and round it to fix the 60.000000005 issue
            TotalScore: Number(
              Object.values(newItem.Penilaian)
                .reduce((a, b) => a + b, 0)
                .toFixed(2),
            ),
          };

          delete updatedItem.Total;
          delete updatedItem.feedback;

          return updatedItem;
        }
        return oldItem;
      });

      state.santri = updatedData;
      $("#modalImport").modal("hide");
    } else {
      state[data.key] = data.value;
    }
  },
  setMapel(state, data) {
    state.selectedMapel = "";
    state.santri = [];
    state.mapel = data.mapel || []; // Handle undefined
    state.th = { Nama: "", Total: "" };
  },
  setMapelSemester(state, data) {
    state.selectedMapel = "";
    state.santri = [];
    state.mapel = data.mapel;
  },
  setPeriode(state, data) {
    console.log(data);
    // Menggunakan reduce untuk mengelompokkan data berdasarkan Label
    const groupedData = data.resPeriode.reduce((acc, item) => {
      // Jika key untuk Label belum ada, buat array untuk menyimpan objek
      if (!acc[item.Label]) {
        acc[item.Label] = [];
      }
      // Push objek baru berisi Semester dan Status
      acc[item.Label].push({
        Semester: item.Semester,
        Status: item.Status,
      });
      return acc;
    }, {});

    // console.log(groupedData);
    state.periode = data.resPeriode;
    state.label = groupedData;
    state.selectedLabel = data.label;
    if (groupedData[data.label]) {
      const datas = groupedData[data.label];
      state.selectedSemester = datas.find((item) => item.Semester === data.semester);
      state.semester = groupedData[data.label];
    }
  },
  setNilai(state, data) {
    // Handle Update Santri (Import)
    if (data.key === "updateSantri") {
      // ... (Keep your existing updateSantri logic here) ...
      // I omitted the long logic for brevity, paste your existing logic here
      const newData = data.value.map((item) => {
        const penilaian = item.feedback;
        delete item.feedback;
        const remappedPenilaian = Object.keys(penilaian).reduce((acc, key) => {
          const [value] = penilaian[key].split("/");
          acc[key] = Number(value);
          return acc;
        }, {});
        return {
          ...item,
          Penilaian: remappedPenilaian,
        };
      });
      const updatedData = state.santri.map((oldItem) => {
        const newItem = newData.find((newItem) => newItem.SK === oldItem.SK);
        if (newItem) {
          const updatedItem = {
            ...oldItem,
            ...newItem,
            TotalScore: newItem.Total,
          };
          delete updatedItem.Total;
          return updatedItem;
        }
      });
      state.santri = updatedData;
      $("#modalImport").modal("hide");
    }
    // Handle General State Updates (Kelas, Semester, Mapel)
    else {
      state[data.key] = data.value;
    }
  },
  resetForNewSemester(state) {
    state.kelas = []; // Clear class list (will be refetched if inactive)
    state.selectedKelas = "";
    state.mapel = [];
    state.selectedMapel = "";
    state.santri = [];
    state.th = { Nama: "", Total: "" };
  },

  resetWithClass(state) {
    state.santri = [];
    state.selectedMapel = "";
    state.selectedKelas = "";
    state.mapel = [];
    state.th = { Nama: "", Total: "" };
  },
};
