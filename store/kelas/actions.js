export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=settingskelas&program=${data}`
        );
        commit('setData', result);
    },
    async loadKelasPenilaian({ commit }) {
        const program = localStorage.getItem('program')
        const result = await this.$axios.$get(
            `get-database?subject=options&program=${program}&category=kelas`
        )
        commit('setkelasPenilaian', result)
    },
    async selectMapel({ commit }, data) {
        const program = localStorage.getItem('program')
        const result = await this.$axios.$get(
            `get-nilai?subject=pengajar&program=${program}&kelas=${data}`
        )
        commit('selectMapel', result)
    },
    async getTahunAjaran({ commit }) {
        // const result = await this.$axios.$get(

        // )
        commit('getTahunAjaran')
    }
}
