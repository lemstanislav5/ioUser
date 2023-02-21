/* З А Д А Ч И
* 0. Сохранение сообщений по схеме: хранилище - стейт - хранилище 
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
// Поменяйте опции на свое усмотрение преред deploy
import React, { useRef , useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
import style from './App.module.css';
import { Manager } from "socket.io-client";
import { nanoid } from 'nanoid';
import { PhoneForm } from './components/forms/phoneForm/PhoneForm';
import { SvgImages } from './components/images/SvgImages';
import { storage } from './services/storage';
import { testInitialState } from './components/testInitialState';
import { OpenChat } from './components/forms/openChat/OpenChat';
import { MessegesBox } from './components/forms/messegesBox/MessegesBox';
import { Textarea } from './components/forms/textarea/Textarea';
import { options } from './options';

let manager = new Manager("wss://" + options.url + ":443", { transports: ['websocket', 'polling', 'flashsocket'] });
let socket = manager.socket("/");

const App = () => {
  let initialState = (() => {
    if (options.testData === false) {
      storage.clear();
      return [];
    }
    return (storage.get('messeges') === undefined || storage.get('messeges') !== [])
      ? testInitialState
      : storage.get('messeges');
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
  const messegesBox = useRef(null);
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messeges, setMessage] = useState(initialState);
  const [message, setDataMessage] = useState('');
  const [styleBox, setStyleBox] = useState({});
  const [styleСall, setStyleCall] = useState({'display': 'block', 'color': options.colors.text});
  const [phoneFormOpen, setPhoneFormOpen] = useState(false);

  /*
   * useEffect(function) запуск при каждом рендере
   * useEffect(function, []) один раз
   * useEffect(function, [args]) запуск при обновлении args
  */
  useEffect(() => setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 300));
  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
  }, []);

  useEffect(() => {
    if (open) return setStyleBox({ 'bottom': 0, 'left': window.innerWidth - 335 , 'width': 330});
    setStyleBox({'bottom': -400, 'left': window.innerWidth - 175 , 'width': 170});
  }, [open]);

  useEffect(() => {
    //! Установление слушателя дважды
    socket.once('new message', (text) => {
      const id = nanoid(10);
      const incomingMessage = { id, chatId, type: 'from', text, date: dateMessage(), serverAccepted: true, botAccepted: true }
      setMessage([...messeges, incomingMessage]);
      socket.off('new message');
    });
    storage.set('messeges', messeges);
  }, [messeges, chatId]);

  const dateMessage = () => {
    let date = new Date();
    return date.getDate() +'-'+ date.getMonth() +'-'+ date.getFullYear() +','+ date.getHours()+':'+date.getMinutes();
  }

  const send = (text) => {
    const id = nanoid(10);
    setMessage([...messeges, { id, chatId, type: 'to', text: text, date: dateMessage(), serverAccepted: true, botAccepted: true }]);
    socket.emit("new message", { id, text, chatId }, (res) => {
      console.log(res);//! UPDATE
    });
    setDataMessage('');
  }

  const openPhoneBox = () => {
    phoneFormOpen ? setPhoneFormOpen(false) : setPhoneFormOpen(true);
    phoneFormOpen ? setStyleCall({ 'color': options.colors.text}) : setStyleCall({ 'color': options.colors.messeges});
  }
  if(connected === false ) {
    console.log('no connection');
    return <></>;
  }
  const keyDown = (e) => {
    if (e.key === "Enter") send(message);
  }

  return (
    <>
      {
        (options.iconChat === true && open === false)
        ?
          <OpenChat colorStart={options.colors.text} colorEnd={options.colors.top} setOpen={setOpen}/>
        :
          <div className={style.conteiner} style={styleBox}>
            <div className={style.box_top} style={{'backgroundColor': options.colors.top}}>
              <span style={{'color': options.colors.text}}>
                { open ? 'Напишите ваше сообщение' : 'Поддержка' }
              </span>
              <div className={style.move}></div>
              {
                open && <div style={styleСall} onClick={openPhoneBox} className={style.backСall}>
                    <SvgImages svg={'backСall'}/>
                  </div>
              }
              <div onClick={() => setOpen(true)} className={style.open} style={{'color': options.colors.text}}>
                <SvgImages svg={'open'}/>
              </div>
            </div>
            <div className={style.box_messeges} ref={messegesBox} style={{'backgroundColor': options.colors.messeges}}>
              {phoneFormOpen === true && <PhoneForm openPhoneBox={openPhoneBox} send={send}/>}
              <MessegesBox messeges={messeges} options={options}/>
            </div>
            <Textarea
              keyDown={keyDown}
              placeholder="Введите сообщение"
              setDataMessage={setDataMessage}
              message={message}
              backgroundColor={options.colors.conteiner}/>

            <div className={style.send} onClick={() => {send(message)}}  style={{'color': options.colors.text, 'borderColor': options.colors.text}}>
              <SvgImages svg={'send'}/>
            </div>
            {
              open && <div ref={close} className={style.close} onClick={() => setOpen(false)} style={{'color': options.colors.text}}>
                <SvgImages svg={'close'}/>
              </div>
            }
          </div>
      }

    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('chat_room')
);