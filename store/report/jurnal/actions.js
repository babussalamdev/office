export default {
    async changeUnit({ commit }) {
        const program = localStorage.getItem('program')
        const result = await this.$apiBase.$get(
            `get-settings?sk=${program}&type=opsimapel`
        );
        commit('setState', { key: 'listKelas', value: result.kelas });
    },
}