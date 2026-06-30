import Swal from "sweetalert2";

export default {
  async changeUnitPendaftaran({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const namaSubject = this.$auth.user.Halaqah[program];

    const res = await this.$apiSantri.$get(`get-santri-sisalam?subject=halaqah&program=${program}&filter=${namaSubject}`);
    if (res) {
      commit("setHalaqahSantri", res);
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async fetchKoordinatorOptions({ commit, state, dispatch }) {
    const program = localStorage.getItem("program");
    if (!program || !state.koordinatorFilterBy) return;

    dispatch("index/submitLoad", null, { root: true });

    try {
      const res = await this.$apiBase.$get(`get-settings?type=${state.koordinatorFilterBy}&sk=${program}`);
      if (res) {
        // 1. Normalize the data into an array
        let dataArray = [];
        if (Array.isArray(res)) {
          // Handles the 'halaqah' format where the response is directly an array
          dataArray = res;
        } else if (res && typeof res === "object" && res[state.koordinatorFilterBy]) {
          // Handles the 'kelas' format where the array is nested inside an object key
          dataArray = res[state.koordinatorFilterBy];
        }

        // 2. Sort the array using the 'Sort' attribute
        dataArray.sort((a, b) => {
          // Parse to integer to ensure numerical sorting (e.g., 2 comes before 10)
          const sortA = parseInt(a.Sort) || 0;
          const sortB = parseInt(b.Sort) || 0;
          return sortA - sortB;
        });

        // 3. Map to options format using 'Nama'
        const options = dataArray.map((item) => ({
          label: item.Nama,
          value: item.Nama, // Used 'Nama' as value, adjust to item.SK or item.PK if your API expects an ID instead
        }));

        commit("setFilterOptions", options);
      } else {
        commit("setFilterOptions", []);
      }
    } catch (error) {
      console.error("Failed to fetch options:", error);
      commit("setFilterOptions", []);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  // Updated main action to pull directly from state
  async changeUnitPendaftarUjian({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const type = state.selectedType;
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;

    if (!tahun || !semester || !program) {
      console.warn("State lost due to refresh. Redirecting to start...");
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push({ path: `/tahfidz/ujian/pendaftarantahfidzujian` });
      return;
    }

    const halaqah = this.$auth.user.Halaqah?.[program];
    let params;

    if (type === "pendaftar") {
      params = `type=${type}&program=${program}&thn=${tahun}&smstr=${semester}`;
    } else if (type === "halaqah") {
      params = `type=${type}&program=${program}&thn=${tahun}&smstr=${semester}&halaqah=${halaqah}`;
    } else if (type === "koordinator") {
      params = `type=${type}-uj&program=${program}&thn=${tahun}&smstr=${semester}`;

      // Check if they have selected both filters before fetching
      if (state.koordinatorFilterBy && state.koordinatorFilterValue) {
        params += `&${state.koordinatorFilterBy}=${state.koordinatorFilterValue}`;
      } else {
        // If filters aren't fully selected yet, return early to prevent a bad API call
        commit("setPendaftarUjian", []);
        dispatch("index/submitLoad", null, { root: true });
        return;
      }
    }

    try {
      const res = await this.$apiSantri.$get(`get-ujiantahfidz-sisalam?${params}`);
      if (res) {
        commit("setPendaftarUjian", res);
      } else {
        commit("setPendaftarUjian", []);
      }
    } catch (error) {
      console.error(error);
      commit("setPendaftarUjian", []);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async changeUnitUjianTahfidzUAS({ commit, state, dispatch, rootState }) {
    dispatch("index/submitLoad", null, { root: true });

    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;
    const type = state.selectedType;

    // 1. Check if the state is missing (happens on refresh)
    if (!tahun || !semester || !program || !type) {
      console.warn("State lost due to refresh. Redirecting to start...");
      dispatch("index/submitLoad", null, { root: true });
      this.$router.push({ path: `/tahfidz/ujian/pendaftarantahfidzujian` });
      return;
    }

    const halaqah = this.$auth.user.Halaqah?.[program];

    // 2. Build the parameter string dynamically
    let params = `selected=${type}&thn=${tahun}&smstr=${semester}&program=${program}`;

    if (type === "pendaftar" || type === "halaqah") {
      // Retain the original filter behavior for standard users
      if (halaqah) {
        params += `&filter=${halaqah}&type=ujian-uas`;
      }
    } else if (type === "koordinator") {
      // If Koordinator mode, inject the custom dropdown filters instead
      if (state.koordinatorFilterBy && state.koordinatorFilterValue) {
        params += `&${state.koordinatorFilterBy}=${state.koordinatorFilterValue}&type=koordinator-uas`;
      } else {
        // Halt API call if they haven't finished selecting from both dropdowns
        commit("setPendaftarUjian", []);
        dispatch("index/submitLoad", null, { root: true });
        return;
      }
    }

    try {
      const res = await this.$apiSantri.$get(`get-ujiantahfidz-sisalam?${params}`);

      if (res) {
        commit("setPendaftarUjian", res);
      } else {
        commit("setPendaftarUjian", []);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
      commit("setPendaftarUjian", []);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async submitPendaftaran({ dispatch, state, rootState }, formData) {
    // 1. Turn on loading state
    dispatch("index/submitLoad", null, { root: true });

    try {
      const program = localStorage.getItem("program");
      const tahun = rootState.index.label;
      const semester = rootState.index.semester;
      const i = state.halaqahsantri.findIndex((x) => x.SK === formData.santri);
      const detail = state.halaqahsantri[i];

      // 2. Format the Date
      let formattedDate = "";
      if (formData.waktuUjian) {
        const d = new Date(formData.waktuUjian);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        formattedDate = `${year}-${month}-${day}`;
      }

      // 3. Prepare the exact payload expected by the API
      const payload = {
        SK: formData.santri,
        Juz: formData.juz,
        Date: formattedDate,
        Thn: tahun,
        Smstr: semester,
        Halaqah: detail.Halaqah,
        Kls: detail.Kelas,
      };

      const res = await this.$apiSantri.$post(`input-ujiantahfidz-sisalam?subject=ujiantahfidz&program=${program}`, payload);

      // 5. SUCCESS ALERT
      Swal.fire({
        title: "Berhasil!",
        html: `Pendaftaran ujian tahfidz berhasil disimpan.<br><br>
         Ujian akan diselenggarakan pada tanggal <b>${res.Date}</b>
         dan diuji oleh <b> ustadz ${res.Examiner_Name}</b>.`,
        icon: "success",
        confirmButtonColor: "#0d6efd", // Bootstrap Primary blue
        confirmButtonText: "Baik, Mengerti", // Better than the default "OK"
      });

      return res;
    } catch (error) {
      // 6. ERROR ALERT
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat mendaftar ujian.",
        icon: "error",
        confirmButtonColor: "#dc3545", // Bootstrap Danger red
      });

      throw error; // Still throw it so the component knows the request failed
    } finally {
      // 7. Turn off loading state
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async submitNilaiUjianform({ state, dispatch, redirect }, formData) {
    dispatch("index/submitLoad", null, { root: true });

    try {
      const payload = {
        PK: `${state.detail.SK}#ujiantahfidz`,
        SK: `${state.detail.SKLOG}`,
        Error_Tajwid: formData.tajwid,
        Error_Kelancaran: formData.kelancaran,
        Note: formData.keterangan,
      };
      const res = await this.$apiSantri.$put(`update-ujiantahfidz-sisalam?type=penilaian`, payload);

      // 4. Success Alert
      Swal.fire({
        title: "Berhasil!",
        text: "Nilai ujian berhasil disimpan.",
        icon: "success",
        confirmButtonColor: "#176b87",
      });
      this.$router.push("/tahfidz/ujian/formtahfidzujian");

      return res;
    } catch (error) {
      // 5. Error Alert
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat menyimpan nilai.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });

      throw error;
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async submitNilaiUjianmodal({ dispatch, rootState }, payloadData) {
    const { formData, student } = payloadData;
    const program = localStorage.getItem("program");
    dispatch("index/submitLoad", null, { root: true });

    try {
      // 1. Payload untuk Penilaian
      const payloadPenilaian = {
        PK: `${student.SK}#ujiantahfidz`,
        SK: `${student.SKLOG}`,
        Score: formData.Score,
        Status: formData.Status,
        Note: formData.keterangan,
      };

      // Submit Penilaian
      const res = await this.$apiSantri.$put(`update-ujiantahfidz-sisalam?type=penilaian-modal`, payloadPenilaian);

      // 2. Jika status mengulang, otomatis daftarkan untuk besok
      if (formData.Status === "mengulang") {
        const tahun = rootState.index.label;
        const semester = rootState.index.semester;

        // Dapatkan tanggal besok dengan format YYYY-MM-DD
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
        const day = String(tomorrow.getDate()).padStart(2, "0");
        const formattedDateTomorrow = `${year}-${month}-${day}`;

        // Payload untuk Pendaftaran Ulang
        // Memanfaatkan data 'student' yang dikirim dari baris tabel modal
        const payloadDaftarUlang = {
          SK: student.SK,
          Juz: student.Juz,
          Date: formattedDateTomorrow,
          Thn: tahun,
          Smstr: semester,
          Halaqah: student.Halaqah,
          Kls: student.Kelas,
          Examiner_Name: student.Examiner_Name,
          Series: student.Examiner_SK,
        };

        // Submit Pendaftaran Ulang
        await this.$apiSantri.$post(`input-ujiantahfidz-sisalam?subject=ujiantahfidzmengulang&program=${program}`, payloadDaftarUlang);
      }

      // 3. Tampilkan Alert Dinamis
      Swal.fire({
        title: "Berhasil!",
        text:
          formData.Status === "mengulang"
            ? "Nilai disimpan dan jadwal mengulang ujian untuk besok berhasil dibuat."
            : "Nilai ujian berhasil disimpan.",
        icon: "success",
        confirmButtonColor: "#176b87",
      });

      return res;
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat menyimpan nilai.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });

      throw error;
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async submitNilaiUjianmodalUAS({ dispatch, rootState }, payloadData) {
    const { formData, student } = payloadData;
    const program = localStorage.getItem("program");
    dispatch("index/submitLoad", null, { root: true });

    try {
      // 1. Payload untuk Penilaian
      const payloadPenilaian = {
        PK: `${student.SK}#ujiantahfidzuas`,
        SK: `${student.SKLOGUAS}`,
        Score: formData.Score,
        Status: formData.Status,
        Note: formData.keterangan,
      };

      // Submit Penilaian
      const res = await this.$apiSantri.$put(`update-ujiantahfidz-sisalam?type=penilaian-modal-uas`, payloadPenilaian);

      // 2. Jika status mengulang, otomatis daftarkan untuk besok
      if (formData.Status === "mengulang") {
        const tahun = rootState.index.label;
        const semester = rootState.index.semester;

        // Dapatkan tanggal besok dengan format YYYY-MM-DD
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
        const day = String(tomorrow.getDate()).padStart(2, "0");
        const formattedDateTomorrow = `${year}-${month}-${day}`;

        // Payload untuk Pendaftaran Ulang
        // Memanfaatkan data 'student' yang dikirim dari baris tabel modal
        const payloadDaftarUlang = {
          SK: student.SK,
          Juz: student.Juz,
          Date: formattedDateTomorrow,
          Thn: tahun,
          Smstr: semester,
          Halaqah: student.Halaqah,
          Kls: student.Kelas,
          Examiner_Name: student.Examiner_Name,
          Series: student.Examiner_SK,
        };

        // Submit Pendaftaran Ulang
        await this.$apiSantri.$post(`input-ujiantahfidz-sisalam?subject=ujiantahfidzmengulang&program=${program}`, payloadDaftarUlang);
      }

      // 3. Tampilkan Alert Dinamis
      Swal.fire({
        title: "Berhasil!",
        text:
          formData.Status === "mengulang"
            ? "Nilai disimpan dan jadwal mengulang ujian untuk besok berhasil dibuat."
            : "Nilai ujian berhasil disimpan.",
        icon: "success",
        confirmButtonColor: "#176b87",
      });

      return res;
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat menyimpan nilai.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });

      throw error;
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
};
