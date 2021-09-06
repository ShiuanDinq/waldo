import React from "react"
import Dialog from "./Dialog";
import Target from "./Target";
import { useState , useEffect, useRef } from 'react'
import Character from "./Character";
import ScoreForm from "./ScoreForm";
import { useParams, useHistory} from "react-router-dom";


const Game = () => {
  const [coords, setCoords] = useState([])
  const [pic, setPic] = useState([])
  const [characters, setCharacters] = useState(null)
  const [selected, setSelected] = useState('')
  const [target, setTarget] = useState('')
  const [dialog, setDialog] = useState('')
  const [image, setImage] = useState('')
  const { id } = useParams();
  const [timer, setTimer] = useState(0)
  const [win, setWin] = useState('')
  const [display, setDisplay] = useState('')
  const [name, setName] = useState('')
  const [start, setStart] = useState('')
  let history = useHistory();



//Start game---------------------------------------------------------------------------
const handleStart = () => {
  setStart(true)
}


// Set game background and character data---------------------------------------------
  const getImageUrl =  async () => {
    const url = `/api/v1/games/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    setImage(json.image_url)
    var char = json.characters.map(char => ({ name: char.name, coords: arrayToFloat(char.coords.split(",")) ,status: false, image_url: char.image_url}));
    setCharacters(char)
  }

  const arrayToFloat = (array) => {
    var coordFloats = array.map(char => parseFloat(char))
    return coordFloats
  }

  useEffect(() => {
    getImageUrl()  
  },[])


// Set timer and format timer----------------------------------------------------------------
  const tickUp = () => {
    let time = timer + 1
    setTimer(time)
  }

  const formatTimer = () => {
    let sec = timer%60
    let min = ~~(timer/60)
    let fsec = `${sec<10? "0":""}${sec}` 
    let fmin = `${min<10? "0":""}${min}`
    let stime = `${fmin}:${fsec}`
    setDisplay(stime)
  }

  useEffect(() => {
    let int;
    formatTimer()
    if(!winning() && start){
      int = setTimeout(()=>tickUp(), 1000)
    }
    
    return(() => clearInterval(int))

  })

//Set coordinates of clicks-------------------------------------------------------------------
const handleCoords = (click) => {
  setCoords([click.pageX, click.pageY])
  // console.log('setting coord')
  setPic(click.target.getBoundingClientRect())

}

//Check if target character is selected

  useEffect(() => {
    if(start){
      showDialog()
      handleTarget()
    }

  },[coords]) 

  const handleTarget = () => {
    setTarget('')
    if(characters){
      characters.map((character) => targetPresent(character))
    }
  }

  const handleSelected = (name) => {
    setSelected(name)
    hideDialog()
  }

  const targetPresent = (character) => {
    var character_left = (pic.width/character.coords[0])+pic.left
    var character_right = (pic.width/character.coords[1])+pic.left
    var character_top = (pic.height/character.coords[2])+pic.top
    var character_bottom = (pic.height/character.coords[3])+pic.top

   if(
     coords[0] > character_left &&
     coords[0] < character_right &&
     coords[1] > character_top &&
     coords[1] < character_bottom
   ){
     setTarget(character)
   }
 }

  useEffect(() => {
    handleStatus()
  },[selected]) 

  useEffect(() => {
    setSelected('')
  },[coords]) 

 // Set character status
 const handleStatus = () => {
  if(target.name == selected){
    setCharacters((prevState) => {  
      const newChar = prevState.map((char) => {
        if(char.name == selected){
          return({name:char.name, coords:char.coords, status:true, image_url:char.image_url})
        }else{
          return(char)
        }
      })
      return(newChar)
    })     
  }  
}



//Set dialog visibility----------------------------------------------------------------------

  const showDialog = () => {
    setDialog(true)
  }

  const hideDialog = () => {
    setDialog(false)
  }





  // const concede = () => {
  //   const picture = document.getElementById("pic")
  //   setPic(picture.getBoundingClientRect())
  //   setCharacters((prevState) => {  
  //     const newChar = prevState.map((char) => {
  //         return({name:char.name, coords:char.coords, status:true, image_url:char.image_url})
  //     }) 
  //     return(newChar)
  //   })  
  // }


// Set winner----------------------------------------------------------------------------------
const sendWinner = async (e) => {
  e.preventDefault()
  let apiUrl = `/api/v1/games/${id}/players`

  const token = document.querySelector('meta[name="csrf-token"]').content;
  let resp = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name: name, score: timer, game_id: id}),
  });
  if(resp.ok){
    history.push(`/games/${id}/players`)
  }else{
    console.log('no')
  }





};


  const winning = () => {
    if(characters){
      return (characters.every(char => char.status==true))
    }
  }

  const handleWin = () => {
    if(winning()){
      setWin(true)
    } 
  }

  useEffect(() => {
    handleWin()
  },[characters]) 

  const handleName = (e) => {
    setName(e.target.value)
  }

















  if(characters){
    var drawTarget = characters.map((character) => <Character pic={pic} character={character} />)
    var targetBox = characters.map(
      (character) => 
      <div className="target-box" >
        <img className="target-img" src={character.image_url} />
        {character.name}
      </div>
    )
  }

  
  return (
    <div className="columns ">

      <button onClick={handleStart} className={`start ${start? "": "active"}`}>
        <p className="is-size-2 has-text-weight-bold">
          START
        </p>
      </button>
      <ScoreForm win={win} name={name} handleName={handleName} sendWinner={sendWinner} />
      <div className="column is-11 is-marginless is-paddingless">
        <img id="pic" className="pic" src={image} onClick={handleCoords} style={{minWidth:"100%"}}/>
      </div>
      <div className="column is-1 has-background-primary is-marginless is-paddingless">
        <div className="sidebar" >
          <h1 className="is-size-4">
            Targets
          </h1>
          {targetBox}
          <div className="card has-background-danger" style={{padding:"0 0.5rem"}}>
            <p className="is-size-3 has-text-white">
              {display}
            </p>
          </div>
          <div>
            <h1>
              {win}
            </h1>
          </div>
        </div>

        <Dialog dialog={dialog} hideDialog={hideDialog} handleSelected={handleSelected} coords={coords} characters={characters}/>
        <Target start={start} coords={coords} characters={characters} pic={pic} />


        {drawTarget}
      </div>
    </div>
  )
}


export default Game

