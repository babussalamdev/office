export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-santri?subject=santri&program=${data}`
        );
        console.log(result)
        commit('setDatabase', result);
    },

}
