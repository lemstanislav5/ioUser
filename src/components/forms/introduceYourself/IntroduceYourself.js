import React, { useState, useEffect }  from 'react'
import style from './IntroduceYourself.module.css'

export const IntroduceYourself = (props) => {

  return(
    <div className={style.containerForm}>
    <div className={style.headForm}>Представьтесь в чате</div>
      <form className={style.myForm}>
        <label className={style.labelForm}> Ваше имя: </label>
        <input className={style.inputForm} type="text" name="name" />
        <label className={style.labelForm}> Ваш e-mail: </label>
        <input className={style.inputForm} type="text" name="Email" />
        <input className={style.submitForm} type="submit" value="Отправить" />
      </form>
    </div> 
  )
}
