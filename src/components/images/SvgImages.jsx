export const SvgImages = (props) => {
  const { svg, fill } = props;
  return (
    <>
      {svg === 'open' &&
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
        </svg>
      }
      {svg === 'send' &&
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"/>
        </svg>
      }
      {svg === 'close' &&
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      }
      {svg === 'backСall' &&
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.471 17.471 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969zM15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0z"/>
        </svg>
      }
      {svg === 'openChat' &&
        <svg height="50px" width="50px" version="1.1" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 58 58" >
        <g>
        <path fill={props.fill} d="M53,3.293H5c-2.722,0-5,2.278-5,5v33c0,2.722,2.278,5,5,5h27.681l-4.439-5.161
          c-0.36-0.418-0.313-1.05,0.106-1.41c0.419-0.36,1.051-0.312,1.411,0.106l4.998,5.811L43,54.707v-8.414h2h6h2c2.722,0,5-2.278,5-5
          v-33C58,5.571,55.722,3.293,53,3.293z"/>
        <circle fill="#FFFFFF" cx="15" cy="24.799" r="3"/>
        <circle fill="#FFFFFF" cx="29" cy="24.799" r="3"/>
        <circle fill="#FFFFFF" cx="43" cy="24.799" r="3"/>
        </g>
        </svg>
      }
      {svg === 'daw' &&
        <svg xmlns="http://www.w3.org/2000/svg" fill={fill} x="0px" y="0px" width="14" height="24" viewBox="0 0 24 24">
          <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path>
        </svg>
      }
      {svg === 'line' &&
        <svg xmlns="http://www.w3.org/2000/svg" fill={fill} x="0px" y="0px" width="14" height="24" viewBox="0 0 24 24">
          <path d="M 20.293 5.293 L 9 16.5859 L 7 17 L 9 19.4141 L 21.707 6.707 L 20.293 5.293 z"></path>
        </svg>
      }
      {svg === 'attachment' &&
        <svg xmlns="http://www.w3.org/2000/svg" fill={fill} x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
          <path d="M7.44 15.44a1.5 1.5 0 0 0 2.115 2.125L20.111 7.131a3 3 0 1 0-4.223-4.262L4.332 14.304a4.5 4.5 0 1 0 6.364 6.363l8.98-9.079.712.703-8.981 9.08a5.5 5.5 0 1 1-7.779-7.777L15.185 2.159a4 4 0 1 1 5.63 5.683L10.259 18.276a2.5 2.5 0 0 1-3.527-3.544l8-8 .707.707z"/><path fill="none" d="M0 0h24v24H0z"/>
        </svg>
      }
      {svg === 'documents' &&
        <svg fill="#fff" width="40px" height="40px" viewBox="-274.15 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 161c-16.5 0-30 13.5-30 30v827.8c0 16.5 13.5 30 30 30h591.7c16.5 0 30-13.5 30-30V343.7L469 161H30zm389.6 60v134.8c0 19.9 16.3 36.2 36.2 36.2h135.9v596.8H60V221h359.6z"/>
          <path d="M123.8 768.6h394.8v50H123.8zm0-124.6h394.8v50H123.8zm0-124.5h394.8v50H123.8z"/>
          <circle cx="194" cy="382.3" r="60"/>
        </svg>
      }
      {svg === 'play' &&
        <svg width="40px" height="40px" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#fff" strokeWidth="2"/>
        <path d="M10.9 8.8L10.6577 8.66152C10.1418 8.36676 9.5 8.73922 9.5 9.33333L9.5 14.6667C9.5 15.2608 10.1418 15.6332 10.6577 15.3385L10.9 15.2L15.1 12.8C15.719 12.4463 15.719 11.5537 15.1 11.2L10.9 8.8Z" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
      {svg === 'pause' &&
        <svg width="40px" height="40px" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#fff" strokeWidth="2"/>
        <path d="M14 9L14 15" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 9L10 15" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    </>
  );
}
