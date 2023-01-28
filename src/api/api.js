import { Manager } from "socket.io-client";
let manager = new Manager("212.193.48.242:4000", { transports: ['websocket', 'polling', 'flashsocket'] });//http://212.193.48.242
let socket = manager.socket("/");
// socket.on('news', (data) => {
//   console.log(data);
// });

export const apiSocketIo = {
  sendMessage: (data) => {
    console.log(socket)
    socket.emit('my other event', { message: data })
  },
  getMessage: (callback) => {//!передавать экшины
    socket.on('notification', function (data) {
      callback(data)
      console.log(data);
      // socket.emit('my other event', { my: 'test in start' });
    });
  },
  initialization: (callback) => {
    return new Promise((resolve, reject) => { 
      socket.on('connect', () => {
        if(socket.connected) resolve(socket.connected);
      });
   })
  }
}


