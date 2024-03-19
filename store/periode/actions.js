export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=periode&program=${data}`
        );
        commit('setPeriode', result);
    },

}
