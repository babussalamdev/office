export default {
  setBeforeRender(state) {
    const start = new Date(Date.UTC(state.selectedYear, state.selectedMonth - 1, 1));
    const end = new Date(Date.UTC(state.selectedYear, state.selectedMonth, 0));
    state.start = start.toISOString().split('T')[0]
    state.end = end.toISOString().split('T')[0]
  },
  changeFormat(state) {
    const start = new Date(Date.UTC(state.selectedYear, state.selectedMonth - 1, 1));
    const end = new Date(Date.UTC(state.selectedYear, state.selectedMonth, 0));
    state.start = start.toISOString().split('T')[0]
    state.end = end.toISOString().split('T')[0]
  },
  setPage(state, data) {
    state.datas = data.result
    const groupedData = data.result.finance.reduce((acc, curr) => {
      const date = curr.SK.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
    const sortedData = Object.keys(groupedData).reduce((result, key) => {
      result[key] = groupedData[key].sort((a, b) => new Date(b.SK) - new Date(a.SK));
      return result;
    }, {});
    const sortedGroupedData = Object.keys(sortedData)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((acc, date) => {
        acc[date] = sortedData[date];
        return acc;
      }, {});
    state.groupedTransactions = sortedGroupedData
    state.years = data.years
  },
  setGetPage(state, data) {
    state.datas = data
    const groupedData = data.finance.reduce((acc, curr) => {
      const date = curr.SK.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
    const sortedData = Object.keys(groupedData).reduce((result, key) => {
      result[key] = groupedData[key].sort((a, b) => new Date(b.SK) - new Date(a.SK));
      return result;
    }, {});
    const sortedGroupedData = Object.keys(sortedData)
      .sort((a, b) => new Date(b) - new Date(a))
      .reduce((acc, date) => {
        acc[date] = sortedData[date];
        return acc;
      }, {});
    state.groupedTransactions = sortedGroupedData
  },
  setState(state, data) {
    if (data.key === 'transaction') {
      state[data.key] = data.value
      $('#formFinanceAdd')[0].reset()
    } else {
      state[data.key] = data.value
    }
  },
  showDelete(state, value) {
    const i = state.groupedTransactions[value.index].findIndex((x) => x.SK === value.data.SK)
    value.data['Key'] = value.index
    state.updateData = value.data
    $('#laundryHistoryDelete').modal('show')
  },
  resetUpdateData(state) {
    state.updateData = ''
  },
  deleteItem(state, data) {
    const value = state.updateData
    const i = state.groupedTransactions[value.Key].findIndex((x) => x.SK === value.SK)
    state.groupedTransactions[value.Key].splice(i, 1)
    $('#laundryHistoryDelete').modal('hide')
    state.updateData = ''
    state.datas.pockets.balance = data.Balance
    if (value.PK === 'credit') {
      state.datas.pockets.credit -= value.Amount
    } else {
      state.datas.pockets.debit -= value.Amount;
    }
  },
  resetTransaction(state) {
    state.transaction = ''
  },
  setAdd(state, data) {
    const date = data.SK.split(" ")[0];
    if (!state.groupedTransactions[date]) {
      state.groupedTransactions[date] = [];
    }
    state.groupedTransactions[date].unshift(data);

    const dates = Object.keys(state.groupedTransactions);
    dates.sort((a, b) => new Date(b) - new Date(a));

    const sortedTransactionsByDate = {};
    dates.forEach((date) => {
      sortedTransactionsByDate[date] = state.groupedTransactions[date];
    });

    state.groupedTransactions = sortedTransactionsByDate;

    state.datas.pockets.balance = data.Balance
    if (data.PK === 'credit') {
      state.datas.pockets.credit += data.Amount
    } else {
      state.datas.pockets.debit += data.Amount;
    }

    $('#laundryFinanceAdd').modal('hide')
    $('#formFinanceAdd')[0].reset()
    state.transaction = ''
  },
  btn(state) {
    state.btn = !state.btn
  }
}
