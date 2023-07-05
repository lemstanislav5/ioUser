import style from './FirstQuestions.module.css'


export const FirstQuestions = ({send, initialFirstQuestions }) => {
  if(initialFirstQuestions.length === 0) return false;

  return(
    <div className={style.greetings}>
      {
        initialFirstQuestions.map((item, i) =>
          ( <div key={'q' + i} onClick={(e) => { send(e.target.innerText) }}>{item}</div> ) )
      }
    </div>
  )
}
