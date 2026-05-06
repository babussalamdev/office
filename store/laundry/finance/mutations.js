export default {
  setBeforeRender(state) {
    const start = new Date(Date.UTC(state.selectedYear, state.selectedMonth - 1, 1));
    const end = new Date(Date.UTC(state.selectedYear, state.selectedMonth, 0));
    state.start = start.toISOString().split("T")[0];
    state.end = end.toISOString().split("T")[0];
  },
  changeFormat(state) {
    const start = new Date(Date.UTC(state.selectedYear, state.selectedMonth - 1, 1));
    const end = new Date(Date.UTC(state.selectedYear, state.selectedMonth, 0));
    state.start = start.toISOString().split("T")[0];
    state.end = end.toISOString().split("T")[0];
  },
  setPage(state, data) {
    state.datas = data.result;
    const groupedData = data.result.finance.reduce((acc, curr) => {
      const date = curr.SK.split(" ")[0];
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
    state.groupedTransactions = sortedGroupedData;
    state.years = data.years;
  },
  setGetPage(state, data) {
    state.datas = data;
    const groupedData = data.finance.reduce((acc, curr) => {
      const date = curr.SK.split(" ")[0];
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
    state.groupedTransactions = sortedGroupedData;
  },
  setState(state, data) {
    if (data.key === "transaction") {
      state[data.key] = data.value;
      $("#formFinanceAdd")[0].reset();
    } else {
      state[data.key] = data.value;
    }
  },
  showDelete(state, value) {
    const i = state.groupedTransactions[value.index].findIndex((x) => x.SK === value.data.SK);
    value.data["Key"] = value.index;
    state.updateData = value.data;
    $("#laundryHistoryDelete").modal("show");
  },
  resetUpdateData(state) {
    state.updateData = "";
  },
  deleteItem(state, data) {
    const value = state.updateData;
    const i = state.groupedTransactions[value.Key].findIndex((x) => x.SK === value.SK);
    state.groupedTransactions[value.Key].splice(i, 1);
    $("#laundryHistoryDelete").modal("hide");
    state.updateData = "";
    state.datas.pockets.balance = data.Balance;
    if (value.PK === "credit") {
      state.datas.pockets.credit -= value.Amount;
    } else {
      state.datas.pockets.debit -= value.Amount;
    }
  },
  resetTransaction(state) {
    state.transaction = "";
  },
  setAdd(state, data) {
    // 1. Safely extract the date (Handles both "YYYY-MM-DD HH:MM" and "YYYY-MM-DDTHH:MM:SSZ")
    const dateString = data.SK || data.sk || new Date().toISOString();
    const date = dateString.includes("T") ? dateString.split("T")[0] : dateString.split(" ")[0];

    // 2. Group the transaction by date
    if (!state.groupedTransactions[date]) {
      state.groupedTransactions[date] = [];
    }
    state.groupedTransactions[date].unshift(data);

    // 3. Sort dates descending (newest first) and rebuild object to trigger Vue reactivity
    const dates = Object.keys(state.groupedTransactions);
    dates.sort((a, b) => new Date(b) - new Date(a));

    const sortedTransactionsByDate = {};
    dates.forEach((d) => {
      sortedTransactionsByDate[d] = state.groupedTransactions[d];
    });
    state.groupedTransactions = sortedTransactionsByDate;

    // 4. Handle Balances based on the Type of Transaction
    if (data.PK === "kwitansi#pencairan#laundry") {
      // It's a Laundry Claim!
      // Reset the pending claim amount on the dashboard to 0
      if (state.datas) {
        state.datas.total_denda = 0;
      }
    }

    // 5. UI Side-effects
    $("#laundryFinanceAdd").modal("hide");

    // Use standard DOM method or jQuery trigger to reset safely
    const form = document.getElementById("formFinanceAdd");
    if (form) form.reset();

    state.transaction = "";
  },
  btn(state) {
    state.btn = !state.btn;
  },
};
