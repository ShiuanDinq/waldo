import React from "react"

const Target = (props) => {

  return(
    <div>
      <div className={`circle ${props.start? "active": ""}`} style={{animationDelay: "0s", left:props.coords[0]-25, top:props.coords[1]-25}}></div>   
    </div>
  )
}

export default Target

