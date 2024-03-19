export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=kaldik&program=${data}`
        );
        commit('setkaldik', result);
    },

}
