import React, { useState, useEffect } from "react";

const FileAvailabilityCheck = ({ url, SvgImages, WrappedComponent}) => {
  const [err, setErr] = useState(null);
  useEffect(() => {
    console.log(url)
    fetch(url)
      .then((response) => {
        console.log('response', response.status === 404);
        if (response.status === 404) return setErr(false);
        setErr(true);
      })
      .catch((err) => {
        setErr(false);
        console.log(err);
      });
  }, [url])

  if (err === null) return <></>;
  if (err === false) {
    return <SvgImages/>
  } else {
    return <WrappedComponent/>;
  }  
};

export default FileAvailabilityCheck;