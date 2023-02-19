/* З А Д А Ч И
* 1. Предложить представиться
* 2. Ссылки на wothsapp
* 3. Отослать картинку
* 4. Отослать аудио
* 5. При клики на значок "окна" в открытом месенжере просто убирается значок закрыть
* 6. Перетаскивать окно чата
* 7. Изменять размеры окна чата
* 8. Адаптация с мобильным устройством
* 9. Конфиг с указанием расположения и стиля чата
* 10. Убрать testInitialState
* 11. Обновление статуса отосланного письма
* 12. Скрипт для вставки в сайт готовый
* 13. Видеоинструкция и статья с 0
*/
import React, { useRef , useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
import style from './App.module.css';
import { Manager } from "socket.io-client";
import { nanoid } from 'nanoid';
import { PhoneForm } from './components/forms/PhoneForm';
import { SvgImages } from './components/images/SvgImages';
import { storage } from './services/storage';
import { testInitialState } from './components/testInitialState';
import { OpenCircle } from './components/forms/OpenCircle'
const URL = 'messenger.ddns.net'
let manager = new Manager("wss://" + URL + ":443", { transports: ['websocket', 'polling', 'flashsocket'] });
let socket = manager.socket("/");
const options = {
  colors: {
    conteiner: '#fff',
    top: '#2c2e33',
    messages: '#000',
    textarea: '#fff',
    from: '#303245',
    to: '#888887',
    text: '#FFB700',
  },
  testData: true,
}
const App = () => {
  let initialState = (() => {
    if (options.testData === false) {
      storage.clear(); 
      return [];
    }
    return (storage.get('messages') === undefined || storage.get('messages') !== []) 
      ? testInitialState 
      : storage.get('messages');
  })();

  const chatId = (() => {
    if (storage.get('chatId') === null || storage.get('chatId') === undefined) {
      let id = nanoid(10);
      storage.set('chatId', id);
      return id;
    } else {
      return storage.get('chatId')
    }
  })();

  const close = useRef(null);
  const lastMessage = useRef(null);
  const messagesBox = useRef(null);
  const [open, setOpen] = useState(false);

  const [connected, setConnected] = useState(false);
  const [messages, setMessage] = useState(initialState);
  const [message, setDataMessage] = useState('');
  const [styleBox, setStyleBox] = useState({ 'bottom': -400, 'left': window.innerWidth - 175 , 'width': 170, 'backgroundColor': options.colors.conteiner});
  const [styleСall, setStyleCall] = useState({ 'display': 'none', 'color': options.colors.text});
  const [phoneFormOpen, setPhoneFormOpen] = useState(false);

  /*
   * useEffect(function) запуск при каждом рендере
   * useEffect(function, []) один раз
   * useEffect(function, [args]) запуск при обновлении args
  */
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect');
      setConnected(true);
      setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      setConnected(false);
    });
  }, []);

  useEffect(() => {
    if (open) {
      setStyleBox({ 'bottom': 0, 'left': window.innerWidth - 335 , 'width': 330, 'backgroundColor': options.colors.conteiner});
      setStyleCall({ 'display': 'block', 'color': options.colors.text});
      setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);
    } else {
      setStyleBox({ 'bottom': -400, 'left': window.innerWidth - 175 , 'width': 170, 'backgroundColor': options.colors.conteiner});
      setStyleCall({ 'display': 'none', 'color': options.colors.text});
    }
  }, [open]);

  useEffect(() => {
    //! Установление слушателя дважды
    socket.once('new message', (text) => {
      const id = nanoid(10);
      const incomingMessage = { id, chatId, type: 'from', text, date: dateMessage(), serverAccepted: true, botAccepted: true }
      setMessage([...messages, incomingMessage]);
      setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);
      console.log(messages.length)
      socket.off('new message');
    });
    storage.set('messages', messages);
  }, [messages, chatId]);

  const dateMessage = () => {
    let date = new Date();
    return date.getDate() +'-'+ date.getMonth() +'-'+ date.getFullYear() +','+ date.getHours()+':'+date.getMinutes();
  }

  const send = (text) => {
    const id = nanoid(10);
    setMessage([...messages, { id, chatId, type: 'to', text: text, date: dateMessage(), serverAccepted: true, botAccepted: true }]);
    socket.emit("new message", { id, text, chatId }, (res) => {
      console.log(res);//! UPDATE
    });
    setDataMessage('');
    setTimeout(() => lastMessage.current?.scrollIntoView({ behavior: "smooth" }), 200);
  }

  const openPhoneBox = () => {
    phoneFormOpen ? setPhoneFormOpen(false) : setPhoneFormOpen(true);
    phoneFormOpen ? setStyleCall({ 'color': '#FFB700'}) : setStyleCall({ 'color': '#333'});
  }
  if(connected === false ) {
    console.log('no connection');
    return <></>;
  }
  const keyboardEvents = (e) => {
    if (e.key === "Enter") send(message);
  }

  return (
    <>
      <OpenCircle/>
      <div className={style.conteiner} style={styleBox}>
        <div className={style.box_top} style={{'backgroundColor': options.colors.top}}>
          <span style={{'color': options.colors.text}}>
            { open ? 'Напишите ваше сообщение' : 'Поддержка' }
          </span>
          <div className={style.move}></div>
          <div style={styleСall} onClick={openPhoneBox} className={style.backСall}>
            <SvgImages svg={'backСall'}/>
          </div>
          <div onClick={() => setOpen(true)} className={style.open} style={{'color': options.colors.text}}>
            <SvgImages svg={'open'}/>
          </div>
        </div>
        <div className={style.box_messages} ref={messagesBox} style={{'backgroundColor': options.colors.messages}}>
          {phoneFormOpen === true && <PhoneForm openPhoneBox={openPhoneBox} send={send}/>}
          {
            messages.map((item, i, array) => {
              return (
                <div className={style.msgbox} key={'msg' + i}>
                  <div ref={lastMessage} className={style[item.type] + (i === array.length - 1 ? ' LAST MESSAGE' : '')} key={i}  style={{'backgroundColor': options.colors[item.type]}}>
                    <div className={style.message}>{item.text}</div>
                      {
                        item.type === 'to' ?
                          <>
                            <div className={style.serverAccepted}><svg xmlns="http://www.w3.org/2000/svg" fill={item.serverAccepted ? '#0cec0c' : ' #e82554'} x="0px" y="0px" width="14" height="24" viewBox="0 0 24 24"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path></svg></div>
                            <div className={style.botAccepted}><svg xmlns="http://www.w3.org/2000/svg" fill={item.botAccepted ? '#0cec0c' : ' #e82554'} x="0px" y="0px" width="24" height="14" viewBox="0 0 24 24" ><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path></svg></div>
                          </>
                        : ''
                      }
                    <div className={style.date}>{item.date.split(',')[1]}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <textarea
          onKeyPress={keyboardEvents}
          className={style.box_textarea}
          placeholder="Введите сообщение"
          onChange={(event) => setDataMessage(event.target.value)}
          value={message}
          style={{'backgroundColor': options.colors.textarea}}
        />
        <div className={style.send} onClick={() => {send(message)}}  style={{'color': options.colors.text, 'borderColor': options.colors.text}}>
          <SvgImages svg={'send'}/>
        </div>
        {
          open &&
          <div ref={close} className={style.close} onClick={() => setOpen(false)} style={{'color': options.colors.text}}>
            <SvgImages svg={'close'}/>
          </div>
        }
      </div>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('chat_room')
);
