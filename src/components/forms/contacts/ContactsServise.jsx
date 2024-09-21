
import React from 'react';
import style from './ContactsServise.module.css';

export const ContactsServise = ({ SvgImages, contacts, color }) => {
  return (
      <div className={style.wrapper}>
        {
          contacts.map((item, i) => {
            if(item.offOn === 1) return (
              <a key={'key_' + i} href={item.link} target='_blank' rel='nofollow noopener noreferrer'>
                  <SvgImages svg={item.socialNetwork}/>
                  <div style={{color: color}}>{item.socialNetwork}</div>
              </a>
            )
          })
        }
      </div>
  )
}
