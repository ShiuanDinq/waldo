import React from 'react'


const RestartForm = (props) => {

  return (
    <div className={`popup-container ${props.lose? "active" : ""}`}>
      <p className="is-size-3">
        The time to beat is {props.highscore}
      </p>
      <button className="button" onClick={props.restart}>Try again</button>
    </div>

  )
}

export default RestartForm