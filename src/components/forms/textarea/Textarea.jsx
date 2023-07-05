import style from './Textarea.module.css';

export const Textarea = ({ keyDown, placeholder, setDataMessage, message, backgroundColor }) => {
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
