import React from "react"

const Character = (props) => {
  var left = (props.pic.width/props.character.coord[0])+props.pic.left
  var right = (props.pic.width/props.character.coord[1])+props.pic.left
  var top = (props.pic.height/props.character.coord[2])+props.pic.top
  var bottom = (props.pic.height/props.character.coord[3])+props.pic.top


  // const sides = {
  //   // position offset to account for photo-container's padding:
  //   bottom: bottom + 10,
  //   left: left + 10,
  //   width: right - left,
  //   height: top - bottom,
  // }
  return(
    <div className={`char ${props.character.status? "active": ""}`} style={{left:left, top:top, width:(right-left), height:(bottom-top)}}>{props.height}</div>
 
  )
}

export default Character