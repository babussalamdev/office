import Swal from "sweetalert2";
export default {
  async changeUnit({ dispatch, state, commit }) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    try {
      // Inject apiType dynamically into the endpoint
      const result = await this.$apiBase.$get(`get-settings?type=mutabaah&sk=${program}%23`);
      commit("setState", { key: "list", value: result });
      dispatch("index/submitLoad", null, { root: true });
    } catch (error) {
      dispatch("index/submitLoad", null, { root: true });
      Swal.fire({
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async updatePencatatan({ commit, state }, event) {
    commit("btn");
    const data = Object.fromEntries(new FormData(event.target));
    const sk = state.updateDataPencatatan.SK.replace(/#/g, "%23");
    const i = state.list.findIndex((x) => x.SK === state.updateDataPencatatan.SK);

    const array = state.list[i];
    const pencatatan = {
      ...array?.Pencatatan,
      [data.category]: data.name,
    };
    data["Pencatatan"] = pencatatan;
    delete data.name;
    delete data.category;
    try {
      const result = await this.$apiBase.$put(`update-settings?type=mutabaah&sk=${sk}`, data);
      commit("updatePencatatan", { pencatatan, i });
      commit("updatePencatatanModal");
      commit("btn");
    } catch (error) {
      commit("btn");
      Swal.fire({
        icon: "warning",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
  async delPencatatan({ commit, state }, { category, sk }) {
    const i = state.list.findIndex((x) => x.SK === sk);
    if (i === -1) return;
    const item = state.list[i];
    const updatedPencatatan = { ...item.Pencatatan };
    delete updatedPencatatan[category];
    const payload = {
      ...item,
      Pencatatan: updatedPencatatan,
    };

    try {
      const encodedSk = sk.replace(/#/g, "%23");
      delete payload.PK;
      delete payload.SK;

      // 5. Send the update to the server
      await this.$apiBase.$put(`update-settings?type=mutabaah&sk=${encodedSk}`, payload);

      // 6. Reuse the update mutation to reactively update the table UI
      commit("updatePencatatan", { i, pencatatan: updatedPencatatan });

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  },
};
