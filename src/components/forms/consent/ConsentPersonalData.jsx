import { memo } from 'react';
import style from './ConsentPersonalData.module.css'
import { consentLink, policyLink } from '../../../options';

export const ConsentPersonalData = memo(({ setConsent, styleConsent }) => {
  
  if (consentLink === null || policyLink === null) {
    console.warn("Укажите ссылку на согласие и политику обработки персональных данных");
    return null;
  }
  
  return(
    <div style={styleConsent} className={style.form}>
      <div>Продолжая пользоваться сайтом, я даю <a href={consentLink}>согласие</a> на использование файлов cookie и
      подтверждаю ознакомление с <a href={policyLink}>политикой</a> обработки персональных данных.</div>
      <div className={style.bottom}>
      <div onClick={() => setConsent(false)} className={style.reject}>Отклонить</div>
        <div onClick={() => setConsent(true)} className={style.accept}>Принять</div> 
      </div>
    </div>
  )
})