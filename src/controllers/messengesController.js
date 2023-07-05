import { storage } from '../services/storage';
import { nanoid } from 'nanoid';
import { idController } from './idController';
import { dateMessage } from '../services/dataMeseges'
import { Manager } from "socket.io-client";
import { url, ws, port, limitSizeFile} from '../options';
let manager = new Manager(ws + "://" + url + ":" + port, { transports: ['websocket', 'polling', 'flashsocket'] });
let socket = manager.socket("/");

const chatId = (idController.get() === null || idController.get() === undefined) ? idController.set(nanoid(10)) : idController.get();

export const messengesController = {
  connect: (setConnected) => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
  },
  newMessage: (messeges, setMessage) => {
    socket.once('newMessage', (text, inType) => {
      let type = 'from';
      if (inType ==='jpeg' || inType === 'jpg' || inType === 'png') {
        type = 'fromImage';
      } else if (inType === 'pdf' || inType === 'doc' || inType === 'docx' || inType === 'txt') {
        type = 'fromDocuments';
      } else if (inType === 'mp3' || inType === 'ogg') {
        type = 'fromAudio';
      } else if (inType === 'mp4' || inType === 'wav') {
        type = 'fromVideo';
      }
      const id = nanoid(10);
      const incomingMessage = { id, chatId, type, text, date: dateMessage(), serverAccepted: true, botAccepted: true }
      setMessage([...messeges, incomingMessage]);
      socket.off('newMessage');
    });
  },
  notification: (messeges, setMessage) => {
    socket.once('notification', (text) => {
      const id = nanoid(10);
      const incomingMessage = { id, chatId, type: 'notification', text, date: dateMessage(), serverAccepted: true, botAccepted: true }
      setMessage([...messeges, incomingMessage]);
      socket.off('notification');
    });
  },
  send: (text, setMessage, messeges, setDataMessage) => {
    const id = nanoid(10);
    if (text === '') return setMessage([...messeges, { id, chatId, type: 'notification', text: 'Сообщение не может быть пустым!', date: dateMessage()}]);
    socket.emit("newMessage", { id, text, chatId }, (error, notification) => {
      if(error) {
        console.log(error, notification);
        return setMessage([...messeges, { id, chatId, type: 'from', text: 'Извините сервис временно недоступен!', date: dateMessage()}]);
      }
      setMessage([...messeges, { id, chatId, type: 'to', text: text, date: dateMessage(), serverAccepted: notification.add, botAccepted: notification.send }]);
  });
    setDataMessage('');
  },
  introduce: (name, email, setMessage, messeges, setIntroduce) => {
    const id = nanoid(10);
    socket.emit("introduce", { id, chatId, name, email}, (error, notification) => {
      if(error) {
        console.log(error, notification);
        return setMessage([...messeges, { id, chatId, type: 'from', text: 'Извините сервис временно недоступен!', date: dateMessage()}]);
      }
      setMessage([...messeges, { id, chatId, type: 'from', text: 'Ваши данные приняты (' +name +' , '+ email+')', date: dateMessage(), serverAccepted: notification.add, botAccepted: notification.send }]);
      storage.set('introduce', {name, email});
      setIntroduce({name, email});
    });
  },
  upload: (file, type, setLoading, setMessage, messeges) => {
    setLoading(true);
    socket.emit("upload", file, type, data => {
      setLoading(false);
      const id = nanoid(10);
      if (data.url === false) {
        setMessage([...messeges, { id, chatId, type: 'notification', text: 'Ошибка отправки!', date: dateMessage()}]);
      } else {
        let section;
        if (type === 'jpeg' || type === 'jpg' || type === 'png') {
          section = 'toImage';
        } else if (type === 'pdf' || type === 'doc' || type === 'docx' || type === 'txt') {
          section = 'toDocuments';
        } else if (type === 'mp3') {
          section = 'toAudio';
        } else if (type === 'mp4') {
          section = 'toVideo';
        }
        setMessage([...messeges, { id, chatId, type: section, text: data.url, date: dateMessage()}]);
      }
    });
  },
  fileСheck: (file, setMessage, messeges, filesType, upload) => {
    let mb = 1048576, id = nanoid(10);
    let type = file.type.replace('image/', '').replace('application/', '').replace('audio/', '').replace('video/', '');
    type = (type === 'mpeg') ? 'mp3' : type;
    if (file.size > mb * limitSizeFile) {
      setMessage([...messeges, { id, chatId, type: 'notification', text: 'Лимит файла ' + limitSizeFile + ' МБ превышен', date: dateMessage()}]);
    } else if (filesType.indexOf(type) === -1) {
      setMessage([...messeges, { id, chatId, type: 'notification', text: 'Допустимы орматы: ' + filesType.join(', '), date: dateMessage()}]);
    } else {
      upload(file, type);
    }
  }, 
  setNewSocket: (chatId) => {
    socket.emit("setNewSocket", { chatId }, (error, notification) => {
      if (error) console.log(error, notification);
      console.log('socket передан для обновления!')
    });
  }
}
