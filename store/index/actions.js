export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-settings?sk=${data}&type=permissions`
        );
        const datas = {
            result, program: data
        }
        commit('setUnit', datas);
    },
    async submitLoad({ commit, state }) {
        commit('globalLoad')
    },
}
