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

  async changeUnitPendaftarUjian({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    const res = await this.$apiSantri.$get(`get-ujiantahfidz-sisalam?type=pendaftar&program=${program}`);
    if (res) {
      commit("setPendaftarUjian", res);
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async submitPendaftaran({ dispatch, state, rootState }, formData) {
    // 1. Turn on loading state
    dispatch("index/submitLoad", null, { root: true });

    try {
      const program = localStorage.getItem("program");
      const tahun = rootState.index.label;
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

  async submitNilaiUjian({ state, dispatch, redirect }, formData) {
    dispatch("index/submitLoad", null, { root: true });

    try {
      const payload = {
        PK: `${state.detail.SK}#ujiantahfidz`,
        SK: `${state.detail.SKLOG}`,
        error_tajwid: formData.kelancaran,
        error_kelancaran: formData.tajwid,
        Note: formData.keterangan,
      };
      console.log(payload);
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
};
