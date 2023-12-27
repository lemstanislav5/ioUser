/**
 * Смайлики
 * Разграничение сообщений по датам
 * Скрипт для вставки в сайт
 * Статья (редми)
 * Видеоинструкция
*/
import "./index.css";
import React, { useRef , useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
import { FirstQuestions, IntroduceForm, MessegesBox, OpenChat, PhoneForm,
         Textarea, Attachment, Record, ContactsServise, ConsentPersonalData } from './components/forms/Forms';
import { SvgImages } from './components/images/SvgImages';
import { Preloader } from './components/preloader/Preloader';
import style from './App.module.css';
import { storage } from './services/storage';
import { colors, initialFirstQuestions, filesType, contacts } from './setings';
import { initialMesseges } from './services/initialMesseges';
import { initialIntroduce } from './services/initialIntroduce';
import { initialConsent } from './services/initialConsent';

import {limitSizeFile} from './setings';
import {nanoid} from 'nanoid';
import {socket} from './socket';
import {chatId} from './services/chatId';
import {dateMessage} from './services/dataMeseges';

const App = () => {
  const close = useRef(null);
  const messegesBox = useRef(null);
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messeges, setMessage] = useState(initialMesseges);
  const [messageText, setTextMessage] = useState('');
  const [styleСall, setStyleCall] = useState({'display': 'block', 'color': colors.text});
  const [phoneFormOpen, setPhoneFormOpen] = useState(false);
  const [introduction, setIntroduce] = useState(initialIntroduce);
  const [loading, setLoading] = useState(false);
  const [styleMessegesBox, setStyleMessegesBox] = useState({'opacity': 0});
  const [openContacts, setOpenContacts] = useState(false);
  const [consent, setConsent] = useState(initialConsent);
  const [styleConsent, setstyleConsent] = useState({'opacity': 0});


  useEffect(() => setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 100));
  useEffect(() => {
    if (open) return setTimeout(() => setStyleMessegesBox({'opacity': 1}), 500);
    setStyleMessegesBox({'opacity': 0});
  }, [open]);
  useEffect(() => {
    window.onbeforeunload = () => (consent === false)? storage.clear() : null;
    if (consent === null) return setTimeout(() => setstyleConsent({'opacity': 1}), 100);
    storage.set('consent', true);
    setTimeout(() => setstyleConsent({'opacity': 0}), 100);
  }, [consent]);

  useEffect(() => {
    document.addEventListener('click', () => setOpenContacts(false));
    //------------------------------------incoming handlers------------------------------------
    const handlerConnect = () => {
      socket.emit('online', chatId, answer => {
        console.log('handler online answer: ', answer)
      })
      setConnected(true);
    }
    const handlerDisconnect = () => setConnected(false);
    const handlerNewMessage = ({id, text, chatId}) => {//addToDataBase: false, sendToAdmin: false, readAdmin
      setMessage([...messeges, {id, chatId, type: 'from', text: text, time: dateMessage(), get: true, send: true, read: true}]);
    }
    // const handlerNewMessage = () => {
    //   socket.once('newMessage', (text, inType) => {
    //     let type = 'from';
    //     if (inType ==='jpeg' || inType === 'jpg' || inType === 'png') type = 'fromImage';
    //     if (inType === 'pdf' || inType === 'doc' || inType === 'docx' || inType === 'txt') type = 'fromDocuments';
    //     if (inType === 'mp3' || inType === 'ogg') type = 'fromAudio';
    //     if (inType === 'mp4' || inType === 'wav') type = 'fromVideo';
    //     const id = nanoid(10);
    //     const incomingMessage = { id, chatId, type, text, date: dateMessage(), serverAccepted: true, botAccepted: true }
    //     setMessage([...messeges, incomingMessage]);
    //     socket.off('newMessage');
    //   });
    // }
    //------------------------------------incoming handlers------------------------------------
    socket.on('connect', handlerConnect);
    socket.on('disconnect', handlerDisconnect);//! ЗАПОЛНИТЬ ФУНКЦИЮ
    socket.on('newMessage', handlerNewMessage);
    socket.on('upload', ({type, pathFile}) => {
      console.log('upload: ', type, pathFile);
    });

    return () => {
      socket.off('connect', handlerConnect);
      socket.off('disconnect', handlerDisconnect);//! ЗАПОЛНИТЬ ФУНКЦИЮ
      socket.off('newMessage', handlerNewMessage);
      socket.off('online', (chatId) => {});
      socket.off('offline', (chatId) => {});
      socket.off('upload', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
//------------------------------------outcoming handlers------------------------------------
const handlerSend = text => {
  const messegeId = nanoid(10);
  if (text === '') return setMessage([...messeges, { messegeId, chatId, type: 'notification', text: 'Сообщение не может быть пустым!', date: dateMessage()}]);
  socket.emit("newMessage", { messegeId, text, chatId, type: 'to' }, ({get, send, read}) => {
    //'Извините сервис временно недоступен!'
    return setMessage([...messeges, { messegeId, chatId, type: 'to', text: text, time: dateMessage(), get, send, read }]);
  });
  setTextMessage('');
};
const handlerIntroduce = (name, email) => {
  const id = nanoid(10);
  socket.emit("introduce", { id, chatId, name, email}, ({get, send, read}) => {
    // if(error){
    //   console.log(error, notification);
    //   return setMessage([...messeges, { id, chatId, type: 'from', text: 'Извините сервис временно недоступен!', date: dateMessage()}]);
    // }
    setMessage([...messeges, {id, chatId, type: 'from', text: 'Ваши данные приняты (' +name +' , '+ email+')', get, send, read}]);
    storage.set('introduce', {name, email});
    setIntroduce({name, email});
  });
};
const handlerUpload = (file, type) => {
  setLoading(true);
  socket.emit("upload", file, type, data => {
    setLoading(false);
    const id = nanoid(10);
    if (data.url === false) {
      setMessage([...messeges, { id, chatId, type: 'notification', text: 'Ошибка отправки!', time: dateMessage()}]);
    } else {
      let section;
      if (type === 'jpeg' || type === 'jpg' || type === 'png') section = 'toImage';
      if (type === 'pdf' || type === 'doc' || type === 'docx' || type === 'txt') section = 'toDocuments';
      if (type === 'mp3') section = 'toAudio';
      if (type === 'mp4') section = 'toVideo';
      setMessage([...messeges, { id, chatId, type: section, text: data.url, time: dateMessage()}]);
    }
  });
};
const handlerFileСheck = file => {
  let mb = 1048576, id = nanoid(10);
  let type = file.type.replace('image/', '').replace('application/', '').replace('audio/', '').replace('video/', '');
  type = (type === 'mpeg') ? 'mp3' : type;
  if (file.size > mb * limitSizeFile) {
    setMessage([...messeges, { id, chatId, type: 'notification', text: 'Лимит файла ' + limitSizeFile + ' МБ превышен', date: dateMessage()}]);
  } else if (filesType.indexOf(type) === -1) {
    setMessage([...messeges, { id, chatId, type: 'notification', text: 'Допустимы орматы: ' + filesType.join(', '), date: dateMessage()}]);
  } else {
    handlerUpload(file, type);
  }
}
//------------------------------------outncoming handlers------------------------------------
useEffect(() => {
  // socket.once('notification', (text) => {
  //   const id = nanoid(10);
  //   const incomingMessage = { id, chatId, type: 'notification', text, date: dateMessage(), serverAccepted: true, botAccepted: true }
  //   setMessage([...messeges, incomingMessage]);
  //   socket.off('notification');
  // });
  storage.set('messeges', messeges);
  setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 500)
}, [messeges]);

  const openPhoneBox = () => {
    phoneFormOpen ? setPhoneFormOpen(false) : setPhoneFormOpen(true);
    phoneFormOpen ? setStyleCall({'color': colors.text}) : setStyleCall({'color': colors.messeges});
  }

  if(connected === false ) return <></>;

  const keyDown = (e) => (e.key === "Enter") && handlerSend(messageText);

  return (
    <>
      {
        !open
        ? <div onMouseEnter={() => setOpenContacts(true)}>
            <OpenChat colorStart={colors.text} colorEnd={colors.top} setOpen={setOpen}/>
            { openContacts && <ContactsServise SvgImages={SvgImages} contacts={contacts}/> }
          </div>
        : <div className={style.conteiner}>
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
            <div style={{'backgroundColor': colors.messeges}}>
              <div className={style.box_messeges} ref={messegesBox} style={styleMessegesBox}>
                {(messeges.length === 2 && introduction === false) && <IntroduceForm SvgImages={SvgImages} handlerIntroduce={handlerIntroduce}/>}
                {phoneFormOpen === true && <PhoneForm openPhoneBox={openPhoneBox} handlerSend={handlerSend}/>}
                <FirstQuestions handlerSend={handlerSend} initialFirstQuestions={initialFirstQuestions}/>
                <MessegesBox chatId={chatId} messeges={messeges} colors={colors} SvgImages={SvgImages} />
                {loading && <Preloader className="39012739017239"/>}
              </div>
            </div>
            <Textarea
              keyDown={keyDown}
              placeholder="Введите сообщение"
              setTextMessage={setTextMessage}
              message={messageText}
              backgroundColor={colors.conteiner}/>
            <div className={style.tools}>
              <Attachment color={colors.messeges} handlerFileСheck={handlerFileСheck}/>
              <Record handlerFileСheck={handlerFileСheck}/>
            </div>
            <div className={style.send} onClick={() => {handlerSend(messageText)}}  style={{'color': colors.text, 'borderColor': colors.text}}>
              <SvgImages svg={'send'}/>
            </div>
            { open && <div ref={close} className={style.close} onClick={() => setOpen(false)} style={{'color': colors.text}}>
                <SvgImages svg={'close'}/>
              </div> }
          </div>
        }
        <ConsentPersonalData styleConsent={styleConsent} setConsent={setConsent}/>
      </>
  );
}

ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, document.getElementById('online-consultant-client'));
