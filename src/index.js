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
import { PhoneForm } from './components/forms/phoneForm/PhoneForm';
import { SvgImages } from './components/images/SvgImages';
import { storage } from './services/storage';
import { initialMesseges } from './services/initialMesseges';
import { OpenChat } from './components/forms/openChat/OpenChat';
import { MessegesBox } from './components/forms/messegesBox/MessegesBox';
import { Textarea } from './components/forms/textarea/Textarea';
import { options } from './options';
import { chatId, newId } from './services/chatId';
import { FirstQuestions } from './components/forms/firstQuestions/FirstQuestions';
import { IntroduceYourself } from './components/forms/introduceYourself/IntroduceYourself';
import { initialIntroduce } from './services/initialIntroduce';

                        //"wss://" + options.url + ":433"
let manager = new Manager("ws://" + options.url + ":80", { transports: ['websocket', 'polling', 'flashsocket'] });
let socket = manager.socket("/");
//socket.connected: true, disconnected: false

const App = () => {
  const close = useRef(null);
  const messegesBox = useRef(null);
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messeges, setMessage] = useState(initialMesseges);
  const [message, setDataMessage] = useState('');
  const [styleBox, setStyleBox] = useState({});
  const [styleСall, setStyleCall] = useState({'display': 'block', 'color': options.colors.text});
  const [phoneFormOpen, setPhoneFormOpen] = useState(false);
  const [introduce, setIntroduce] = useState(initialIntroduce);

  // (fn) каждый рендер; (fn, []) один раз; (fn, [args]) при обновлении args; prevCountRef.current - предидущий стейт
  useEffect(() => setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 300));
  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
  }, []);

  useEffect(() => {
    if (open) return setStyleBox({ 'bottom': 0, 'left': window.innerWidth - 335 , 'width': 330, 'backgroundColor': options.colors.conteiner});
    setStyleBox({'bottom': -400, 'left': window.innerWidth - 175 , 'width': 170, 'backgroundColor': options.colors.conteiner});
  }, [open]);

  useEffect(() => {
    // Проверяем наличие слушателя, в случае отсутствия устанавливаем
    if (socket._callbacks['$new message'] === undefined) {
      socket.on('newMessage', (text) => {
        const id = newId(10);
        const incomingMessage = { id, chatId, type: 'from', text, date: dateMessage(), serverAccepted: true, botAccepted: true }
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
    const id = newId(10);
    socket.emit("newMessage", { id, text, chatId }, (error, notification) => {
      if(error) {
        console.log(error, notification);
        setMessage([...messeges, { id, chatId, type: 'from', text: 'Извините сервис временно недоступен!', date: dateMessage()}]);
      }
      setMessage([...messeges, { id, chatId, type: 'to', text: text, date: dateMessage(), serverAccepted: notification.add, botAccepted: notification.send }]);
  });
    setDataMessage('');
  }

  const sendNameAndEmail = (name, email) => {
    console.log(name, email);
    const id = newId(10);
    socket.emit("newNameAndEmail", { id, chatId, name, email}, (error, notification) => {
      if(error) {
        console.log(error, notification);
        setMessage([...messeges, { id, chatId, type: 'from', text: 'Извините сервис временно недоступен!', date: dateMessage()}]);
      }
      setMessage([...messeges, { id, chatId, type: 'from', text: 'Ваши данные приняты (' +name +' , '+ email+')', date: dateMessage(), serverAccepted: notification.add, botAccepted: notification.send }]);
      storage.set('introduce', {name, email});
      setIntroduce({name, email});
    });
  }


  const openPhoneBox = () => {
    phoneFormOpen ? setPhoneFormOpen(false) : setPhoneFormOpen(true);
    phoneFormOpen ? setStyleCall({ 'color': options.colors.text}) : setStyleCall({ 'color': options.colors.messeges});
  }
  if(connected === false ) {
    console.log('no connection');
    return <></>;
  }
  const keyDown = (e) => (e.key === "Enter") && send(message);

  return (
    <>
      {
        (options.iconChat === true && open === false)
        ? <OpenChat colorStart={options.colors.text} colorEnd={options.colors.top} setOpen={setOpen}/>
        : <div className={style.conteiner} style={styleBox}>
            <div className={style.box_top} style={{'backgroundColor': options.colors.top}}>
              <span style={{'color': options.colors.text}}>
                {open ? 'Напишите ваше сообщение' : 'Поддержка'}
              </span>
              <div className={style.move}></div>
              {open && <div style={styleСall} onClick={openPhoneBox} className={style.backСall}><SvgImages svg={'backСall'}/></div>}
              <div onClick={() => setOpen(true)} className={style.open} style={{'color': options.colors.text}}>
                <SvgImages svg={'open'}/>
              </div>
            </div>
            <div className={style.box_messeges} ref={messegesBox} style={{'backgroundColor': options.colors.messeges}}>
              {(messeges.length === 2 && introduce === false) && <IntroduceYourself SvgImages={SvgImages} sendNameAndEmail={sendNameAndEmail}/>}
              {phoneFormOpen === true && <PhoneForm openPhoneBox={openPhoneBox} send={send}/>}
              <FirstQuestions send={send} initialFirstQuestions={options.initialFirstQuestions}/>
              <MessegesBox messeges={messeges} options={options} SvgImages={SvgImages} />
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
            { open && <div ref={close} className={style.close} onClick={() => setOpen(false)} style={{'color': options.colors.text}}>
                <SvgImages svg={'close'}/>
              </div> }
          </div>
      }

    </>
  );
}

ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, document.getElementById('online-consultant-client'));
