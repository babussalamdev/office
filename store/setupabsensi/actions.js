export default {
    async getAbsensi({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=absensi&program=${data}`
        );
        commit('setAbsensi', result);
    },
    async changeUnitAsrama({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=asrama&program=${data}`
        );
        commit('setDataAsrama', result);
    },
}
