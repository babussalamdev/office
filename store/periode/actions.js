export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=allattr&program=${data}&pk=periode`
        );
        commit('setPeriode', result);
    },

}
