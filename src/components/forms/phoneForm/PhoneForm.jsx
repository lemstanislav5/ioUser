import React, { useState }  from 'react'
import style from './PhoneForm.module.css'

export const PhoneForm = (props) => {
  const { openPhoneBox, send } = props;
  const [phone, setPhone] = useState('');
  const phoneBoxKeyDown = (e) => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let resurt = '';
    if(numbers.indexOf(parseInt(e.key)) !== -1 && phone.length < 16) {
      if(phone.length === 0) resurt = '+7(' + e.key;
      if(phone.length === 3) resurt = phone + e.key;
      if(3 < phone.length && phone.length < 6) resurt = phone + e.key;
      if(phone.length === 5) resurt = phone + e.key + ')';
      if(6 < phone.length && phone.length < 10) resurt = phone + e.key;
      if(phone.length === 10) resurt = phone + '-' + e.key;
      if(phone.length === 12) resurt = phone + e.key;
      if(phone.length === 13) resurt = phone + '-' + e.key;
      if(phone.length === 15) resurt = phone + e.key;
      setPhone(resurt);
    }
    if(e.keyCode === 8) {
      setPhone(phone.slice(0, -1))
    } else if(e.keyCode === 13) {
      console.log(13)
      openPhoneBox();
      send('Прошу мне перезвонить! \n' + phone);
      setPhone('');
    }
  }

  return(
    <div className={style.box}>
      <div className={style.text}>Введите номер телефона, и мы перезвоним вам в ближайшее время!</div>
      <div className={style.phoneBox}>
        <input
          className={style.in}
          placeholder="+7(999)-003-02-01"
          type="text"
          onKeyDown={phoneBoxKeyDown}
          onChange={() => {}}
          value={phone}
        />
        <div className={style.phoneSend} onClick={() => {
          send('Прошу мне перезвонить! \n' + phone);
          openPhoneBox();
        }}>{'>'}</div>
      </div>
    </div>
  )
}
