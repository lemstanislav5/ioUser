import React, { useRef , useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
import style from './App.module.css';
import { Manager } from "socket.io-client";
import { nanoid } from 'nanoid';
import { PhoneForm } from './components/forms/PhoneForm';
import { SvgImages } from './components/images/SvgImages';
const URL = 'messenger.ddns.net'
let manager = new Manager("wss://" + URL + ":443", { transports: ['websocket', 'polling', 'flashsocket'] });
let socket = manager.socket("/");
const ls = window.localStorage;

const App = (props) => {
  const initialState = [
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '14-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: false, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '15-10-2021,9:19', serverAccepted: false, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '16-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '17-10-2021,9:19', serverAccepted: true, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '13-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '18-10-2021,9:19', serverAccepted: false, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '19-10-2021,9:19', serverAccepted: true, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '20-10-2021,9:19', serverAccepted: true, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '21-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '22-10-2021,9:19', serverAccepted: false, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '23-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '24-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '25-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '26-10-2021,9:19', serverAccepted: true, botAccepted: false},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '27-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'Hey! How can I help you?', date: '28-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'to', text: 'Hello!', date: '29-10-2021,9:19', serverAccepted: true, botAccepted: true},
    { id: 'JHLJSHSLKJ', type: 'from', text: 'LAST MESSAGE', date: '30-10-2021,9:19', serverAccepted: true, botAccepted: false},
  ];
  const [connected, setConnected] = useState(false);
  const [chatId, setChatId] = useState();
  const [messages, setMessage] = useState(initialState);
  const close = useRef(null);
  const lastMessage = useRef(null);
  const messagesBox = useRef(null);
  const [message, setDataMessage] = useState('');
  const [styleBox, setStyleBox] = useState({ 'bottom': -350, 'left': window.innerWidth - 175 , 'width': 170});
  const [styleСall, setStyleCall] = useState({ 'display': 'none'});
  const [phoneFormOpen, setPhoneFormOpen] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect');
      setConnected(true);
      setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);
      const id = ls.getItem('chatId');
      if (id === undefined) {
        const newId = nanoid(10);
        setChatId(newId);
        ls.setItem(newId);
      } else {
        setChatId(id);
      }
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      setConnected(false)
    });
  }, []);

  useEffect(() => {
    socket.on('new message', (text) => {
      const id = nanoid(10);
      setMessage([...messages, { id, chatId, type: 'from', text: text, date: dateMessage(), serverAccepted: true, botAccepted: true }]);
      setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);
    });
  }, [messages]);

  const dateMessage = () => {
    let date = new Date();
    return date.getDate() +'-'+ date.getMonth() +'-'+ date.getFullYear() +','+ date.getHours()+':'+date.getMinutes();
  }
  const closeChat = () => {
    setStyleBox({ 'bottom': -350, 'left': window.innerWidth - 175 , 'width': 170});
    setStyleCall({ 'display': 'none'});
    close.current.classList.toggle(style.hideClose);
  }
  const openChat = () => {
    setStyleBox({ 'bottom': 0, 'left': window.innerWidth - 335 , 'width': 330});
    setStyleCall({ 'display': 'block'});
    close.current.classList.toggle(style.hideClose);
    setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);
  }

  const send = (text) => {
    const id = nanoid(10);
    setMessage([...messages, { id, chatId, type: 'to', text: text, date: dateMessage(), serverAccepted: true, botAccepted: true }]);
    socket.emit("new message", { id, message: text }, (res) => {
      console.log(res);
    });
    setDataMessage('');
    setTimeout(() => lastMessage.current?.scrollIntoView({ behavior: "smooth" }), 200);
  }

  const changeMesssage = (event) => setDataMessage(event.target.value);

  const openPhoneBox = () => {
    phoneFormOpen ? setPhoneFormOpen(false) : setPhoneFormOpen(true);
    phoneFormOpen ? setStyleCall({ 'color': '#FFB700'}) : setStyleCall({ 'color': '#333'});
  }
  if(connected === false ) {
    console.log('no connection');
    return <></>;
  }

  return (
    <div className={style.conteiner} style={styleBox}>
      <div className={style.box_top}>
        <span>Напишите ваше сообщение</span>
        <div className={style.move}></div>
        <div style={styleСall} onClick={openPhoneBox} className={style.backСall}>
          <SvgImages svg={'backСall'}/>
        </div>
        <div onClick={openChat} className={style.open}>
          <SvgImages svg={'open'}/>
        </div>
      </div>
      <div className={style.box_messages} ref={messagesBox}>
        {phoneFormOpen === true && <PhoneForm openPhoneBox={openPhoneBox} send={send}/>}
        {
          messages.map((item, i, array) => {
            return (
              <div className={style.msgbox} key={'msg' + i}>
                <div ref={lastMessage} className={style[item.type] + (i === array.length - 1 ? ' LAST MESSAGE' : '')} key={i}>
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
        className={style.box_textarea}
        placeholder="Введите сообщение"
        onChange={changeMesssage}
        value={message}
      />
      <div className={style.send} onClick={() => {send(message)}}>
        <SvgImages svg={'send'}/>
      </div>
      <div ref={close} className={style.close} onClick={closeChat}>
        <SvgImages svg={'close'}/>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('chat_room')
);


