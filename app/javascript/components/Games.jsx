import React from "react"
import Dialog from "./Dialog";
import Target from "./Target";
import { useState , useEffect } from 'react'
import Character from "./Character";




const Games = () => {
  const [coords, setCoords] = useState([300,300])
  const [pic, setPic] = useState([])
  const [characters, setCharacters] = useState([{name:'wald1', coord:[2.45, 2.3, 27.8, 7.65], status:false}, {name:'wald2', coord:[5.8, 5.147, 2.781, 2.243], status:false}, {name:'wald3', coord:[2.619, 2.427, 2.330, 1.978], status:false}])
  const [selected, setSelected] = useState('')
  const [target, setTarget] = useState('')
  const [dialog, setDialog] = useState(false)
  // const [games, setGames] = useState('')

  // useEffect(() => {
  //   const url = "/api/v1/games/index";
  //   fetch(url)
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then(response => setGames(response))
  //     .catch((err) => console.log(err));

  // },[])



  const showDialog = () => {
    setDialog(true)
  }

  const hideDialog = () => {
    setDialog(false)
  }

  const handleCoords = (click) => {
    console.log("set coord")
    setCoords([click.pageX, click.pageY])
    setPic(click.target.getBoundingClientRect())

  }

  const handleStatus = () => {
    if(target.name == selected){
      setCharacters((prevState) => {  
        const newChar = prevState.map((char) => {
          if(char.name == selected){
            return({name:char.name, coord:char.coord, status:true})
          }else{
            return(char)
          }
        })
        return(newChar)
      })     
    }  
  }

  const handleSelected = (name) => {
    setSelected(name)
    hideDialog()
  }

  const concede = () => {
    const picture = document.getElementById("pic")
    setPic(picture.getBoundingClientRect())
    setCharacters((prevState) => {  
      const newChar = prevState.map((char) => {
          return({name:char.name, coord:char.coord, status:true})
      }) 
      return(newChar)
    })  
  }


  const targetPresent = (character) => {
     var character_left = (pic.width/character.coord[0])+pic.left
     var character_right = (pic.width/character.coord[1])+pic.left
     var character_top = (pic.height/character.coord[2])+pic.top
     var character_bottom = (pic.height/character.coord[3])+pic.top

    if(
      coords[0] > character_left &&
      coords[0] < character_right &&
      coords[1] > character_top &&
      coords[1] < character_bottom
    ){
      setTarget(character)
    }
  }
  
  const handleTarget = () => {
    setTarget('')
    characters.map((character) => targetPresent(character))
  }

  useEffect(() => {
    showDialog()
    handleTarget()
  },[coords]) 

  useEffect(() => {
    handleStatus()
  },[selected]) 

  useEffect(() => {
    setSelected('')
  },[coords]) 





  return (
    <div className="section">
      <Dialog dialog={dialog} hideDialog={hideDialog} handleSelected={handleSelected} coords={coords} characters={characters}/>
      <Target coords={coords} characters={characters} pic={pic} />
      {characters.map((character) => <Character pic={pic} character={character} />)}

      <div className="container">
        <h1 className="is-size-3">Where's Waldo?</h1>
        <button id="concede" onClick={concede}>Concede</button>

        <div className="columns">
          <div className="column">
            <img id="pic" className="pic" src="waldo_1.png"  onClick={handleCoords} style={{objectFit:"contain"}}/>
          </div>
        </div>
      </div>
    </div>

  )
}


export default Games