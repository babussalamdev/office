export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=opsimapel&program=${data}`
        );
        commit('setMain', result);
    },
    async getKelas({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=mapel&program=${data.program}&kelas=${data.kelas}`
        )
        commit('setKelas', result)
    }
}
