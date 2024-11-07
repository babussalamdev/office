export default ({ store }, inject) => {
  let socket;

  const connectWebSocket = (wsUrl) => {
    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
    };

    socket.onmessage = (event) => {
      const result = JSON.parse(event.data);
      store.commit(`${result.store}/${result.mutation}`, result.data)
    };

    socket.onclose = () => {
    };

    socket.onerror = (error) => {
    };
  };

  const closeWebSocket = () => {
    if (socket) {
      socket.close();
    }
  };

  inject('connectSocket', connectWebSocket);
  inject('closeSocket', closeWebSocket);
};
