import React, { useState, useEffect }  from 'react'
import style from './FirstQuestions.module.css'
import { userController } from '../../../controllers/userController';

export const FirstQuestions = (props) => {
  const { send, initialFirstQuestions } = props;
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
      { initialFirstQuestions.map((item, i) => ( <div key={'q' + i} onClick={greetings}>{item}</div>)) }
    </div>
  )
}