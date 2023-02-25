import React, { useState, useEffect }  from 'react'
import style from './IntroduceYourself.module.css'

export const IntroduceYourself = (props) => {

  return(
    <div className={style.containerForm}>
    <h3 className={style.headForm}>Представьтесь в чате</h3>
      <form>
        <label>
          Ваше имя:
          <input className={style.inputForm} type="text" name="name" />
        </label>
        <label>
          Ваш e-mail:
          <input className={style.inputForm} type="text" name="Email" />
        </label>
        <input className={style.submitForm} type="submit" value="Submit" />
      </form>
    </div> 
  )
}
