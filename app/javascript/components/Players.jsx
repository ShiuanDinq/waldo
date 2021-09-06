import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useState([])
  const { id } = useParams();
  const getPlayerUrls =  async () => {
    const url = `/api/v1/games/${id}/players`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json)
    setPlayers(json)
  }

  useEffect(() => {
    getPlayerUrls()
  },[])


  if(players){
    var list = players.map((player) => <h1>{player.name}</h1>)
  }
  

  
  return (
    <div>
      {list}
    </div>
  )
}

export default Players