export default {
  setPage(state, data) {
    console.log(data)
    state.datas = data.result
    const groupedData = data.result.finance.reduce((acc, curr) => {
      // Ambil tanggal dari SK (tanpa waktu)
      const date = curr.SK.split(' ')[0];

      // Jika sudah ada grup dengan tanggal ini, tambahkan ke grup tersebut
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);

      return acc;
    }, {});

    // Set hasil pengelompokan ke state
    // Mengurutkan tanggal dalam urutan terbalik (dari yang terbaru)
    const sortedGroupedData = Object.keys(groupedData)
      .sort((a, b) => new Date(b) - new Date(a)) // Urutkan berdasarkan tanggal terbaru
      .reduce((acc, date) => {
        acc[date] = groupedData[date];
        return acc;
      }, {});
    console.log(sortedGroupedData)
    state.groupedTransactions = sortedGroupedData
    state.years = data.years

    console.log(state.selectedYear)
    console.log(state.selectedMonth)
    const start = new Date(Date.UTC(state.selectedYear, state.selectedMonth - 1, 1));
    const end = new Date(Date.UTC(state.selectedYear, state.selectedMonth, 0));
    console.log(start.toISOString().split('T')[0])
    console.log(end.toISOString().split('T')[0])
  },
  setState(state, data) {
    state[data.key] = data.value
  }
}
