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

  async submitPendaftaran({ dispatch }, formData) {
    // 1. Turn on loading state
    dispatch("index/submitLoad", null, { root: true });

    try {
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
        WaktuUjian: formattedDate,
      };
      console.log(payload);
      // 4. Send the API request
      // const res = await this.$apiSantri.$post(`pendaftaran-ujian`, payload);

      // 5. SUCCESS ALERT
      Swal.fire({
        title: "Berhasil!",
        text: "Pendaftaran ujian tahfidz berhasil disimpan.",
        icon: "success",
        confirmButtonColor: "#0d6efd", // Bootstrap Primary blue
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

  async submitNilaiUjian({ dispatch }, formData) {
    dispatch("index/submitLoad", null, { root: true });

    try {
      // 1. Format the Date
      let formattedDate = "";
      if (formData.tanggalUjian) {
        const d = new Date(formData.tanggalUjian);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        formattedDate = `${year}-${month}-${day}`;
      }

      // 2. Prepare the payload (adjust keys to match your backend API)
      const payload = {
        tanggalUjian: formattedDate,
        juz: formData.juz,
        kesalahanKelancaran: formData.kelancaran,
        kesalahanTajwid: formData.tajwid,
        keterangan: formData.keterangan,
        // nisSantri: "0010920018", // You will likely need to pass the currently selected Santri's NIS here!
      };
      console.log(payload);
      // 3. Send the API request
      // const res = await this.$apiSantri.$post(`input-nilai-ujian`, payload);

      // 4. Success Alert
      Swal.fire({
        title: "Berhasil!",
        text: "Nilai ujian berhasil disimpan.",
        icon: "success",
        confirmButtonColor: "#176b87",
      });

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
