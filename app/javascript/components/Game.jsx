import React from "react"
import Dialog from "./Dialog";
import Target from "./Target";
import { useState , useEffect, useRef } from 'react'
import Character from "./Character";
import ScoreForm from "./ScoreForm";
import { useParams, useHistory} from "react-router-dom";


const Game = () => {
  const [coords, setCoords] = useState([])
  const [pic, setPic] = useState({})
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
  const [scrollX, setScrollX] = useState('')
  const [scrollY, setScrollY] = useState('')
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
const handleCoords = (event) => {
  const elem = event.target
  const coord_x = 
    (((event.pageX - elem.offsetLeft) / elem.width) * 10000) / 100
  ;
  const coord_y = 
    (((event.pageY - elem.offsetTop) / elem.height) * 10000) / 100
  ;

  const reverse_x = (coord_x*100/10000*elem.width)+elem.offsetLeft
  // console.log(elem.offsetLeft)
  // console.log(elem.offsetTop)
  // console.log(elem.width)
  console.log(event.pageX)
  console.log(event.pageY)
  console.log(coord_x)
  console.log(coord_y)
  console.log(reverse_x)
  // console.log(pic)
  setCoords([coord_x, coord_y])
  setPic({left:elem.offsetLeft, top:elem.offsetTop, width:elem.width, height:elem.height})

}

const translateCoord = (coords) => {
  let newCoord = []
  newCoord.push((coords[0]*100/10000*pic.width)+pic.left)
  newCoord.push((coords[1]*100/10000*pic.width)+pic.left)
  newCoord.push((coords[2]*100/10000*pic.height)+pic.top)
  newCoord.push((coords[3]*100/10000*pic.height)+pic.top)
  return(newCoord)
}

// const getClickCoords = (event) => {
//   const elem = event.target;
//   const coord_x = Math.floor(
//     (((event.pageX - elem.offsetLeft) / elem.width) * 10000) / 100
//   );
//   const coord_y = Math.floor(
//     (((event.pageY - elem.offsetTop) / elem.width) * 10000) / 100
//   );
//   targetBox.current.style.display = "block";
//   targetBox.current.style.left = event.pageX + "px";
//   targetBox.current.style.top = event.pageY + "px";
//   setCoord({ x: coord_x, y: coord_y });
// };

//Check if target character is selected

  useEffect(() => {
    if(start){
      console.log(coords)
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

//   const targetPresent = (character) => {
//     var character_left = (pic.width/character.coords[0])+pic.left
//     var character_right = (pic.width/character.coords[1])+pic.left
//     var character_top = (pic.height/character.coords[2])+pic.top
//     var character_bottom = (pic.height/character.coords[3])+pic.top

//    if(
//      coords[0] > character_left &&
//      coords[0] < character_right &&
//      coords[1] > character_top &&
//      coords[1] < character_bottom
//    ){
//      setTarget(character)
//    }
//  }

 const targetPresent = (character) => {
  var character_left = character.coords[0]
  var character_right = character.coords[1]
  var character_top = character.coords[2]
  var character_bottom = character.coords[3]
  console.log(character)

 if(
   coords[0] > character_left &&
   coords[0] < character_right &&
   coords[1] > character_top &&
   coords[1] < character_bottom
 ){
   console.log('yes')
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
    console.log(target.name)
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
    console.log(characters)
  },[characters]) 

  const handleName = (e) => {
    setName(e.target.value)
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
    <div className="columns ">

      <button onClick={handleStart} className={`start ${start? "": "active"}`}>
        <p className="is-size-2 has-text-weight-bold">
          START
        </p>
      </button>
      <ScoreForm win={win} name={name} handleName={handleName} sendWinner={sendWinner} />
      <div className="column is-marginless is-paddingless">
        <img id="pic" className="pic" src={image} onClick={(event)=>handleCoords(event)} style={{height: "100%", width: "100%"}}/>
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
          <div>
            <h1>
              {win}
            </h1>
          </div>
        </div>

        <Dialog dialog={dialog} hideDialog={hideDialog} handleSelected={handleSelected} coords={coords} pic={pic} characters={characters}/>
        <Target start={start} coords={coords} characters={characters} pic={pic}/>


        {drawTarget}

    </div>
  )
}


export default Game

