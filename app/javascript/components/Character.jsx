import React from "react"

const Character = (props) => {

  var pcoord = props.translateCoord(props.character.coords)
  var left = pcoord[0]
  var right = pcoord[1]
  var top = pcoord[2]
  var bottom = pcoord[3]


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