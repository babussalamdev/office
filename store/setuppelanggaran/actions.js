import Swal from "sweetalert2";
export default {
    async getPelanggaran({ commit }, data) {
        const result = await this.$axios.$get(
            `get-settings?sk=${data}&type=pelanggaran`
        );
        commit('setPelanggaran', result);
    },
    async changeUnitAsrama({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=asrama&program=${data}`
        );
        commit('setDataAsrama', result);
    },
    async deleteItem({commit, state}, sk) {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const key = sk.replace('#', '%23')
        await this.$axios.$delete(
          `delete-settings?sk=${key}&type=pelanggaran`
        );
        commit('deleteStruktur', sk);
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
}
