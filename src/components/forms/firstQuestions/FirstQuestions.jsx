import style from './FirstQuestions.module.css'


export const FirstQuestions = ({handlerSend, questions }) => {
  if(questions.length === 0) return false;
//id: 1, question: 'Здравствуйте!', offOn: 1
  return(
    <div className={style.greetings}>
      {
        questions.map((item, i) =>{
          if(item.offOn === 1) return <div key={'key_' + i} onClick={(e) => { handlerSend(e.target.innerText) }}>{item.question}</div>
        })
      }
    </div>
  )
}
