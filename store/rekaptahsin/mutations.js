export default {
  setState(state, data) {
    if ( data.key === 'details') {
      const sortedData = data.value.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
      state[data.key] = sortedData
    } else {
      state[data.key] = data.value
    }
  }
}
