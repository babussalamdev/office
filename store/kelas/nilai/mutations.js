import Swal from "sweetalert2";

export default {
  globalLoad(state) {
    state.globalLoad = state.globalLoad ? false : true;
  },
  setPeriode(state, data) {
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
  setState(state, data) {
    // Handle Santri Data Parsing
    if (data.key === "santri") {
      const remappedData = data.value.map((item) => {
        const penilaian = item.Penilaian;
        const remappedPenilaian = Object.keys(penilaian).reduce((acc, key) => {
          const [value] = penilaian[key].split("/");
          acc[key] = Number(value);
          return acc;
        }, {});
        return { ...item, Penilaian: remappedPenilaian };
      });
      state[data.key] = remappedData;
    }
    // Handle Update Santri (Import)
    else if (data.key === "updateSantri") {
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

  setUnit(state, data) {
    state.select = data;
    state.santri = [];
  },

  setPenilaian(state, data) {
    // ... (Keep your existing setPenilaian logic) ...
    if (data["type"] === "set" && !state.nilai) {
      state.santri[data.index].Penilaian[data.key] = isNaN(state.santri[data.index].Penilaian[data.key])
        ? "0"
        : state.santri[data.index].Penilaian[data.key].toString();
      state.nilai = state.santri[data.index].Penilaian[data.key];
      if (state.santri[data.index].Penilaian[data.key]) {
        state.openEdit = data;
      }
    } else if (data["type"] === "close") {
      state.santri[state.openEdit.index].Penilaian[state.openEdit.key] = +state.nilai;
      state.santri[state.openEdit.index].TotalScore = +data.result.Total;
      state.nilai = "";
      state.openEdit = "";
    } else if (data["type"] === "button") {
      state.santri[state.openEdit.index].Penilaian[state.openEdit.key] = +state.nilai;
      state.santri[state.openEdit.index].TotalScore = +data.result.Total;
      state.openEdit = "";
      state.nilai = "";
    }
  },

  btn(state) {
    state.btn = state.btn ? false : true;
  },
};
