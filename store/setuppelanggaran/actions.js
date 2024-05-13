export default {
    async getPelanggaran({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=pelanggaran&program=${data}`
        );
        commit('setPelanggaran', result);
    },
    async changeUnitAsrama({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=asrama&program=${data}`
        );
        commit('setDataAsrama', result);
    },
}
