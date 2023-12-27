import style from './FirstQuestions.module.css'


export const FirstQuestions = ({handlerSend, initialFirstQuestions }) => {
  if(initialFirstQuestions.length === 0) return false;

  return(
    <div className={style.greetings}>
      {
        initialFirstQuestions.map((item, i) =>
          ( <div key={'q' + i} onClick={(e) => { handlerSend(e.target.innerText) }}>{item}</div> ) )
      }
    </div>
  )
}
