export default {
    async setMainChart({ commit }, data) {
        if (data) {
            const result = await this.$axios.$get(
                `get-dashboard?program=${data}`
            );
            commit('setChart', result);
        } else {
            const program = localStorage.getItem('program')
            console.log(program)
            const result = await this.$axios.$get(
                `get-dashboard?program=${program}`
            );
            commit('setChart', result);
        }
    },
}