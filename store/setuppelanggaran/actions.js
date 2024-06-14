import Swal from "sweetalert2";
export default {
    async getPelanggaran({ commit }, data) {
        const result = await this.$axios.$get(
            `settings-get-pelanggaran?sk=${data}`
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
          `settings-delete-pelanggaran?sk=${key}`
        );
        commit('deleteStruktur', key);
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
