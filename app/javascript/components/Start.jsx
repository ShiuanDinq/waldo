import React from 'react'

const Start = (props) => {
  return(
    <button onClick={props.handleStart} className={`start ${props.start? "": "active"}`}>
      <p className="is-size-2 has-text-weight-bold">
        START
      </p>
    </button>
  )
}

export default Start