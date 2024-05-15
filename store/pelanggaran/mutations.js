export default {
    setData(state, value) {
        if (value.Santri) {
            state.santri = value.Santri
            state.permissions = value.Permissions.split(',')
            if (value.select) {
                state.select = value.select
            }
        } else {
            state.select = value
            state.santri = []
            state.permissions = []
        }

    },
    // update data di store
    updateData(state, value) {
        state.updateData = value
    },
    updatePelanggaran(state, value) {
        const i = state.santri.findIndex((x) => x.SK === value.key)
        const data = state.santri[i]
        data['JumlahPelanggaran'] = value.JumlahPelanggaran
        data['PoinPelanggaran'] = value.PoinPelanggaran
        // data['WaktuAsrama'] = value.WaktuAsrama

        const updateData = state.santri.map((item, index) => {
            if (index === i) {
                return data
            }
            return item
        })

        state.santri = updateData
    },

    // record
    setRecord(state, value) {
        state.record = value
    },
    updateRecordPelanggaran(state, value) {
        const i = state.record.findIndex((x) => x.SK === value.key)
        const data = state.record[i]
        data.Pelanggaran = value.Pelanggaran
        data.Level = value.Level
        data.Poin = value.Poin
        data.Tindakan = value.Tindakan
    }
}