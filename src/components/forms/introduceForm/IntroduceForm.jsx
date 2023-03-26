import React, { useState }  from 'react'
import style from './IntroduceForm.module.css'

export const IntroduceForm = (props) => {
  const { SvgImages, introduce } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [visual, setVisual] = useState(true);

  const send = () => {
    if(name !== '' && email !== '' ) introduce(name, email);
  }
  if(!visual) return <></>;
  return(
    <div className={style.containerForm}>
      <div className={style.closeForm} onClick={() => setVisual(false)}><SvgImages svg={'close'}/></div>
    <div className={style.headForm}>Представьтесь в чате</div>
      <div className={style.myForm}>
        <label className={style.labelForm}> Ваше имя: </label>
        <input className={style.inputForm} type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <label className={style.labelForm}> Ваш e-mail: </label>
        <input className={style.inputForm} type="text" name="email" value={email}  onChange={(e) => setEmail(e.target.value)}/>
        <input className={style.submitForm} type="submit" value="Отправить" onClick={send}/>
      </div>
    </div> 
  )
}
