export default () => {
  const currentYear = new Date().getFullYear();
  const dynamicYears = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2];

  return {
    datas: "",
    start: "",
    end: "",
    groupedTransactions: {},
    selectedYear: currentYear, // Still defaults the dropdown to the current year
    selectedMonth: new Date().getMonth() + 1,
    selectedInventory: "",
    years: dynamicYears, // Injects the 5-year array here
    months: [
      { value: 1, name: "Januari" },
      { value: 2, name: "Februari" },
      { value: 3, name: "Maret" },
      { value: 4, name: "April" },
      { value: 5, name: "Mei" },
      { value: 6, name: "Juni" },
      { value: 7, name: "Juli" },
      { value: 8, name: "Agustus" },
      { value: 9, name: "September" },
      { value: 10, name: "Oktober" },
      { value: 11, name: "November" },
      { value: 12, name: "Desember" },
    ],
    updateData: "",
    transaction: "",
    btn: true,
  };
};
