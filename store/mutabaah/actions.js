import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch, rootState, state }, data) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const userHalaqah = this.$auth.user.Halaqah?.[program];
    const userHalaqahIdhofi = this.$auth.user.HalaqahIdhofi?.[program];

    const hasHalaqah = userHalaqah && userHalaqah !== "off";
    const hasIdhofi = userHalaqahIdhofi && userHalaqahIdhofi !== "off";

    let type = state.selectedType;

    if (type === "halaqah" && !hasHalaqah && hasIdhofi) {
      type = "HalaqahIdhofi";
      commit("setState", { key: "selectedType", value: "HalaqahIdhofi" });
    } else if (type === "HalaqahIdhofi" && !hasIdhofi && hasHalaqah) {
      type = "halaqah";
      commit("setState", { key: "selectedType", value: "halaqah" });
    }

    const namaSubject = type === "halaqah" ? this.$auth.user.Halaqah[program] : this.$auth.user.HalaqahIdhofi[program];

    if (rootState.index.permissions.includes("absensi pengampu")) {
      const res = await this.$apiSantri.$get(`get-santri-sisalam?subject=${type}&program=${program}&filter=${namaSubject}`);
      const resDua = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=${type.toLowerCase()}`);
      const resPencatatan = this.$apiBase.$get(`get-settings?type=mutabaah&sk=${program}%23${type.toLowerCase()}%23`);
      const [result, resultDua, Pencatatan] = await Promise.all([res, resDua, resPencatatan]);

      result["MainHalaqah"] = namaSubject;
      if (result && Pencatatan) {
        commit("setHalaqah", { result, resultDua });
        commit("setPencatatan", Pencatatan);
      }
      dispatch("index/submitLoad", null, { root: true });
      return;
    }

    const res = await this.$apiSantri.$get(`get-santri-sisalam?subject=${type}&program=${program}&filter=${namaSubject}`);
    const resPencatatan = this.$apiBase.$get(`get-settings?type=mutabaah&sk=${program}%23${type.toLowerCase()}%23`);
    const [result, Pencatatan] = await Promise.all([res, resPencatatan]);

    if (result) {
      if (result && Pencatatan) {
        commit("setSantri", result);
        commit("setPencatatan", Pencatatan);
      }
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async getHalaqahKoordinator({ commit, dispatch, state }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    let type = state.selectedType;
    const halaqah = state.selectedHalaqah;
    const res = await this.$apiSantri.$get(`get-santri-sisalam?subject=${type}&program=${program}&filter=${halaqah}`);
    const resPencatatan = this.$apiBase.$get(`get-settings?type=mutabaah&sk=${program}%23${type.toLowerCase()}%23`);
    const [result, Pencatatan] = await Promise.all([res, resPencatatan]);

    if (result) {
      commit("setSantri", result);
      commit("setPencatatan", Pencatatan);
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async getDetail({ commit, dispatch }, data) {
    dispatch("index/submitLoad", null, { root: true });
    const sk = data.replace("#", "%23");
    const subject = localStorage.getItem("subject");
    const reqDetail = this.$apiSantri.$get(`get-logs?subject=${subject}&sksantri=${sk}`);
    const reqSurah = this.$apiBase.$get(`get-quran?subject=surah`);
    const [resSurah, resDetail] = await Promise.all([reqSurah, reqDetail]);
    commit("setDetailSantri", resDetail);
    commit("setSurah", resSurah);
    dispatch("index/submitLoad", null, { root: true });
  },
  async submit({ commit, dispatch, state, rootState }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    const from = {
      name: state.surahfrom.name,
      ayat: state.ayatfrom,
    };
    const to = {
      name: state.surahto.name,
      ayat: state.ayatto,
    };
    data["Page"] = +data.Page;
    data["Score"] = +data.Score;
    data["From"] = from;
    data["To"] = to;

    const { Page, Score, Note, From, To } = data;
    const { name: fromName, ayat: fromAyat } = From;
    const { name: toName, ayat: toAyat } = To;

    // Cek apakah salah satu data kosong
    if (
      Page === 0 ||
      fromName === "" ||
      fromAyat.number === "" ||
      fromAyat.page === "" ||
      fromAyat.juz === "" ||
      toName === "" ||
      toAyat.name === "" ||
      toAyat.page === "" ||
      toAyat.juz === ""
    ) {
      Swal.fire({
        text: "Data tidak boleh kosong!",
        icon: "error",
        timer: 3000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
      commit("btn");
      return;
    }

    // Jika semua data valid, lanjutkan dengan proses
    try {
      const program = localStorage.getItem("program");
      const sk = state.detail.SK.replace("#", "%23");
      const kelas = state.detail.Kelas;
      const subject = localStorage.getItem("subject");
      const tahun = rootState.index.label;
      const semester = rootState.index.semester;
      const halaqah = this.$auth.user.Halaqah[program];
      const result = await this.$apiSantri.$post(`input-logs?kls=${kelas}&subject=${subject}&sksantri=${sk}&halaqah=${halaqah}&thn=${tahun}`, data);
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit("btn");
        commit("pushDetail", result);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
      commit("btn");
    }
  },
  async submitUpdate({ state, dispatch, commit, rootState }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    const from = {
      name: state.surahfromupdate.name,
      ayat: state.ayatfromupdate,
    };
    const to = {
      name: state.surahtoupdate.name,
      ayat: state.ayattoupdate,
    };
    data["Page"] = +data.Page;
    data["Score"] = +data.Score;
    data["From"] = from;
    data["To"] = to;

    const { Page, Score, Note, From, To } = data;
    const { name: fromName, ayat: fromAyat } = From;
    const { name: toName, ayat: toAyat } = To;

    // Cek apakah salah satu data kosong
    if (
      Page === 0 ||
      fromName === "" ||
      fromAyat.number === "" ||
      fromAyat.page === "" ||
      fromAyat.juz === "" ||
      toName === "" ||
      toAyat.name === "" ||
      toAyat.page === "" ||
      toAyat.juz === ""
    ) {
      Swal.fire({
        text: "Data tidak boleh kosong!",
        icon: "error",
        timer: 3000,
        timerProgressBar: false,
        showConfirmButton: false,
      });
      commit("btn");
      return;
    }

    try {
      const sk = state.updateData.SK.replace(" ", "%20");
      const sksantri = state.detail.SK.replace("#", "%23");
      const subject = localStorage.getItem("subject");
      const result = await this.$apiSantri.$put(`update-logs?subject=${subject}&sksantri=${sksantri}&sk=${sk}`, data);
      if (result) {
        commit("btn");
        commit("updateDetail", result);
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di update",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
      commit("btn");
    }
  },
};
