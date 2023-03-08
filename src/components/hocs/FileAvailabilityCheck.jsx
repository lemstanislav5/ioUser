import React, { useState, useEffect } from "react";

const FileAvailabilityCheck = ({ url, SvgImages, Component }) => {
  const [fileAvailability, setFileAvailability] = useState(null);
  useEffect(async() => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setFileAvailability(false);
        throw Error(`is not ok: ` + response.status);
      } else {
        setFileAvailability(true);
      }
    } catch (error) {
      setFileAvailability(false);
      console.log('There was an error', error);
    }

  }, [url])

  if (fileAvailability === null){
    return <></>
  } else if (fileAvailability === false) {
    return <SvgImages svg='playError'/>
  } else if (fileAvailability === true) {
    return <Component url={url} SvgImages={SvgImages}/>
  }
};

export default FileAvailabilityCheck;