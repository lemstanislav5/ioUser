import React, { useState, useEffect } from "react";

const FileAvailabilityCheck = ({ url, SvgImages, Component }) => {
  const [fileAvailability, setFileAvailability] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(res => {
        //! ОСТАНОВИЛСЯ
        
        if (res.status === 202 || res.status === 200) setFileAvailability(true);
      })
      .catch(err => console.log(err));
  }, [url])
  console.log(fileAvailability, url)
  if (fileAvailability === null){
    return <></>
  } else if (fileAvailability === false) {
    return <SvgImages svg='playError'/>
  } else if (fileAvailability === true) {
    return <Component url={url} SvgImages={SvgImages}/>
  }
};

export default FileAvailabilityCheck;
