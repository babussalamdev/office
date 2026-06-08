export default {
  btn(state) {
    state.btn = !state.btn;
  },
  setState(state, data) {
    state[data.key] = data.value;
  },
  setKelas(state, data) {
    state.kelas = data.kelas;
    state.quran = data.quran;
    state.periode = data.periode;

    const separatedPenilaian = data.quran.map((item) => {
      if (item.Penilaian) {
        // Mengambil nilai dari Penilaian dan mengubahnya menjadi array berisi string-format nama-bobot
        const penilaianArray = Object.entries(item.Penilaian).map(([nama, bobot]) => `${nama}-${bobot}`);
        return penilaianArray;
      } else {
        // Jika Penilaian tidak ada, kembalikan array kosong atau null sesuai kebutuhan
        return []; // atau return null; atau lakukan tindakan lainnya
      }
    });
    state.penilaian = separatedPenilaian;
  },
  inputQuran(state, value) {
    const i = state.quran.findIndex((x) => x.SK === value.SK);
    if (!state.penilaian[i]) {
      state.penilaian.push([]);
    }
    state.quran.push(value);
    state.quran.sort((a, b) => {
      return a.Sort - b.Sort;
    });

    $("#inputnilaiquran").modal("hide");
    $("#inputQuran")[0].reset();
  },
  deleteQuran(state, value) {
    const i = state.quran.findIndex((x) => x.SK === value);
    state.quran.splice(i, 1);
    state.penilaian.splice(i, 1);
  },

  // penilaian
  inputScore(state, value) {
    const i = state.quran.findIndex((x) => x.SK === value);

    $("#inputDataQuranPenilaian").modal("show");
    state.updateDataPenilaian = state.quran[i];
  },
  updatePenilaian(state, value) {
    // 1. Get the new string being added (e.g., "UAS-100")
    const newItemString = value.dataPenilaian.trim();

    // 2. Add it to your visual string array (Your original code)
    state["penilaian"][value.i].push(newItemString);

    // 3. Extract the 'Nama' and 'Bobot' from the string
    const lastHyphenIndex = newItemString.lastIndexOf("-");
    const namaToAdd = newItemString.substring(0, lastHyphenIndex).trim();
    const bobotToAdd = newItemString.substring(lastHyphenIndex + 1).trim();

    // 4. Reactively add it to the actual Penilaian object in state.quran
    const targetQuran = state.quran[value.i];

    // Fallback to an empty object if Penilaian doesn't exist yet
    const currentPenilaian = targetQuran.Penilaian || {};

    // Create a fresh copy, add the new key-value pair, and re-assign!
    targetQuran.Penilaian = {
      ...currentPenilaian,
      [namaToAdd]: bobotToAdd,
    };
  },
  updateScore(state, value) {
    $("#inputDataQuranPenilaian").modal("hide");
    $("#inputQuranPenilaian")[0].reset();
  },
  deletePenilaian(state, value) {
    // 1. Get the string of the item being deleted (e.g., "Ujian Juz-50")
    const itemString = state["penilaian"][value.indexMapel][value.indexPenilaian];

    // 2. Extract the name to delete (gets everything before the last hyphen)
    const lastHyphenIndex = itemString.lastIndexOf("-");
    const nameToDelete = itemString.substring(0, lastHyphenIndex).trim();

    // 3. Remove it from your visual array (Your original code)
    state["penilaian"][value.indexMapel].splice(value.indexPenilaian, 1);

    // 4. Reactively remove it from the actual Penilaian object in state.quran
    const targetQuran = state.quran[value.indexMapel];

    if (targetQuran && targetQuran.Penilaian && targetQuran.Penilaian[nameToDelete] !== undefined) {
      // Create a fresh copy of the object
      const newPenilaianObj = { ...targetQuran.Penilaian };

      // Delete the key from the new object
      delete newPenilaianObj[nameToDelete];

      // Re-assign it back to state.
      // Re-assigning the whole object triggers Vue's reactivity instantly!
      targetQuran.Penilaian = newPenilaianObj;
    }
  },
};
