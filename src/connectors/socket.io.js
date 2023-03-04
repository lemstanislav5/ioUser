import { Manager } from "socket.io-client";
export const socketСreator = (url, ws, port) => {
  let manager = new Manager(ws + "://" + url + ":" + port, { transports: ['websocket', 'polling', 'flashsocket'] });
  return manager.socket("/");
}

