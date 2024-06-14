export default {
    getKaldik(state) {
        const kaldik = state.kaldik.map(({ Nama, Mulai, Berakhir, Warna }) => (
            {
                title: Nama,
                start: Mulai,
                end: Berakhir,
                backgroundColor: Warna,
                borderColor: Warna
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
