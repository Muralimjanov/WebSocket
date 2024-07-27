import io from 'socket.io-client';

const socket = io('http://localhost:8181');

export const sendMessage = (message) => (dispatch) => {
  socket.emit('sendMessage', message);
  dispatch({ type: 'SEND_MESSAGE', payload: message });
};

export const receiveMessage = () => (dispatch) => {
  socket.on('receiveMessage', (message) => {
    dispatch({ type: 'RECEIVE_MESSAGE', payload: message });
  });
};
