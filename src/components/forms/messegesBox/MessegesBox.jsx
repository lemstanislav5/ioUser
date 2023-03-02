import React from 'react';
import Player from './player/Player';
import style from './MessegesBox.module.css';

export const MessegesBox = (props) => {
  const { messeges, colors, SvgImages } = props;

  return(
    messeges.map((item, i) => {
      return (
        <div className={style.msgbox} key={'msg' + i}>
          <div className={style[item.type]} key={i}  style={{'backgroundColor': colors[item.type]}}>
            {
              item.type === 'to' &&
              <div className={style.message}>{item.text}</div>
            }
            {
              item.type === 'from' &&
              <div className={style.message}>{item.text}</div>
            }
            {
              item.type === 'notification' &&
              <div className={style.notificationText}>{item.text}</div>
            }
            {
              item.type === 'toImage' &&
              <img className={style.image} src={item.text} alt="#" />
            }
            {
              item.type === 'documents' &&
              <a href={item.text}><SvgImages svg={'documents'} fill={'#fff'}/>< /a>
            }
            {
              item.type === 'audio' && <Player url={item.text}/>
            }
            {
              item.type === 'video' &&
              < a href="http://www.blablablaaaa.com/products.pdf#page=835">Our Products - Page 835< /a>
            }
            <div className={item.type === 'notification'? style.bottomNotification : style.bottomMessage}>
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
        </div>
      )
    })
  )
}
