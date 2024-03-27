export default {
    async changeUnit({ commit }, data) {
        if (data === 'admin') {
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
        const user = value.user
        const key = value.key
        const data = {
            Program: value.unit,
            Value: value.condition
        }
        const result = await this.$axios.$put(
            `update-pegawai?subject=Pengajar&username=${user}&id=${key}`,
            data
        );
        commit('setStatusPengajar', result)
    },
    async setStatusPengampu({ commit }, value) {
        const user = value.user
        const key = value.key
        const data = {
            Program: value.unit,
            Value: value.condition
        }
        const result = await this.$axios.$put(
            `update-pegawai?subject=Pengampu&username=${user}&id=${key}`,
            data
        );
        result['unit'] = value.unit
        result['index'] = value.key
        commit('setStatusPengampu', result)
    },
}
