import React, { useState, useEffect }  from 'react'
import style from './IntroduceYourself.module.css'
import { userController } from '../../../controllers/userController';

export const IntroduceYourself = (props) => {
  const { send } = props;
  const [user, setUser] = useState(false);
  const [introduce, setIntroduce] = useState(true);
  useEffect(() => {
    setUser(userController.get());
  },[user]);
  const greetings = (e) => {
    send(e.target.innerText);
    setTimeout(setIntroduce(true), 1000);
  }

  if(user !== false) return false;

  return(
      introduce
      ? <div className={style.greetings}>
          <div onClick={greetings}>Здравствуйте!</div>
          <div onClick={greetings}>Mне нужна помощь!</div>
        </div>
      : <div>2983901283</div>
  )
}
