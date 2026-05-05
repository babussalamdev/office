import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch, state }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    try {
      const listAsrama = await this.$apiBase.$get(`get-settings?type=options&sk=${program}&category=asrama`);
      if (listAsrama) {
        commit("setState", { key: "asrama", value: listAsrama });
        dispatch("index/submitLoad", null, { root: true });
      }
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data kelas/semester",
        text: error.message,
      });
    }
  },
  async getDataByAsrama({ commit, state, dispatch }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");
    const asrama = state.selectedAsrama;

    try {
      const result = await this.$apiSantri.$get(`get-santri-laundry?type=santri&program=${program}&asrama=${asrama}`);
      if (result) {
        commit("setPage", result);
        dispatch("index/submitLoad", null, { root: true });
      }
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data kelas/semester",
        text: error.message,
      });
    }
  },
  async editItem({ commit, state, dispatch }, { sk, type }) {
    // 1. Prompt the user for confirmation first
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to manually bill this laundry item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    });

    // 2. Proceed only if the user confirms
    if (confirm.isConfirmed) {
      dispatch("index/submitLoad", null, { root: true });

      const data = state.datas.find((x) => x.SK === sk);
      const datas = {
        SK: data.SK,
        Transaction: type,
      };

      console.log(datas);

      try {
        const result = await this.$apiSantri.$post(`input-santri-laundry?type=manual-bill-laundry`, datas);

        if (result) {
          // If your backend returns the updatedData we configured earlier,
          // you can access it here via result.updatedData
          result["SK"] = datas.SK;
          commit("editItem", result);
          dispatch("index/submitLoad", null, { root: true });

          // Optional: Show a success message
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "The item has been successfully updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        dispatch("index/submitLoad", null, { root: true });

        Swal.fire({
          icon: "error", // Changed from "warning" to "error" for failed requests
          // Ensure you extract the actual error message if error is an object
          text: error?.response?.data?.message || error.message || "Something went wrong",
          showConfirmButton: true, // It's usually better to let users dismiss errors manually
        });
      }
    }
  },
};
