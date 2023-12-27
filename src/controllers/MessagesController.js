import { storage } from '../services/storage';
import { nanoid } from 'nanoid';
import { idController } from './idController';
import { dateMessage } from '../services/dataMeseges';
import { url, ws, port, limitSizeFile} from '../setings';
import { socketСreator } from '../connectors';

let socket = socketСreator(url, ws, port);
const chatId = (idController.get() === null || idController.get() === undefined) ? idController.set(nanoid(10)) : idController.get();

export const messengesController = {
  connect: (setConnected) => {
    socket.on('connect', () => {
      socket.emit('online', chatId, answer => {
        //!ОСТАНОВИЛСЯ ЗДЕСЬ
        console.log('- - - online: ', answer)
      })
      setConnected(true)}
    );
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
  }
}
