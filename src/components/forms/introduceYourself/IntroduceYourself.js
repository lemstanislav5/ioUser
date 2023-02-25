import React, { useState, useEffect }  from 'react'
import style from './IntroduceYourself.module.css'
import { userController } from '../../../controllers/userController';

export const IntroduceYourself = (props) => {
  const { send } = props;
  const [user, setUser] = useState(false);
  useEffect(() => {
    setUser(userController.get());
  },[user]);
  const greetings = (e) => {
    send(e.target.innerText);
  }

  if(user !== false) return false;

  return(
    <div className={style.greetings}>
      <div onClick={greetings}>Здравствуйте!</div>
      <div onClick={greetings}>Mне нужна помощь!</div>
    </div>
  )
}
