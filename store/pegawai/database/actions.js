export default {
    async changeUnit({ commit }, data) {
        if (data === 'all') {
            const result = await this.$axios.$get(
                `get-pegawai`
            );
            commit('setDatabaseAll', result);
        } else {
            const result = await this.$axios.$get(
                `get-pegawai?program=${data}`
            );
            commit('setDatabase', result);

        }
    },
    async setStatusPengajar({ commit }, value) {
        const detail = {
            cnc: cnc,
            status: value
        }
        const data = await this.$axios.$put(`/card/blokirCard`, detail)
        commit('setStatusPengajar', value)
    },
    async setStatusPengampu({ commit }, value) {
        const detail = {
            cnc: cnc,
            status: value
        }
        const data = await this.$axios.$put(`/card/blokirCard`, detail)
        commit('setStatusPengampu', value)
    }
}
