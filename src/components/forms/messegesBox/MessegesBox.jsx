import React, { useRef, useState }  from 'react';
import style from './MessegesBox.module.css';
import { SvgImages } from '../../images/SvgImages';

export const MessegesBox = (props) => {
  const lastMessage = useRef(null);
  const { messeges, options } = props;

  return(
    messeges.map((item, i, array) => {
      return (
        <div className={style.msgbox} key={'msg' + i}>
          <div ref={lastMessage} className={style[item.type] + (i === array.length - 1 ? ' LAST MESSAGE' : '')} key={i}  style={{'backgroundColor': options.colors[item.type]}}>
            <div className={style.message}>{item.text}</div>
              {
                item.type === 'to' ?
                  <>
                    <div className={style.serverAccepted}><svg xmlns="http://www.w3.org/2000/svg" fill={item.serverAccepted ? '#0cec0c' : ' #e82554'} x="0px" y="0px" width="14" height="24" viewBox="0 0 24 24"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path></svg></div>
                    <div className={style.botAccepted}><svg xmlns="http://www.w3.org/2000/svg" fill={item.botAccepted ? '#0cec0c' : ' #e82554'} x="0px" y="0px" width="24" height="14" viewBox="0 0 24 24" ><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path></svg></div>
                  </>
                : ''
              }
            <div className={style.date}>{item.date.split(',')[1]}</div>
          </div>
        </div>
      )
    })
  )
}
