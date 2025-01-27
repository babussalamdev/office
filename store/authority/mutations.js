export default {
  setState(state, data) {
    state[data.key] = data.value
  },
  setPage(state, data) {
    const result = data.map(item => {
      const { laundry, perpus, ob } = item.Authority;
      return {
        ...item,
        Authority: {
          laundry: laundry || "off", // Menjaga nilai laundry
          perpus: perpus || "off",   // Menjaga nilai perpus
          ob: ob || "off"            // Menjaga nilai ob
        }
      };
    });
    state.datas = result
    state.authority = result[0].Authority
  },
  changeAuthority(state, data) {
    const i = state.datas.findIndex((x) => x.SK === data.sk)
    state.datas[i].Authority = { ...state.datas[i].Authority, [data.type]: data.value };
  },
}
