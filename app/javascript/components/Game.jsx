import React from "react"
import { useState , useEffect } from 'react'

const Game = () => {

    const [game, setGame] = useState('')
    useEffect(() => {

    var id = 6
    const url = `/api/v1/games/show/${id}`;
    console.log("url")
    console.log(url)

    fetch(url)
      .then(response => {
        if (response.ok) {
          console.log(response)
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setGame(response))
      .catch((err) => console.log(err));


  },[])

  return(
    <div style={{backgroundColor:"red", minHeight:"100vh", minWidth:"100vw"}}>
        
      <img src= {game.image_url} style={{width:"100%"}}/>
      
    </div>
  )
}

export default Game