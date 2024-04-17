export default {
    async changeUnit({ commit }, data) {
        const result = await this.$axios.$get(
            `get-database?subject=struktur&program=${data}`
        );
        commit('setStruktur', result);
    },
    async openSettings({ commit }, value) {
        const key = value.key
        const data = {
            Program: value.unit,
            Value: value.condition
        }
        console.log(key)
        const result = await this.$axios.$put(`update-pegawai?subject=Settings&id=${key}`, data)
        // const result = await this.$axios.$put(
        //     `update-pegawai?subject=Settings&id=${key}`,
        //     data
        // );
        // result['unit'] = value.unit
        // result['index'] = value.key
        // commit('setStatusPengampu', result)
    },
}
