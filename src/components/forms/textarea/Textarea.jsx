import React from 'react';
import style from './Textarea.module.css';

export const Textarea = (props) => {
  const { keyDown, placeholder, setDataMessage, message, backgroundColor } = props;

  return(
    <textarea
      onKeyDown={keyDown}
      className={style.textarea}
      placeholder={placeholder}
      onChange={(event) => setDataMessage(event.target.value)}
      value={message}
      style={{'backgroundColor': backgroundColor}}
    />
  )
}
