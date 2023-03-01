import React from 'react';
import style from './MessegesBox.module.css';

export const MessegesBox = (props) => {
  const { messeges, options, SvgImages } = props;
//notification
  return(
    messeges.map((item, i) => {
      console.log(item.type);
      return (
        <div className={style.msgbox} key={'msg' + i}>
          <div className={style[item.type]} key={i}  style={{'backgroundColor': options.colors[item.type]}}>
            {
              item.type === 'to' &&
              <div className={style.message}>{item.text}</div>
            }
            {
              item.type === 'notification' &&
              <div className={style.notification}>{item.text}</div>
            }
            {
              item.type === 'toImage' &&
              <img className={style.toImage} src={item.text} alt="#" />
            }
            {
              (item.type === 'to' || item.type === 'toImage') &&
                <>
                  <div className={style.serverAccepted}>
                    <SvgImages svg='daw' fill={item.serverAccepted ? '#0cec0c' : ' #e82554'}/>
                  </div>
                  <div className={style.botAccepted}>
                    <SvgImages svg='line' fill={item.botAccepted ? '#0cec0c' : ' #e82554'}/>
                  </div>
                </>
            }
            <div className={style.date}>{item.date.split(',')[1]}</div>
          </div>
        </div>
      )
    })
  )
}
