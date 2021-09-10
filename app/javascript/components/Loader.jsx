import React from 'react';

const Loader = (props) => {
  return(
  <div className={`dot-container ${props.isLoading? "active" : ""}`}>
    <span className="dot" style={{animationDelay: '0'}}></span>
    <span className="dot" style={{animationDelay: '300ms'}}></span>
    <span className="dot" style={{animationDelay: '600ms'}}></span>
  </div>
  )
}

export default Loader