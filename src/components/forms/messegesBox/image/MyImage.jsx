import React, { useState, useEffect } from "react";

const MyImage = ({ url, SvgImages}) => {
  const [err, setErr] = useState(false);
  useEffect(() => {
    let tester=new Image();
        tester.onerror= () => setErr(true);
        tester.src=url;
  }, [])

  if (err) return <SvgImages svg='playError'/>
  return <img src={url} alt="#" />;
};

export default MyImage;
