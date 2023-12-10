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
import { messengesController } from './controllers/messengesController';

const App = () => {
  const close = useRef(null);
  const messegesBox = useRef(null);
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messeges, setMessage] = useState(initialMesseges);
  const [message, setDataMessage] = useState('');
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
    messengesController.connect(setConnected);
    document.addEventListener('click', () => setOpenContacts(false));
  }, []);

  useEffect(() => {
    window.onbeforeunload = () => (consent === false)? storage.clear() : null;
    if (consent === null) return setTimeout(() => setstyleConsent({'opacity': 1}), 100);
    storage.set('consent', true);
    setTimeout(() => setstyleConsent({'opacity': 0}), 100);
  }, [consent]);

  useEffect(() => {
    if (open) return setTimeout(() => setStyleMessegesBox({'opacity': 1}), 500);
    setStyleMessegesBox({'opacity': 0});
  }, [open]);

  useEffect(() => {
    messengesController.newMessage(messeges, setMessage);
    messengesController.notification(messeges, setMessage);
    storage.set('messeges', messeges);
    setTimeout(() => messegesBox.current?.scrollTo(0, 999000), 500)
  }, [messeges]);

  useEffect(() => {
    if (connected) {
      const chatId = storage.get('chatId')
      messengesController.setNewSocket(chatId)
    }
  }, [connected]);


  const send = (text) => messengesController.send(text, setMessage, messeges, setDataMessage);
  const introduce = (name, email) => messengesController.introduce(name, email, setMessage, messeges, setIntroduce);
  const upload = (file, type) => messengesController.upload(file, type, setLoading, setMessage, messeges);
  const fileСheck = (file) => messengesController.fileСheck(file, setMessage, messeges, filesType, upload);
  const openPhoneBox = () => {
    phoneFormOpen ? setPhoneFormOpen(false) : setPhoneFormOpen(true);
    phoneFormOpen ? setStyleCall({'color': colors.text}) : setStyleCall({'color': colors.messeges});
  }

  if(connected === false ) return <></>;

  const keyDown = (e) => (e.key === "Enter") && send(message);

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
                {(messeges.length === 2 && introduction === false) && <IntroduceForm SvgImages={SvgImages} introduce={introduce}/>}
                {phoneFormOpen === true && <PhoneForm openPhoneBox={openPhoneBox} send={send}/>}
                <FirstQuestions send={send} initialFirstQuestions={initialFirstQuestions}/>
                <MessegesBox messeges={messeges} colors={colors} SvgImages={SvgImages} />
                {loading && <Preloader className="39012739017239"/>}
              </div>
            </div>
            <Textarea
              keyDown={keyDown}
              placeholder="Введите сообщение"
              setDataMessage={setDataMessage}
              message={message}
              backgroundColor={colors.conteiner}/>
            <div className={style.tools}>
              <Attachment color={colors.messeges} upload={upload} fileСheck={fileСheck}/>
              <Record fileСheck={fileСheck}/>
            </div>
            <div className={style.send} onClick={() => {send(message)}}  style={{'color': colors.text, 'borderColor': colors.text}}>
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
