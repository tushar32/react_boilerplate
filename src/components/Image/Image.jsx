import React, { useState } from "react";
const Image = (props) => {
  const [failed, setFailed] = useState(false);

  const fallback = () => {
    if (props.fallbackSrc) {
      setFailed(true);
    }
  };

  if (failed || props.src === null || props.src === undefined) {
    return <img src={props.fallbackSrc} />;
  } else {
    return (
      <img className={props.className} src={props.src} onError={fallback} style={props.style} />
    );
  }
};
export default Image;
