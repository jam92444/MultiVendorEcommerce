import React from 'react';
import  "../Styles/components/_title.scss"

const Title = ({ text1, text2 }) => {
  return (
    <div className="title-wrapper">
      <p className="title-text">
        {text1} <span className="title-highlight">{text2}</span>
      </p>
      <p className="title-line"></p>
    </div>
  );
};

export default Title;
