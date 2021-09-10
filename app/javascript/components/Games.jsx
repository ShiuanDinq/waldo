import React from "react"
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from "./Loader"



const Games = () => {
  const [maps, setMaps] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getImageUrls()
  },[])

 
  const getImageUrls =  async () => {
    const url = `/api/v1/games`;
    const response = await fetch(url);
    const json = await response.json();
    setTimeout(() => {
      setMaps(json)
      setIsLoading(false)
    },1500)

  }


  if(maps){
    var mapImages = maps.map((map) =>  
      <div className="column is-one-third">
        <Link to={`/games/${map.id}`}> 
          <div className="has-background-primary card maps-container">
            <img className="map" src={map.image_url}/>
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
      <Loader isLoading={isLoading} />
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