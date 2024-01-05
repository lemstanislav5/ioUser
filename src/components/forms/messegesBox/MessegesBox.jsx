import {useRef} from 'react';
import {memo}  from 'react';
import AudioPlayer from './audio/AudioPlayer';
import VideoPlayer from './video/VideoPlayer';
import style from './MessegesBox.module.css';
import MyImage from './image/MyImage';
import FileAvailabilityCheck from '../../hocs/FileAvailabilityCheck';
import Document from './document/Document';
import {getDateTime} from '../../../services/getDateTime'

export const MessegesBox = memo(({ chatId, messeges, colors, SvgImages }) => {
  let date = useRef(null);

  const dateChangeCheck = (mDate) => {
    if (date.current === null) {
      date.current = mDate;
      return true; 
    } else {
      if (date.current !== mDate) {
        date.current = mDate;
        return true; 
      }
    }
  }

  return(
    messeges.map(({from, text, time, type, read}, i) => {
      const direction = (chatId !== from)? 'to': 'from', [mDate, mTime] = getDateTime(time);
      return (
        <div className={style.msgbox} key={'msg' + i}>
          {dateChangeCheck(mDate) &&  <div className={style.newDate}>{mDate}</div>}
          <div className={style[direction]} key={i}  style={{'backgroundColor': colors[direction]}}>
            {type === 'text' && <div className={style.message}>{text}</div>}
            {type === 'notification' && <div className={style.notificationText}>{text}</div>}
            {(type === 'jpeg' || type === 'jpg' || type === 'png') && <FileAvailabilityCheck className={style.image} url={text} SvgImages={SvgImages} Component={MyImage}/>}
            {(type === 'pdf' || type === 'doc' || type === 'docx' || type === 'txt') && <FileAvailabilityCheck url={text} SvgImages={SvgImages} Component={Document}/>}
            {type === 'mp3' && <FileAvailabilityCheck url={text} SvgImages={SvgImages} Component={AudioPlayer}/>}
            {type === 'mp4' && <FileAvailabilityCheck url={text} SvgImages={SvgImages} Component={VideoPlayer}/>}
            <div className={type === 'notification'? style.bottomNotification : style.bottomMessage}>
              {
                (direction === 'to') &&
                  <>
                    <div className={style.send}>
                      <SvgImages svg='daw' fill={'#0cec0c'}/>
                    </div>
                    <div className={style.read}>
                      <SvgImages svg='line' fill={read ? '#0cec0c' : ' #e82554'}/>
                    </div>
                  </>
              }
              <div className={style.time}>{mTime}</div>
            </div>
          </div>
        </div>
      )
    })
  )
});
