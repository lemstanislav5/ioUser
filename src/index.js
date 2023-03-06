/* З А Д А Ч И
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
import { FirstQuestions, IntroduceYourself, MessegesBox, OpenChat, PhoneForm, Textarea, Attachment, Record } from './components/forms/Forms';
import { SvgImages } from './components/images/SvgImages';
import { Preloader } from './components/preloader/Preloader';
import style from './App.module.css';
import { storage } from './services/storage';
import { colors, iconChat, initialFirstQuestions, filesType } from './options';
import { initialMesseges } from './services/initialMesseges';
import { initialIntroduce } from './services/initialIntroduce';
import { messengesController } from './controllers/messengesController';

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
    messengesController.connect(setConnected);
  }, []);

  useEffect(() => {
    if (open) return setStyleBox({ 'bottom': 0, 'left': window.innerWidth - 335 , 'width': 330, 'backgroundColor': colors.conteiner});
    setStyleBox({'bottom': -400, 'left': window.innerWidth - 175 , 'width': 170, 'backgroundColor': colors.conteiner});
  }, [open]);

  useEffect(() => {
    messengesController.newMessage(messeges, setMessage);
    messengesController.notification(messeges, setMessage);
    storage.set('messeges', messeges);
  }, [messeges]);

  const send = (text) => messengesController.send(text, setMessage, messeges, setDataMessage);
  const sendNameAndEmail = (name, email) => messengesController.sendNameAndEmail(name, email, setMessage, messeges, setIntroduce);
  const upload = (file, type) => messengesController.upload(file, type, setLoading, setMessage, messeges);
  const fileСheck = (file) => messengesController.fileСheck(file, setMessage, messeges, filesType, upload);
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

    </>
  );
}

ReactDOM.render(<React.StrictMode> <App/> </React.StrictMode>, document.getElementById('online-consultant-client'));
