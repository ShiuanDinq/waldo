import React from "react"
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'



const Games = () => {
  const [maps, setMaps] = useState("")

  useEffect(() => {
    getImageUrls()
  },[])

 
  const getImageUrls =  async () => {
    const url = `/api/v1/games`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json)
    setMaps(json)
  }


  if(maps){
    var mapImages = maps.map((map) =>  
      <div className="column is-one-third">
        <Link to={`/games/${map.id}`}> 
          <div className="has-background-primary card">
            <img src={map.image_url} />
            <p className="is-size-4 has-text-white has-text-centered">
              {map.name}
            </p>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="is-size-3">Choose Map</h1>
        <div className="columns">
            {mapImages}
        </div>
      </div>
    </div>

  )
}


export default Games