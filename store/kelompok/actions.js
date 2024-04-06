export default {
    async changeUnitHalaqah({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=halaqah&program=${data}`
        );
        commit('setDataHalaqah', result);
        // get-database?kelas=settings&program=${data}
    },
    async changeUnitAsrama({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=asrama&program=${data}`
        );
        commit('setDataAsrama', result);
    },
}
