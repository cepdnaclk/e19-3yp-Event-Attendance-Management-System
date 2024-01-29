import React from "react";

const Bubble = ({ content }) => {
  const bubbleStyle = {
    backgroundColor: "#ECE4FD",
    padding: "3px",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "#5E17EB",
    borderRadius: "30px",
    display: "inline-block",
    marginLeft: "10px",
    marginRight: "10px",
  };

  return <div style={bubbleStyle}>{content}</div>;
};

export default Bubble;
