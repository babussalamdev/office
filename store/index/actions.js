export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=permissions&program=${data}`
        );
        const datas = {
            result, program: data
        }
        commit('setUnit', datas);
    },

}