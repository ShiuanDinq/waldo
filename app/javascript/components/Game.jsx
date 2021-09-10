import React from "react"
import { useState , useEffect, useRef } from 'react'
import { useParams, useHistory} from "react-router-dom";
import Dialog from "./Dialog";
import Target from "./Target";
import Character from "./Character";
import ScoreForm from "./ScoreForm";
import Loader from "./Loader";
import Start from "./Start";
import Waldo from "./Waldo";
import RestartForm from "./RestartForm";

const Game = () => {
  const [coords, setCoords] = useState([])
  const [characters, setCharacters] = useState(null)
  const [selected, setSelected] = useState('')
  const [dialog, setDialog] = useState(null)
  const [image, setImage] = useState(null)
  const [timer, setTimer] = useState(0)
  const [win, setWin] = useState(null)
  const [lose, setLose] = useState(null)
  const [name, setName] = useState('')
  const [start, setStart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [highscore, setHighscore] = useState(null)
  const [display, setDisplay] = useState(null)
  const pic = useRef({})
  const target = useRef({})
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    getImageUrl()  
  },[])

  useEffect(() => {
    handleResult()
  },[characters]) 

  useEffect(() => {
    handleStatus()
  },[selected]) 

  useEffect(() => {
    if(start){
      showDialog()
      handleTarget()
    }
    setSelected('')
  },[coords]) 

  useEffect(() => {
    let int;
    setDisplay(formatTimer(timer))
    if(!foundAll() && start){
      int = setTimeout(()=>tickUp(), 1000)
    }   
    return(() => clearInterval(int))
  })



//Start game---------------------------------------------------------------------------
  const handleStart = () => {
    setStart(true)
  }


// Set game background and character data---------------------------------------------
  const getImageUrl =  async () => {
    const url = `/api/v1/games/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    setTimeout(()=>{
      setImage(json.image_url)
      var char = json.characters.map(char => ({ name: char.name, coords: arrayToFloat(char.coords.split(",")) ,status: false, image_url: char.image_url}));
      var playerScores = json.players.map(player => player.score)
      const min = Math.min(...playerScores)
      setHighscore(min)
      setCharacters(char)
      setIsLoading(false)
    },1500)

  }

  const arrayToFloat = (array) => {
    var coordFloats = array.map(char => parseFloat(char))
    return coordFloats
  }


// Set timer and format timer----------------------------------------------------------------
  const tickUp = () => {
    let time = timer + 1
    setTimer(time)
  }

  const formatTimer = (time) => {
    let sec = time%60
    let min = ~~(time/60)
    let fsec = `${sec<10? "0":""}${sec}` 
    let fmin = `${min<10? "0":""}${min}`
    let stime = `${fmin}:${fsec}`
    return stime

  }


//Set coordinates of clicks-------------------------------------------------------------------
  const handleCoords = (event) => {
    const elem = event.target
    // const coord_x = 
    //   (((event.pageX - elem.offsetLeft) / elem.width) * 10000) / 100
    // ;
    // const coord_y = 
    //   (((event.pageY - elem.offsetTop) / elem.height) * 10000) / 100
    // ;
    // console.log([coord_x, coord_y])


    setCoords([event.pageX, event.pageY])
    pic.current = {left:elem.offsetLeft, top:elem.offsetTop, width:elem.width, height:elem.height}
    console.log(pic.current)

  }

  const translateCoord = (coords) => {
    let newCoord = []
    newCoord.push((coords[0]*100/10000*pic.current.width)+pic.current.left)
    newCoord.push((coords[1]*100/10000*pic.current.width)+pic.current.left)
    newCoord.push((coords[2]*100/10000*pic.current.height)+pic.current.top)
    newCoord.push((coords[3]*100/10000*pic.current.height)+pic.current.top)
    return(newCoord)
  }

  const handleTarget = () => {
    target.current = ''
    if(characters){
      characters.map((character) => targetPresent(character))
    }
  }

  const handleSelected = (name) => {
    setSelected(name)
    hideDialog()
  }


  const targetPresent = (character) => {
    var pcoord =  translateCoord(character.coords)
    var character_left = pcoord[0]
    var character_right = pcoord[1]
    var character_top = pcoord[2]
    var character_bottom = pcoord[3]
  if(
    coords[0] > character_left &&
    coords[0] < character_right &&
    coords[1] > character_top &&
    coords[1] < character_bottom
  ){
    target.current = character
  }
  }

 // Set character status
  const handleStatus = () => {
    if(target.current.name == selected){
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

  const foundAll  = () => {
    if(characters){
      return (characters.every(char => char.status==true))
    }
  }

  const handleResult = () => {
    if(foundAll() && (highscore>timer)){
      setWin(true)
    }else if(foundAll() && (highscore<timer)){
      setLose(true)
    }
  }
  const handleName = (e) => {
    setName(e.target.value)
  }

  const restart = () => {
    window.location.reload() 
  }

  if(characters){
    var drawTarget = characters.map((character) => <Character pic={pic} character={character} translateCoord={translateCoord}/>)
    var targetBox = characters.map(
      (character) => 
      <div className="target-box" >
        <img className="target-img" src={character.image_url} />
        {character.name}
      </div>
    )
  }


  return (
  <div>
    <Loader isLoading={isLoading} />
    <Dialog dialog={dialog} hideDialog={hideDialog} handleSelected={handleSelected} coords={coords} characters={characters}/>
    <Target start={start} coords={coords} characters={characters} />
    {drawTarget}
    <div className={`game ${isLoading? "": "active"}`}>
        <Waldo start={start}/>
        <Start start={start} handleStart={handleStart} />
        <RestartForm lose={lose} restart={restart} highscore={formatTimer(highscore)}/>
        <ScoreForm win={win} name={name} handleName={handleName} sendWinner={sendWinner}/>
        <div className="column is-marginless is-paddingless">
          <img id="pic" className="pic" src={image} onClick={(event)=>handleCoords(event)} style={{ minHeight: "100%", maxHeight:"100%", minWidth:"100%", maxWidth: "100%"}}/>
        </div>

        <div className="footer is-marginless is-paddingless" >
          <h1 className="is-size-4">
            Targets
          </h1>
          {targetBox}
          <div className="card has-background-danger" style={{padding:"0 0.5rem"}}>
            <p className="is-size-3 has-text-white">
              {display}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Game

