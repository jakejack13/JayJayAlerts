const socket = io();

const channel = document.getElementById('channel').dataset.channel;

socket.on('client connected', () => {
    socket.emit('channel sent', channel);
})