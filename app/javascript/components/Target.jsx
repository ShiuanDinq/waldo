import React from "react"

const Target = (props) => {

  return(
    <div>
      <div className={`circle ${props.start? "active": ""}`} style={{animationDelay: "0s", left:(props.coords[0]*100/10000*props.pic.width)+props.pic.left, top:(props.coords[1]*100/10000*props.pic.height)+props.pic.top}}></div>   
    </div>
  )
}

export default Target

