export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=mapel&program=${data}`
        );
        commit('setMapel', result);
    },

}
