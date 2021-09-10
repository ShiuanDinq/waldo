import React from "react"

const Dialog = (props) => {

    if(props.characters){
      var characters = props.characters.map(
        (char)=> 
          <div className="selection">
            <h1 className="is-size-5 has-text-weight-bold" onClick={() => props.handleSelected(char.name)}>
              {char.name}
            </h1>
          </div>
      )
    }
    

  
  return (

    <div className={`dialog level is-one ${props.dialog? "active": ""}`} style={{position:"absolute", left:props.coords[0], top:props.coords[1], zIndex:2}}>
      <div className="level-left">
        <div className="cancel-button level-items is-one-third has-background-danger"  onClick={props.hideDialog}><p className="has-text-weight-bold" style={{margin:"0.2rem 0.5rem"}}>x</p></div>
        <div className="card level-items is-two-third">
          {characters}
        </div>

      </div>

    </div>
  )
}

export default Dialog