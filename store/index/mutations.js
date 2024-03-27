export default {
    setUnit(state, value) {
        state.unit = value?.program
        state.permissions = value?.result.Permissions.split(',')
        state.pengajar = value?.result.Pengajar
        state.pengampu = value?.result.Pengampu
    },
    admin(state) {
        state.unit = 'admin'
        state.permissions = 'admin'
    },
    removeAll(state) {
        state.unit = ''
        state.permissions = ''
        state.pengajar = ''
        state.pengampu = ''
    }
}