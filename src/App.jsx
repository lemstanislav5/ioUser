/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef , useEffect, useState }  from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreatorСonnection, setMessageStorageThunk, updateStatusMessageStorageThunk, getMessagesStorageThunk} from './redux/chat_reducer';
import { getConnectedSelector, getMessagesSelector } from './redux/selectrors';
import style from './App.module.css'
import { Manager } from "socket.io-client";
import { nanoid } from 'nanoid';

let manager = new Manager("212.193.48.242:4000", { transports: ['websocket', 'polling', 'flashsocket'] });
let socket = manager.socket("/");


export const Dialog = (props) => {
  let { messages, connected, updateStatus, socket, nanoid, getMessages, setMessage, updateStatusMessage } = props; 
  const conteiner = useRef(null);
  const close = useRef(null);
  const lastMessage = useRef(null);
  const textarea = useRef(null);
  const messagesBox = useRef(null);
  const [checkRegistedDomenName, setRegisted] = useState(false);
  const [message, setDataMessage] = useState('');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [styleBox, setStyleBox] = useState({ 'bottom': -350, 'left': window.innerWidth - 175 , 'width': 170});
  const [coords, setCoords] = useState({x: 0, y: 0});
  const [left, setLeft] = useState(0);

  useEffect(() => {
    getMessages();
    socket.on('notification', (data) => {
      if(data.code === 100) {
        setRegisted(true);
        console.warn(data.text);
      } else if (data.code === 200) {
        setRegisted(false);
      }
    });
    socket.on('connect', () => { 
      console.log('connect');
      updateStatus(true)
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      updateStatus(false)
    });
    socket.on('new message', function (data, fn) {
      //! fn(data.id);
      console.log(data)
      setMessage(data);
      setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);//.scrollIntoView({ behavior: "smooth" }), 100)
   });
  }, []);


  const closeChat = () => {
    setStyleBox({ 'bottom': -350, 'left': window.innerWidth - 175 , 'width': 170});
    close.current.classList.toggle(style.hideClose);
  }
  const openChat = () => {
    setStyleBox({ 'bottom': 0, 'left': window.innerWidth - 335 , 'width': 330});
    close.current.classList.toggle(style.hideClose);
    setTimeout(() => messagesBox.current?.scrollTo(0, 999000), 300);//.scrollIntoView({ behavior: "smooth" }), 100)
  }
  const sendMessage = (e) => {
    const message = textarea.current.value;
    if (message === '') return null;
    const id = nanoid(10);
    let date = new Date();
    let dateMessage = date.getDate() +'-'+ date.getMonth() +'-'+ date.getFullYear();
    setMessage({ id, type: 'to', text: message, date: dateMessage, serverAccepted: false, botAccepted: false });
    socket.emit("new message", { id, message }, (response) => {
      if(response === 'sent to telegram') {
        updateStatusMessage({ id, type: 'to', text: message, date: dateMessage, serverAccepted: true, botAccepted: true});
      } else if(response === 'telegram send error') {
        updateStatusMessage({ id, type: 'to', text: message, date: dateMessage, serverAccepted: true, botAccepted: false});
      } else {
        console.warn('some error')
      }
      setDataMessage('');
    });
    setTimeout(() => lastMessage.current?.scrollIntoView({ behavior: "smooth" }), 200);
  }
  const changeMesssage = () => {
    setDataMessage(textarea.current.value);
  }
  const mouseDown = (e) => {
    console.log(e)
    const x = e.pageX;
    const y = e.pageY;
    setIsMouseDown(true);
    setCoords({x, y})
    setLeft(styleBox.left)
    console.log(conteiner.current.style.left);
  } 
  const mouseUp = (e) => setIsMouseDown(false);
  const mouseMove = (e) => {
    if(isMouseDown) {
      const x = left + e.pageX - coords.x;
      setStyleBox({ 'bottom': 0 , 'left': x , 'width': styleBox.width});
    }
  }
  return (
    checkRegistedDomenName === false 
    ? 
      "" 
    : 

      <>
        <div className={style.conteiner} 
             style={styleBox}
             ref={conteiner}>
          <div className={style.box_top}>
            <span>Напишите ваше сообщение</span>
            <div className={style.move} 
                 onMouseDown={mouseDown} 
                 onMouseUp={mouseUp} 
                 onMouseMove={mouseMove} 
                 onMouseLeave={mouseUp}>      
            </div>
            <div onClick={openChat} className={style.open}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
              </svg>
            </div>
          </div>
          <div className={style.box_messages} ref={messagesBox}>
            {
              (connected === false )
              ? 
                <p>Нет связи!</p>
              :
                messages.map((item, i, array) => {
                  return <div ref={lastMessage} className={style[item.type] + (i === array.length - 1 ? ' LAST MESSAGE' : '')} key={i}> 
                            {item.type === 'to' //#0cec0c    #e82554
                              ?
                                <>
                                  <div className={style.trueServerAccepted}><svg xmlns="http://www.w3.org/2000/svg" fill={item.serverAccepted ? '#0cec0c' : ' #e82554'} x="0px" y="0px" width="14" height="24" viewBox="0 0 24 24"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path></svg></div>
                                  <div className={style.trueBotAccepted}><svg xmlns="http://www.w3.org/2000/svg" fill={item.trueBotAccepted ? '#0cec0c' : ' #e82554'} x="0px" y="0px" width="24" height="14" viewBox="0 0 24 24" ><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path></svg></div>
                                </> 
                              :
                                ''}
                            <div>{item.text}</div>
                          </div>
                })
            }
          </div>
          <textarea 
            ref={textarea}
            className={style.box_textarea} 
            placeholder="Введите сообщение"
            onChange={changeMesssage}
            value={message}
          />
          <div className={style.send} onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"/>
            </svg>
          </div>
          <div ref={close} className={style.close} onClick={closeChat}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        </div>
      </>
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
    getMessages: (data) => dispatch(getMessagesStorageThunk(data)),
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
  getMessages: PropTypes.func,
  setMessage: PropTypes.func,
  updateStatusMessage: PropTypes.func,

};
Dialog.defaultProps = {
  message: [],
  connected: false,
  updateStatus: () => {},
  socket: {},
  nanoid: () => {},
  getMessages: () => {},
  setMessage: () => {},
  updateStatusMessage: () => {},
};

const App = connect(mapStateToProps, mapDispatchToProps)(Dialog);
export default App;