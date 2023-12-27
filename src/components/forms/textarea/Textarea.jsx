import style from './Textarea.module.css';

export const Textarea = ({ keyDown, placeholder, setTextMessage, message, backgroundColor }) => {
  return(
    <textarea
      onKeyDown={keyDown}
      className={style.textarea}
      placeholder={placeholder}
      onChange={(event) => setTextMessage(event.target.value)}
      value={message}
      style={{'backgroundColor': backgroundColor}}
    />
  )
}
