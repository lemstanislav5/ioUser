/* З А Д А Ч И
* 0. КОНТРОЛЛЕРЫ МЕСЕНДЖЫ
* 1. Предложить представиться
* 2. Ссылки на wothsapp
* 3. Выверить цвета
* 4. Отослать аудио
* 5. Перетаскивать окно чат
* 6. Изменять размеры окна чата
* 7. Адаптация с мобильным устройством
* 8. Скрипт для вставки в сайт готовый
* 9. Видеоинструкция и статья с 0
* 10. consent to the processing of personal data
* 11. Продолжая пользоваться сайтом, я даю согласие на использование файлов cookie.
*/
import React, { useRef , useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
import { FirstQuestions, IntroduceYourself, MessegesBox, OpenChat, PhoneForm, Textarea, Attachment } from './components/forms/Forms';
import { Manager } from "socket.io-client";
import { SvgImages } from './components/images/SvgImages';
import { Preloader } from './components/preloader/Preloader';
import { idController } from './controllers/idController';
import style from './App.module.css';
import { storage } from './services/storage';
import { url, colors, iconChat, initialFirstQuestions,limitSizeFile, ws, port } from './options';
import { initialMesseges } from './services/initialMesseges';
import { initialIntroduce } from './services/initialIntroduce';
import { nanoid } from 'nanoid';
let manager = new Manager(ws + "://" + url + ":" + port, { transports: ['websocket', 'polling', 'flashsocket'] });
let socket = manager.socket("/");
const chatId = (idController.get() === null || idController.get() === undefined) ? idController.set(nanoid(10)) : idController.get();

const App = () => {
  const close = useRef(null);
  const messegesBox = useRef(null);
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messeges, setMessage] = useState(initialMesseges);
  const [message, setDataMessage] = useState('');
  const [styleBox, setStyleBox] = useState({});
  const [styleСall, setStyleCall] = useState({'display': 'block', 'color': colors.text});
  const [phoneFormOpen, setPhoneFormOpen] = useState(false);
  const [introduce, setIntroduce] = useState(initialIntroduce);
  const [loading, setLoading] = useState(false);

  // (fn) каждый рендер; (fn, []) один раз; (fn, [args]) при обновлении args; prevCountRef.current - предидущий стейт
  useEffect(() => setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 300));
  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
  }, []);

  useEffect(() => {
    if (open) return setStyleBox({ 'bottom': 0, 'left': window.innerWidth - 335 , 'width': 330, 'backgroundColor': colors.conteiner});
    setStyleBox({'bottom': -400, 'left': window.innerWidth - 175 , 'width': 170, 'backgroundColor': colors.conteiner});
  }, [open]);

  useEffect(() => {
    // Проверяем наличие слушателя, в случае отсутствия устанавливаем
    if (socket._callbacks['$new message'] === undefined) {
      socket.on('newMessage', (text) => {
        const id = nanoid(10);
        const incomingMessage = { id, chatId, type: 'from', text, date: dateMessage(), serverAccepted: true, botAccepted: true }
        setMessage([...messeges, incomingMessage]);
      });
    }
    storage.set('messeges', messeges);

    if (socket._callbacks['$notification'] === undefined) {
      socket.on('notification', (text) => {
        const id = nanoid(10);
        const incomingMessage = { id, chatId, type: 'notification', text, date: dateMessage(), serverAccepted: true, botAccepted: true }
        setMessage([...messeges, incomingMessage]);
      });
    }
    storage.set('messeges', messeges);
  }, [messeges]);

  const dateMessage = () => {
    let date = new Date();
    return date.getDate() +'-'+ date.getMonth() +'-'+ date.getFullYear() +','+ date.getHours()+':'+date.getMinutes();
  }

  const send = (text) => {
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
  }

  const sendNameAndEmail = (name, email) => {
    const id = nanoid(10);
    socket.emit("newNameAndEmail", { id, chatId, name, email}, (error, notification) => {
      if(error) {
        console.log(error, notification);
        return setMessage([...messeges, { id, chatId, type: 'from', text: 'Извините сервис временно недоступен!', date: dateMessage()}]);
      }
      setMessage([...messeges, { id, chatId, type: 'from', text: 'Ваши данные приняты (' +name +' , '+ email+')', date: dateMessage(), serverAccepted: notification.add, botAccepted: notification.send }]);
      storage.set('introduce', {name, email});
      setIntroduce({name, email});
    });
  }

  const upload = (file, type) => {
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
          section = 'documents';
        } else if (type === 'mp3' || type ===  'mpeg') {
          section = 'audio';
        } else if (type === 'mp4' || type ===  'wav') {
          section = 'video';
        }
        setMessage([...messeges, { id, chatId, type: section, text: data.url, date: dateMessage()}]);
      }
    });
  }

  const fileСheck = (file) => {
    let mb = 1048576, id = nanoid(10);
    const type = file.type.replace('image/', '').replace('application/', '').replace('audio/', '').replace('video/', '');
    const filesExt = ['jpeg', 'jpg','png', 'pdf', 'doc', 'docx', 'txt', 'mp3', 'mpeg', 'mp4', 'wav'];
    if (file.size > mb * limitSizeFile) {
      setMessage([...messeges, { id, chatId, type: 'notification', text: 'Лимит файла в 5 МБ превышен', date: dateMessage()}]);
    } else if (filesExt.indexOf(type) === -1) {
      setMessage([...messeges, { id, chatId, type: 'notification', text: 'Допустимы орматы: jpeg, jpg, png, pdf, doc, docx, txt, mp3, mpeg, mp4, wav', date: dateMessage()}]);
    } else {
      upload(file, type);
    }
  }

  const openPhoneBox = () => {
    phoneFormOpen ? setPhoneFormOpen(false) : setPhoneFormOpen(true);
    phoneFormOpen ? setStyleCall({ 'color': colors.text}) : setStyleCall({ 'color': colors.messeges});
  }
  if(connected === false ) return <></>;

  const keyDown = (e) => (e.key === "Enter") && send(message);

  return (
    <>
      {
        (iconChat === true && open === false)
        ? <OpenChat colorStart={colors.text} colorEnd={colors.top} setOpen={setOpen}/>
        : <div className={style.conteiner} style={styleBox}>
            <div className={style.box_top} style={{'backgroundColor': colors.top}}>
              <span style={{'color': colors.text}}>
                {open ? 'Напишите ваше сообщение' : 'Поддержка'}
              </span>
              <div className={style.move}></div>
              {open && <div style={styleСall} onClick={openPhoneBox} className={style.backСall}><SvgImages svg={'backСall'}/></div>}
              <div onClick={() => setOpen(true)} className={style.open} style={{'color': colors.text}}>
                <SvgImages svg={'open'}/>
              </div>
            </div>
            <div className={style.box_messeges} ref={messegesBox} style={{'backgroundColor': colors.messeges}}>
              {(messeges.length === 2 && introduce === false) && <IntroduceYourself SvgImages={SvgImages} sendNameAndEmail={sendNameAndEmail}/>}
              {phoneFormOpen === true && <PhoneForm openPhoneBox={openPhoneBox} send={send}/>}
              <FirstQuestions send={send} initialFirstQuestions={initialFirstQuestions}/>
              <MessegesBox messeges={messeges} colors={colors} SvgImages={SvgImages} />
              {loading && <Preloader className="39012739017239"/>}
            </div>
            <Textarea
              keyDown={keyDown}
              placeholder="Введите сообщение"
              setDataMessage={setDataMessage}
              message={message}
              backgroundColor={colors.conteiner}/>
            <div className={style.tools}>
              <Attachment color={colors.messeges} upload={upload} fileСheck={fileСheck}/>
            </div>
            <div className={style.send} onClick={() => {send(message)}}  style={{'color': colors.text, 'borderColor': colors.text}}>
              <SvgImages svg={'send'}/>
            </div>
            { open && <div ref={close} className={style.close} onClick={() => setOpen(false)} style={{'color': colors.text}}>
                <SvgImages svg={'close'}/>
              </div> }
          </div>
      }

    </>
  );
}

ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, document.getElementById('online-consultant-client'));
