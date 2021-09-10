import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useState([])
  const { id } = useParams();

  useEffect(() => {
    getPlayerUrls()
  },[])

  const getPlayerUrls =  async () => {
    const url = `/api/v1/games/${id}/players`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json)
    setPlayers(json)
  }

  const formatTimer = (time) => {
    let sec = time%60
    let min = ~~(time/60)
    let fsec = `${sec<10? "0":""}${sec}` 
    let fmin = `${min<10? "0":""}${min}`
    let stime = `${fmin}:${fsec}`
    return stime
  }

  if(players){
    let i = 0;
    var list = players.map(
      (player) => 
      <div className="columns">
        <div className="column is-2">
          <p className="is-size-4">
            {i+=1}.
          </p>
        </div> 
        <div className="column is-5 has-text-left">
          <p className="is-size-4">
            {player.name}
          </p>
        </div>
        <div className="column is-5">
          <p className="is-size-4">
            {formatTimer(player.score)}
          </p>
        </div>
      </div>
    )
  }
    
  return (
    <div className="section">
    <div className="container">
      <div className="columns is-centered">
        <div className="column card is-half has-text-centered">
        <div className="has-background-primary">
          <h1 className="is-size-3">
            LEADERBOARD
          </h1>
        </div>
        <div className="notification">
        {list}
        </div>
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default Players