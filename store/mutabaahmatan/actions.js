import Swal from "sweetalert2";

export default {
  async changeUnit({ commit, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;

    if (!tahun) {
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push("/");
      return;
    }

    const kelas = this.$auth.user.Kelas[program];

    // Assuming a root mutation exists for setting global class options if needed
    // commit("setKelasOptions", kelas, { root: true });

    try {
      const resSelect = await this.$apiBase.$get(`get-settings?type=absensimatan&program=${program}&tahun=${tahun}&kelas=${kelas}`);

      if (resSelect && resSelect.length > 0) {
        commit("setMatanList", resSelect);
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          text: "Anda tidak mengajar matan apapun",
        });
      }
    } catch (error) {
      console.error("Error fetching matan units:", error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async getDataSantri({ commit, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });

    try {
      const program = localStorage.getItem("program");
      const kelas = this.$auth.user.Kelas[program];

      const result = await this.$apiSantri.$get(`get-absensi-sisalam?type=every&subject=kelas&program=${program}&value=${kelas}`);
      commit("setDataSantri", result);
    } catch (error) {
      console.error("Error fetching santri data:", error);
    } finally {
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
      console.log(state.selectedType);
      const program = localStorage.getItem("program");
      const sk = state.detail.SK.replace("#", "%23");
      const kelas = state.detail.Kelas;
      const subject = localStorage.getItem("subject");
      const tahun = rootState.index.label;
      const semester = rootState.index.semester;
      // const halaqah = type === "halaqah" ? state.santri.Halaqah : state.santri.HalaqahIdhofi;
      const halaqah = state.detail.Halaqah;
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
