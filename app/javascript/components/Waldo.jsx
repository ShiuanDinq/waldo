import React from 'react'

const Waldo = (props) => {
  return(
    <div className={`part-container ${props.start? "active":""}`}>
      <img className="part head" src="/whead.png" />
      <img className="part arm" src="/warm.png" />
      <img className="part" src="/wtorso.png" />
    </div>
  )
}

export default Waldo