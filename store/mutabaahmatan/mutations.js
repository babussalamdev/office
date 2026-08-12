export default {
  setDataSantri(state, value) {
    state.santri = value || [];
  },
  setMatanList(state, data) {
    state.listMatan = data || [];
    if (data && data.length > 0) {
      state.selectedMatan = data[0].SK;
      state.selectedMatanName = data[0].Nama;
    } else {
      // Clear selections if no data is passed
      state.selectedMatan = "";
      state.selectedMatanName = "";
    }
  },
  setState(state, data) {
    state[data.key] = data.value;
  },
  // ... Keep the rest of your mutations the same ...

  btn(state) {
    state.btn = !state.btn;
  },
  // Inside mutations.js
  // Inside mutations.js
  showDetail(state, value) {
    const uniqueSubject = `${value.subject}#${state.selectedMatan}`;
    localStorage.setItem("subject", uniqueSubject);
    localStorage.setItem("matan_sk", state.selectedMatan);

    // ADD THIS: Look up the Matan Name and save it for the title
    const matanObj = state.listMatan.find((m) => m.SK === state.selectedMatan);
    const matanName = matanObj ? matanObj.Nama : "";
    localStorage.setItem("matan_name", matanName);

    const i = state.santri.findIndex((x) => x.SK === value.sk);
    state.detail = state.santri[i];
  },
  setDetailSantri(state, value) {
    if (!value) {
      state.detailMutabaah = [];
    } else if (!Array.isArray(value)) {
      state.detailMutabaah = [value];
    } else {
      state.detailMutabaah = value;
    }
  },

  pushDetail(state, value) {
    // Double check it's an array before unshifting
    if (!Array.isArray(state.detailMutabaah)) {
      state.detailMutabaah = [];
    }

    state.detailMutabaah.unshift(value);

    $("#mutabaah").modal("hide");
    $("#mutabaahForm")[0].reset();

    // Reset Insert Form
    state.fromPage = "";
    state.toPage = "";
    state.page = 0;
  },

  // --- CALCULATION LOGIC FOR INSERT ---
  SET_FROM_PAGE(state, value) {
    state.fromPage = value;
    if (state.fromPage && state.toPage) {
      state.page = Math.abs(Number(state.fromPage) - Number(state.toPage)) + 1;
    } else {
      state.page = 0;
    }
  },
  SET_TO_PAGE(state, value) {
    state.toPage = value;
    if (state.fromPage && state.toPage) {
      state.page = Math.abs(Number(state.fromPage) - Number(state.toPage)) + 1;
    } else {
      state.page = 0;
    }
  },

  // --- CALCULATION LOGIC FOR UPDATE ---
  setFromPageUpdate(state, value) {
    state.fromPageUpdate = value;
    if (state.fromPageUpdate && state.toPageUpdate) {
      state.pageupdate = Math.abs(Number(state.fromPageUpdate) - Number(state.toPageUpdate)) + 1;
    } else {
      state.pageupdate = 0;
    }
  },
  setToPageUpdate(state, value) {
    state.toPageUpdate = value;
    if (state.fromPageUpdate && state.toPageUpdate) {
      state.pageupdate = Math.abs(Number(state.fromPageUpdate) - Number(state.toPageUpdate)) + 1;
    } else {
      state.pageupdate = 0;
    }
  },

  setScoreUpdate(state, value) {
    state.scoreUpdate = value;
  },
  setNoteUpdate(state, value) {
    state.noteupdate = value;
  },

  // Inside mutations
  editItem(state, value) {
    const i = state.detailMutabaah.findIndex((x) => x.SK === value);
    state.updateData = state.detailMutabaah[i];
    if (state.updateData) {
      // Pre-fill reading directly from the flat values
      state.fromPageUpdate = state.updateData.From || "";
      state.toPageUpdate = state.updateData.To || "";
      state.pageupdate = state.updateData.Page || 0;

      // ADD THESE TWO LINES to pre-fill Score and Note
      state.scoreUpdate = state.updateData.Score || 0;
      state.noteupdate = state.updateData.Note || "";

      $("#mutabaahupdate").modal("show");
    }
  },

  updateDetail(state, value) {
    const i = state.detailMutabaah.findIndex((x) => x.SK === value.SK);
    const updatedSantri = state.detailMutabaah.map((item, index) => {
      if (index === i) {
        return { ...item, ...value };
      }
      return item;
    });
    state.detailMutabaah = updatedSantri;

    $("#mutabaahupdate").modal("hide");
    $("#mutabaahupdatemodal")[0].reset();
  },
  deleteDetail(state, value) {
    const i = state.detailMutabaah.findIndex((x) => x.SK === value);
    state.detailMutabaah.splice(i, 1);
  },
  resetModalUpdate(state) {
    state.fromPageUpdate = "";
    state.toPageUpdate = "";
    state.pageupdate = 0;

    // ADD THESE TWO LINES to clear the form properly
    state.scoreUpdate = 0;
    state.noteupdate = "";

    state.updateData = "";
  },
  setNote(state, value) {
    state.updateData.Note = value;
  },
};
