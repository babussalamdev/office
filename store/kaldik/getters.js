export default {
    getKaldik(state) {
        const kaldik = state.kaldik.map(({ Nama, TanggalMulai, TanggalAkhir, WarnaLabel }) => (
            {
                title: Nama,
                start: TanggalMulai,
                end: TanggalAkhir,
                backgroundColor: WarnaLabel,
                borderColor: WarnaLabel
            }
        ))
        return kaldik
    },
    getStart(state) {
      return state.start
    },
    getEnd(state) {
      return state.end
    }
}
