import Swal from "sweetalert2";
import moment from "moment-timezone";

const tanggal_sekarang = moment().tz("Asia/Jakarta");
const currentTime = tanggal_sekarang.format("YYYY-MM-DD HH:mm:ss");

export default {
  async fetchListOptionsPuj({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    try {
      // NOTE: Replace this URL with your actual endpoint to get the list of halaqah/kelas
      const res = await this.$apiBase.$get(`get-settings?type=${state.selectedType}&sk=${program}`);

      if (res) {
        commit("setListOptions", res);
        commit("setSelectedValue", ""); // Reset the second dropdown
        commit("setPendaftarUjian", []); // Clear the table data
      }
    } catch (error) {
      console.error("Error fetching list options:", error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async fetchTableDataPuj({ commit, state, dispatch, rootState }) {
    // Prevent fetching if nothing is selected yet
    if (!state.selectedValue) return;

    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;

    try {
      // NOTE: Replace this URL with your actual endpoint to get the table data
      const res = await this.$apiSantri.$get(
        `get-ujiantahfidz-sisalam?selected=${state.selectedType}&type=penguji-tahfidz&filter=${state.selectedValue}&thn=${tahun}&smstr=${semester}&program=${program}`,
      );

      if (res) {
        commit("setPendaftarUjian", res);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async fetchTableDataPuas({ commit, state, dispatch, rootState }) {
    // Prevent fetching if nothing is selected yet
    if (!state.selectedValue) return;

    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;

    try {
      // NOTE: Replace this URL with your actual endpoint to get the table data
      const res = await this.$apiSantri.$get(
        `get-ujiantahfidz-sisalam?selected=${state.selectedType}&type=penguji-uas&filter=${state.selectedValue}&thn=${tahun}&smstr=${semester}&program=${program}`,
      );

      if (res) {
        commit("setPendaftarUjian", res);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },

  async fetchListPenguji({ commit }) {
    try {
      const res = await this.$apiBase.$get(`get-pegawai?program=tahfidz&opsi=halaqah&position=Pengampu`);
      if (res) {
        commit("setListPenguji", res);
      }
    } catch (error) {
      console.error("Error fetching penguji data:", error);
    }
  },

  async updatePengujiModal({ commit, dispatch }, payloadData) {
    const { penguji, student } = payloadData;
    dispatch("index/submitLoad", null, { root: true });

    try {
      // Setup payload for updating penguji
      // Adjust the property names (Examiner_Name / Examiner_SK) based on your backend table requirements
      const payloadUpdate = {
        PK: `${student.SK}#ujiantahfidz`,
        SK: `${student.SKLOG}`,
        Examiner_Name: penguji.Nama,
        Series: penguji.SK, // Assuming 'SK' is the unique ID for the Pegawai from your API
      };
      // Ensure the ?type= update parameter matches what your backend expects for updating penguji
      const res = await this.$apiSantri.$put(`update-ujiantahfidz-sisalam?type=update-penguji`, payloadUpdate);
      commit("updatePengujiPendaftar", res);

      Swal.fire({
        title: "Berhasil!",
        text: "Data penguji berhasil diperbarui.",
        icon: "success",
        confirmButtonColor: "#176b87",
      });

      return res;
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat memperbarui penguji.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });

      throw error;
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async bulkUpdatePenguji({ commit, dispatch, rootState }, payloadData) {
    const { penguji, students } = payloadData;
    dispatch("index/submitLoad", null, { root: true }); // Show loading overlay
    const tahun = rootState.index.label;
    const semester = rootState.index.semester;

    try {
      // Create an array of Promises for all selected students
      const updatePromises = students.map((student) => {
        const payloadUpdate = {
          PK: `${student.SK}#ujiantahfidzuas`,
          SK: `${currentTime}`,
          Examiner_Name: penguji.Nama,
          Series: penguji.SK, // Assuming 'SK' is unique ID
          Kelas: `ujiantahfidzuas#${student.Kelas}#${tahun}#${semester}`,
          Subject: `ujiantahfidzuas#${student.Halaqah}#${tahun}#${semester}`,
          Collection: `ujiantahfidzuas#${tahun}#${semester}`,
        };
        console.log(payloadUpdate);

        return this.$apiSantri.$put(`update-ujiantahfidz-sisalam?type=update-penguji-uas`, payloadUpdate).then((res) => {
          // Update UI state iteratively as they succeed
          commit("updatePengujiPendaftar", res);
          return res;
        });
      });

      // Execute all API calls concurrently
      await Promise.all(updatePromises);

      // Trigger Success Alert
      Swal.fire({
        title: "Berhasil!",
        text: `${students.length} Data santri berhasil diperbarui.`,
        icon: "success",
        confirmButtonColor: "#176b87",
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan saat memperbarui penguji secara massal.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
      throw error;
    } finally {
      dispatch("index/submitLoad", null, { root: true }); // Hide loading overlay
    }
  },
};
