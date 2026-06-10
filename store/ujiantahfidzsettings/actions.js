import Swal from "sweetalert2";

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

  // 1. New Action to fetch list Penguji
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

  // 2. Modified Action to Update Penguji
  async updatePengujiModal({ dispatch }, payloadData) {
    const { penguji, student } = payloadData;
    dispatch("index/submitLoad", null, { root: true });

    try {
      // Setup payload for updating penguji
      // Adjust the property names (Examiner_Name / Examiner_SK) based on your backend table requirements
      const payloadUpdate = {
        PK: `${student.SK}#ujiantahfidz`,
        SK: `${student.SKLOG}`,
        Examiner_Name: penguji.Nama,
        Examiner_SK: penguji.SK, // Assuming 'SK' is the unique ID for the Pegawai from your API
      };

      // Ensure the ?type= update parameter matches what your backend expects for updating penguji
      const res = await this.$apiSantri.$put(`update-ujiantahfidz-sisalam?type=update-penguji`, payloadUpdate);

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
};
