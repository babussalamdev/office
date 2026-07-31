import Swal from "sweetalert2";
export default {
  async changeUnit({ commit, dispatch }, payload = null) {
    dispatch("index/submitLoad", null, { root: true });
    const program = localStorage.getItem("program");

    // Base URL
    let url = `get-settings?type=matan&program=${program}`;

    // Append query parameters if the user has selected them
    if (payload && payload.tahun) {
      url += `&tahun=${payload.tahun}`;
    }

    try {
      const data = await this.$apiBase.$get(url);
      if (data) {
        commit("setKelas", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch("index/submitLoad", null, { root: true });
    }
  },
  async submit({ commit, state }, payload) {
    commit("btn");

    // Destructure event, tahun, and semester from the payload
    const { event, tahun } = payload;
    const data = Object.fromEntries(new FormData(event.target));
    data["Program"] = localStorage.getItem("program");

    const kelas = data.Kelas;

    delete data.Kelas;
    delete data.Semester;

    try {
      // Append kls, smstr (from payload), and tahun (from payload) to the URL
      const result = await this.$apiBase.$post(`input-settings?type=matan&kls=${kelas}&thn=${tahun}`, data);

      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        commit("btn");
        commit("inputMatan", result);
      }
    } catch (error) {
      commit("btn"); // Ensure button state resets even if there's an error
      console.error(error);
    }
  },
  async deleteItem({ commit, state }, key) {
    const i = state.matan.findIndex((x) => x.SK === key);
    const result = await Swal.fire({
      title: `matan ${state.matan[i].Nama} kelas ${key.split("#")[2]}`,
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const sk = key.replace(/#/g, "%23");
      const program = localStorage.getItem("program");
      const result = await this.$axios.$delete(`delete-settings?sk=${sk}&type=matan`);
      commit("deleteMatan", key);
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  },
  async updateMatan({ commit, state }, payload) {
    commit("btn");

    // Destructure event, tahun, and semester from the payload
    const { event, SK } = payload;
    const data = Object.fromEntries(new FormData(event.target));
    data["Program"] = localStorage.getItem("program");

    delete data.SK;

    try {
      // Append kls, smstr (from payload), and tahun (from payload) to the URL
      const result = await this.$apiBase.$put(`update-settings?type=matan&sk=${SK.replace(/#/g, "%23")}`, data);

      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Data berhasil di input",
          showConfirmButton: false,
          timer: 1500,
        });
        result["SK"] = SK;
        commit("btn");
        commit("updateMatan", result);
      }
    } catch (error) {
      commit("btn"); // Ensure button state resets even if there's an error
      console.error(error);
    }
  },
};
