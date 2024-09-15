/**
 * Смайлики
 * Разграничение сообщений по датам
 * Скрипт для вставки в сайт
 * Статья (редми)
 * Видеоинструкция
*/
import React, {useRef , useEffect, useState}  from 'react';
import ReactDOM from 'react-dom';
import {FirstQuestions, IntroduceForm, MessegesBox, OpenChat, PhoneForm,
         Textarea, Attachment, Record, ContactsServise, ConsentPersonalData } from './components/forms/Forms';
import {SvgImages} from './components/images/SvgImages';
import {Preloader} from './components/preloader/Preloader';
import style from './Index.module.css';
import {storage} from './services/storage';
import {initialIntroduce} from './services/initialIntroduce';
import {initialConsent} from './services/initialConsent';
import {limitSizeFile} from './setings';
import {nanoid} from 'nanoid';
import {chatId} from './services/chatId';
import {io} from 'socket.io-client';
export const socket = io('http://localhost:4000');
const filesType = ['jpeg', 'jpg', 'png', 'pdf', 'doc', 'docx', 'txt', 'mp3', 'mp4'];

const App = () => {
  const e = new Date();
  const close = useRef(null);
  const messegesBox = useRef(null);
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messeges, setMessage] = useState([]);
  const [messageText, setTextMessage] = useState('');
  const [styleСall, setStyleCall] = useState({'display': 'block'});
  const [phoneFormOpen, setPhoneFormOpen] = useState(false);
  const [introduction, setIntroduce] = useState(initialIntroduce);
  const [loading, setLoading] = useState(false);
  const [styleMessegesBox, setStyleMessegesBox] = useState({'opacity': 0});
  const [openContacts, setOpenContacts] = useState(false);
  const [consent, setConsent] = useState(initialConsent);
  const [styleConsent, setstyleConsent] = useState({'opacity': 0});
  const [setings, setSetings] = useState(null);


  useEffect(() => {
    if(setings === null){
      socket.emit('getSetings', date => {
        console.log(date)
        setSetings(date);
      });
    }
  }, [setings])
  useEffect(() => setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 100));
  useEffect(() => {
    if (open) return setTimeout(() => setStyleMessegesBox({'opacity': 1}), 500);
    setStyleMessegesBox({'opacity': 0});
  }, [open]);
  useEffect(() => {
    window.onbeforeunload = () => (consent === false)? storage.clear() : null;
    if(consent === null) return setTimeout(() => setstyleConsent({'opacity': 1}), 100);
    storage.set('consent', true);
    setTimeout(() => setstyleConsent({'opacity': 0}), 100);
  }, [consent]);

  useEffect(() => {
    document.addEventListener('click', () => setOpenContacts(false));
    //------------------------------------incoming handlers------------------------------------
    const handlerConnect = () => {
      socket.emit('online', chatId, answer => ((answer)? setConnected(true): null));
    }
    const handlerDisconnect = () => setConnected(false);
    const handlerReceiveMessage = ({fromId, toId, messageId, text, time, type, read}) => {
      return setMessage([...messeges, {fromId, toId, messageId, text, time, type, read}]);
    }
    const handlerUpload = ({type, pathFile}) => {console.log('upload: ', type, pathFile)

    }
    //------------------------------------incoming handlers------------------------------------
    socket.on('connect', handlerConnect);
    socket.on('disconnect', handlerDisconnect);//! ЗАПОЛНИТЬ ФУНКЦИЮ
    socket.on('newMessage', handlerReceiveMessage);
    socket.on('upload', handlerUpload);

    return () => {
      socket.off('connect', handlerConnect);
      socket.off('disconnect', handlerDisconnect);//! ЗАПОЛНИТЬ ФУНКЦИЮ
      socket.off('newMessage', handlerReceiveMessage);
      socket.off('upload', handlerUpload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messeges]);
//------------------------------------outcoming handlers------------------------------------
const handlerSend = text => {
  if (text === '') return setMessage([...messeges, { chatId, type: 'notification', text: 'Сообщение не может быть пустым!', time: e.getTime()}]);
  socket.emit("newMessage", ({fromId: chatId, text, time: e.getTime(), type: 'text'}), message => {
    if(!message) return setMessage([...messeges, { id: nanoid(10), fromId: chatId, type: 'notification', text: 'Извините сервис временно недоступен!', time: e.getTime()}]);
    const {fromId, toId, messageId, text, time, type, read} = message;
    return setMessage([...messeges, {fromId, toId, messageId, text, time, type, read}]);
  });
  setTextMessage('');
};
const handlerIntroduce = (name, email) => {
  socket.emit("introduce", {chatId, name, email}, date => {
    if (!date) return setMessage([...messeges, { id: nanoid(10), fromId: chatId, type: 'notification', text: 'Произошла ошибка записи данных!', time: e.getTime()}]);
    storage.set('introduce', {name, email});
    setIntroduce({name, email});
    return setMessage([...messeges, { id: nanoid(10), fromId: chatId, type: 'notification', text: 'Ваши данные приняты (' +name +' , '+ email+')', time: e.getTime()}]);
  });
};
const handlerUpload = (file, type) => {
  socket.emit("upload", file, {fromId: chatId, time: e.getTime(), type}, message => {
    const {fromId, toId, messageId, text, time, type, read} = message;
    setLoading(false);
    if (!message) return setMessage([...messeges, { id: nanoid(10), chatId, type: 'notification', text: 'Ошибка отправки!', time: e.getTime()}]);
    setMessage([...messeges, {fromId, toId, messageId, text, time, type, read}]);
  });
};
const handlerFileСheck = file => {
  let mb = 1048576, id = nanoid(10);
  let type = file.type.replace('image/', '').replace('application/', '').replace('audio/', '').replace('video/', '');
  type = (type === 'mpeg') ? 'mp3' : type;
  if (file.size > mb * limitSizeFile) {
    setMessage([...messeges, { id, chatId, type: 'notification', text: 'Лимит файла ' + limitSizeFile + ' МБ превышен', date: e.getTime()}]);
  } else if (filesType.indexOf(type) === -1) {
    setMessage([...messeges, { id, chatId, type: 'notification', text: 'Допустимы орматы: ' + filesType.join(', '), date: e.getTime()}]);
  } else {
    handlerUpload(file, type);
  }
}
//------------------------------------outncoming handlers------------------------------------
useEffect(() => {
  storage.set('messeges', messeges);
  setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 500)
}, [messeges]);

  const openPhoneBox = () => {
    phoneFormOpen ? setPhoneFormOpen(false) : setPhoneFormOpen(true);
    phoneFormOpen ? setStyleCall({'color': setings.colors.text}) : setStyleCall({'color': setings.colors.messeges});
  }

  if(connected === false || setings === null) return <></>;

  const keyDown = (e) => (e.key === "Enter") && handlerSend(messageText);

  return (
    <>
      {
        !open
        ? <div onMouseEnter={() => setOpenContacts(true)}>
            <OpenChat colorStart={setings.colors.text} colorEnd={setings.colors.top} setOpen={setOpen}/>
            { openContacts && <ContactsServise SvgImages={SvgImages} contacts={setings.contacts}/> }
          </div>
        : <div className={style.conteiner}>
            <div className={style.box_top} style={{'backgroundColor': setings.colors.top}}>
              <span style={{'color': setings.colors.text}}>
                Напишите ваше сообщение
              </span>
              <div className={style.move}></div>
              {open && <div style={styleСall} onClick={openPhoneBox} className={style.backСall}><SvgImages svg={'backСall'}/></div>}
              <div onClick={() => setOpen(true)} className={style.open} style={{'color': setings.colors.text}}>
                <SvgImages svg={'open'}/>
              </div>
            </div>
            <div style={{'backgroundColor': setings.colors.messeges}}>
              <div className={style.box_messeges} ref={messegesBox} style={styleMessegesBox}>
                {(messeges.length === 2 && introduction === false) && <IntroduceForm SvgImages={SvgImages} handlerIntroduce={handlerIntroduce}/>}
                {phoneFormOpen === true && <PhoneForm openPhoneBox={openPhoneBox} handlerSend={handlerSend}/>}
                <FirstQuestions handlerSend={handlerSend} questions={setings.questions}/>
                <MessegesBox chatId={chatId} messeges={messeges} colors={setings.colors} SvgImages={SvgImages} />
                {loading && <Preloader className="39012739017239"/>}
              </div>
            </div>
            <Textarea
              keyDown={keyDown}
              placeholder="Введите сообщение"
              setTextMessage={setTextMessage}
              message={messageText}
              backgroundColor={setings.colors.conteiner}/>
            <div className={style.tools}>
              <Attachment color={setings.colors.top} handlerFileСheck={handlerFileСheck}/>
              <Record color={setings.colors.top} handlerFileСheck={handlerFileСheck}/>
            </div>
            <div className={style.send} onClick={() => {handlerSend(messageText)}}  style={{'color': setings.colors.top, 'borderColor': setings.colors.top}}>
              <SvgImages svg={'send'}/>
            </div>
            { open && <div ref={close} className={style.close} onClick={() => setOpen(false)} style={{'color': setings.colors.top}}>
                <SvgImages svg={'close'}/>
              </div> }
          </div>
        }
        <ConsentPersonalData styleConsent={styleConsent} setConsent={setConsent}/>
      </>
  );
}

ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, document.getElementById('online-consultant-client'));
