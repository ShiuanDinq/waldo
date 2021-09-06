import React from 'react'


const ScoreForm = (props) => {

  return (
    <form className={`popup-container ${props.win? "active" : ""}`} onSubmit={props.sendWinner}>
      <p className="is-size-4">
        You beat the highscore!
      </p>
      <label>
        <p className="is-size-4 has-text-weight-light">
          insert your name:
        </p>
        <input type="text" value={props.name} onChange={props.handleName}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>

  )
}

export default ScoreForm