export default {
    async showMusyrif({ commit }, data) {

        const result = await this.$axios.get(`get-pegawai?program=${data}&opsi=asrama&position=musyrif`)
        commit('setMusyrif', result)
    },
}
