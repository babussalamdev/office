export default {
  setState(state, value) {
    state[value.key] = value.value;
  },
  setSelectedMatan(state, value) {
    state.selectedMatan = value;
  },
  setKelasOptions(state, value) {
    state.kelasOptions = value;
  },
  setSantri(state, value) {
    state.santri = value;
  },
  // Inside your Vuex mutations
  setSelect(state, value) {
    state.select = value;
    state.selectedMatan = ""; // resets selected on new select array
    state.santri = []; // <-- Add this to clear the list on page reload
  },
  setKelasOptions(state, value) {
    state.kelasOptions = value;
  },
  setSelectedKelas(state, value) {
    state.selectedKelas = value;
    // Automatically reset subsequent selections when Kelas changes
    state.selectedMatan = "";
    state.select = [];
    state.santri = [];
  },
  setSelectedMatan(state, value) {
    state.selectedMatan = value;
  },
  setSelect(state, value) {
    state.select = value;
    state.selectedMatan = "";
    state.santri = [];
  },
  setDataSantri(state, value) {
    state.santri = value;
  },
  btn(state) {
    state.btn = !state.btn;
  },
  updateAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK);
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        const updatedItem = { ...item };
        updatedItem.Logs = {
          ...item.Logs,
          ...value.Logs,
        };
        return updatedItem;
      }
      return item;
    });

    state.santri = updatedSantri;

    const sekarang = new Date();
    const tanggal = sekarang.getDate().toString().padStart(2, "0");
    const bulan = (sekarang.getMonth() + 1).toString().padStart(2, "0");
    const tahun = sekarang.getFullYear();
    const date = `${tahun}-${bulan}-${tanggal}`;
    state.dateNow = date;

    $("#santriAbsen")[0].reset();
    $("#modalAbsen").modal("hide");
  },
  deleteAbsen(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.SK);
    const updatedSantri = state.santri.map((item, index) => {
      if (index === i) {
        const updatedItem = { ...item };
        updatedItem.Logs = {
          ...item.Logs,
          ...value.Logs,
        };
        return updatedItem;
      }
      return item;
    });
    state.santri = updatedSantri;
  },
  setAbsensi(state, value) {
    const i = state.santri.findIndex((x) => x.SK === value.sk);
    const obj = {
      santri: state.santri[i],
      type: value.type,
      time: value.time, // receives 'matan' from button click config
      matan: state.selectedMatan.Nama,
    };
    state.updateData = obj;
    $("#modalAbsen").modal("show");
  },
};
