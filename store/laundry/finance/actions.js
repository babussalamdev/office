import Swal from "sweetalert2";
import * as XLSX from "xlsx";
export default {
  async changeUnit({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    commit("setBeforeRender"); // This still runs in case your state needs start/end dates elsewhere

    // Format the month to strictly be 2 digits (e.g., 5 becomes "05", 11 stays "11")
    const formattedMonth = String(state.selectedMonth).padStart(2, "0");

    try {
      // Updated API call to pass year and the newly formatted 2-digit month
      const result = await this.$apiSantri.$get(`get-santri-laundry?type=finance&year=${state.selectedYear}&month=${formattedMonth}`);

      if (result) {
        const tahunMulai = 2026;
        const tahunSekarang = new Date().getFullYear();
        const years = Array.from({ length: tahunSekarang - tahunMulai + 2 }, (_, index) => tahunMulai + index);

        commit("setPage", { result, years: years });
        dispatch("index/submitLoad", null, { root: true });
      }
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async getData({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    commit("changeFormat");
    const formattedMonth = String(state.selectedMonth).padStart(2, "0");

    try {
      const result = await this.$apiSantri.$get(`get-santri-laundry?type=finance&year=${state.selectedYear}&month=${formattedMonth}`);
      if (result) {
        commit("setGetPage", result);
        dispatch("index/submitLoad", null, { root: true });
      }
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async addFinance({ commit, state }, event) {
    // Toggle loading state on
    commit("btn");

    // Extract data from the submitted form
    const data = Object.fromEntries(new FormData(event.target));

    // CRITICAL: Disabled inputs are not captured by FormData.
    // We must manually inject the amount from the state.
    data["Amount"] = Number(state.datas?.total_denda) || 0;

    try {
      // Send the payload to the API.
      // We are passing type=kwitansi to trigger the backend logic we just wrote.
      const result = await this.$apiSantri.$post(`input-santri-laundry?type=kwitansi`, data);

      if (result) {
        // Update state with the new data
        commit("setAdd", result);

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Laundry claim has been processed.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding finance claim:", error);

      // Show error message
      Swal.fire({
        icon: "error", // Switched from warning to error for actual failures
        text: error.response?.data?.message || error.message || "An error occurred",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      // Ensure the loading button always resets, whether success or fail
      commit("btn");
    }
  },

  async downloadFinance({ commit, state, dispatch }, data) {
    dispatch("index/submitLoad", null, { root: true });
    try {
      const datas = await this.$apiLaundry.$get(`get-finance?subject=finance-excel&startdate=${state.start}&enddate=${state.end}`);
      const base64WithPrefix = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${datas.base64data}`;
      const byteString = atob(base64WithPrefix.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const wb = XLSX.read(ab, { type: "array" });
      XLSX.writeFile(wb, `${datas.filename}.xlsx`);
      dispatch("index/submitLoad", null, { root: true });
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        text: error,
        icon: "error",
        showConfirmButton: false,
        // timer: 1500,
      });
    }
  },
};

// const sekarang = new Date();
// const tanggal = sekarang.getDate().toString().padStart(2, '0');
// const bulan = (sekarang.getMonth() + 1).toString().padStart(2, '0');
// const tahun = sekarang.getFullYear();
// const date = `${tahun}-${bulan}-${tanggal}`;
// const tanggalSatu = new Date(sekarang.getFullYear(), sekarang.getMonth(), 1);
// const tanggalSatuFormatted = `${tanggalSatu.getFullYear()}-${(tanggalSatu.getMonth() + 1).toString().padStart(2, '0')}-${tanggalSatu.getDate().toString().padStart(2, '0')}`;
