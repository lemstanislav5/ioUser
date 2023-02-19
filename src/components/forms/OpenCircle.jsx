import React, {useState} from 'react'
import style from './OpenCircle.module.css'


export const OpenCircle = (props) => {
  const [shown, setIsShown] = useState(false)

//line-height: 0.7;
  return(
    <div 
      className={style.openBox} 
      onMouseEnter={() => setIsShown(true)} 
      onMouseLeave={() => setIsShown(false)}
      style={shown ? {lineHeight: 0.7} : {lineHeight: 1.15}}
      >
     {(!shown) ? '?' : '...'}
    </div>
  )
}
