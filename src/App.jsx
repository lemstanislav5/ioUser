/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef , useEffect, useState }  from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreatorСonnection, setMessageStorageThunk, updateStatusMessageStorageThunk} from './redux/chat_reducer';
import { getConnectedSelector, getMessagesSelector } from './redux/selectrors';
import style from './App.module.css'
import { Manager } from "socket.io-client";
import { nanoid } from 'nanoid';
import { PhoneForm } from './components/PhoneForm';
import { SvgImages } from './components/images/SvgImages';
const URL = 'messenger.ddns.net'
let manager = new Manager("wss://" + URL + ":443", { transports: ['websocket', 'polling', 'flashsocket'] });
let socket = manager.socket("/");


export const Dialog = (props) => {
  let { messages, connected, updateStatus, socket, nanoid, setMessage, updateStatusMessage } = props;
  const close = useRef(null);
  const lastMessage = useRef(null);
  const messagesBox = useRef(null);
  const [message, setDataMessage] = useState('');
  const [styleBox, setStyleBox] = useState({ 'bottom': -350, 'left': window.innerWidth - 175 , 'width': 170});
  const [styleСall, setStyleCall] = useState({ 'display': 'none'});
  const [call, setCall] = useState(false);


  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect');
      updateStatus(true);
      setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      updateStatus(false)
    });
    socket.on('new message', (text) => {
      const id = nanoid(10);
      setMessage({ id, type: 'to', text: text, date: dateMessage(), serverAccepted: true, botAccepted: true });
      setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);
    });
  }, []);

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
  const sendMessage = () => {
    if (message === '') return null;
    const id = nanoid(10);
    setMessage({ id, type: 'to', text: message, date: dateMessage(), serverAccepted: false, botAccepted: false });
    socket.emit("new message", { id, message }, (response) => {
      //! ВЫВЕСТИ В ОТДЕЛЬНУЮ ФУНКЦИЮ -------------------------------------
      if(response === 'sent to telegram') {
        updateStatusMessage({ id, type: 'to', text: message, date: dateMessage, serverAccepted: true, botAccepted: true});
      } else if(response === 'telegram send error') {
        updateStatusMessage({ id, type: 'to', text: message, date: dateMessage, serverAccepted: true, botAccepted: false});
      } else {
        console.warn('some error');
      }
      //! ВЫВЕСТИ В ОТДЕЛЬНУЮ ФУНКЦИЮ -------------------------------------
    });
    setDataMessage('');
    setTimeout(() => lastMessage.current?.scrollIntoView({ behavior: "smooth" }), 200);
  }
  const sendPhone = (phone) => {
    const id = nanoid(10);
    setMessage({ id, type: 'to', text: phone, date: dateMessage(), serverAccepted: false, botAccepted: false });
    socket.emit("new message", { id, message: phone }, (response) => {
      //! ВЫВЕСТИ В ОТДЕЛЬНУЮ ФУНКЦИЮ -------------------------------------
      if(response === 'sent to telegram') {
        updateStatusMessage({ id, type: 'to', text: phone, date: dateMessage, serverAccepted: true, botAccepted: true});
      } else if(response === 'telegram send error') {
        updateStatusMessage({ id, type: 'to', text: phone, date: dateMessage, serverAccepted: true, botAccepted: false});
      } else {
        console.warn('some error');
      }
      //! ВЫВЕСТИ В ОТДЕЛЬНУЮ ФУНКЦИЮ -------------------------------------
    });
    setTimeout(() => lastMessage.current?.scrollIntoView({ behavior: "smooth" }), 200);
  }

  const changeMesssage = (event) => setDataMessage(event.target.value);

  const openPhoneBox = () => {
    call ? setCall(false) : setCall(true);
    call ? setStyleCall({ 'color': '#FFB700'}) : setStyleCall({ 'color': '#333'});
  }
  if(connected === false ) {
    console.log('no connection');
    return <></>;
  }

  return (
    <div className={style.conteiner} style={styleBox}>
      <div className={style.box_top}>
        <span>Напишите ваше сообщение</span>
        <div className={style.move}>
        </div>
        <div style={styleСall} onClick={openPhoneBox} className={style.backСall}>
          <SvgImages svg={'backСall'}/>
        </div>
        <div onClick={openChat} className={style.open}>
          <SvgImages svg={'open'}/>
        </div>
      </div>
      <div className={style.box_messages} ref={messagesBox}>
        {call === true && <PhoneForm openPhoneBox={openPhoneBox} sendPhone={sendPhone}/>}
        {messages.map((item, i, array) => {
          return <div className={style.msgbox} key={'msg' + i}>
                    <div ref={lastMessage} className={style[item.type] + (i === array.length - 1 ? ' LAST MESSAGE' : '')} key={i}>
                      <div className={style.message}>{item.text}</div>
                      {item.type === 'to'
                        ?
                          <>
                            <div className={style.serverAccepted}><svg xmlns="http://www.w3.org/2000/svg" fill={item.serverAccepted ? '#0cec0c' : ' #e82554'} x="0px" y="0px" width="14" height="24" viewBox="0 0 24 24"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path></svg></div>
                            <div className={style.botAccepted}><svg xmlns="http://www.w3.org/2000/svg" fill={item.botAccepted ? '#0cec0c' : ' #e82554'} x="0px" y="0px" width="24" height="14" viewBox="0 0 24 24" ><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path></svg></div>
                          </>
                        :
                          ''}
                      <div className={style.date}>{item.date.split(',')[1]}</div>
                    </div>
                  </div>
          })
        }
      </div>
      <textarea
        className={style.box_textarea}
        placeholder="Введите сообщение"
        onChange={changeMesssage}
        value={message}
      />
      <div className={style.send} onClick={sendMessage}>
        <SvgImages svg={'send'}/>
      </div>
      <div ref={close} className={style.close} onClick={closeChat}>
        <SvgImages svg={'close'}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    connected: getConnectedSelector(state),
    messages: getMessagesSelector(state),
    socket,
    nanoid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStatus: (result) => dispatch(actionCreatorСonnection(result)),
    setMessage: (data) => dispatch(setMessageStorageThunk(data)),
    updateStatusMessage: (data) => dispatch(updateStatusMessageStorageThunk(data)),
  };
};

Dialog.propTypes = {
  message: PropTypes.array,
  connected: PropTypes.bool,
  updateStatus: PropTypes.func,
  socket: PropTypes.object,
  nanoid: PropTypes.func,
  setMessage: PropTypes.func,
  updateStatusMessage: PropTypes.func,

};
Dialog.defaultProps = {
  message: [],
  connected: false,
  updateStatus: () => {},
  socket: {},
  nanoid: () => {},
  setMessage: () => {},
  updateStatusMessage: () => {},
};

const App = connect(mapStateToProps, mapDispatchToProps)(Dialog);
export default App;
