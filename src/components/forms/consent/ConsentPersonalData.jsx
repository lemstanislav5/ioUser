import style from './ConsentPersonalData.module.css'
import { consentLink, policyLink } from '../../../options';

export const ConsentPersonalData = (props) => {
  const { setConsent, styleConsent } = props;

  if (consentLink === null || policyLink === null) {
    console.warn("Укажите ссылку на согласие и политику обработки персональных данных");
    return null;
  }
  
  return(
    <div style={styleConsent} className={style.form}>
      <div>Продолжая пользоваться сайтом, я даю <a href={consentLink}>согласие</a> на использование файлов cookie и
      подтверждаю ознакомление с <a href={policyLink}>политикой</a> обработки персональных данных ознакомлен!</div>
      <div className={style.bottom}>
        <div onClick={() => setConsent(true)} className={style.accept}>Принять</div> 
        <div onClick={() => setConsent(false)} className={style.reject}>Отклонить</div>
      </div>
    </div>
  )
}