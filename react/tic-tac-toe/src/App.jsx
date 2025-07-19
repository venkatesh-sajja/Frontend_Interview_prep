import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [cells, setCells] = useState(Array(9).fill(""))
  const [currentUser, setCurrentUser] = useState("X")
  const [infoText, setInfoText] = useState(`Current User: ${currentUser}`)
  const [gameEnd,setGameEnd] = useState(false)
  const winCombination =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

  ]
  const handleClick = (index, currentUser) => {
    if(gameEnd) return
    let updatedCells = [...cells]
    updatedCells[index] = currentUser
    let nextUser = currentUser === "X"?"O":"X"
    if(gameOver(updatedCells, currentUser)){
      setGameEnd(true)
      setInfoText("Game Over")
      
    }else if(updatedCells.every(cell => cell !== "")){
      setGameEnd(true)
      setInfoText("Game Draw")
       
    }else{
      setInfoText(`Current User: ${nextUser}`)
    }
    setCurrentUser(nextUser)
    setCells(updatedCells)
  }
  const gameOver = (cells, currentUser) => {
      return winCombination.some(eachCombination => 
        eachCombination.every(eachWin => cells[eachWin] === currentUser)
      )
  } 
  const handleReset = () => {
    debugger
    setCells(Array(9).fill(""))
    setInfoText(`Current User: ${currentUser}`)
    setCurrentUser("X")
    if(gameEnd) setGameEnd(false)
  }
  return (
    <>
      <h2>{infoText}</h2>
      <button onClick={handleReset}>reset</button>
      <div className="holder">
      <div className="main-div">
        {cells.map((cell, index) => (
          <div className="item-div" key={index} onClick={() => handleClick(index,currentUser)}>
            {cell}
          </div>
        ))}
        
      </div>
      </div>
    </>
  )
}

export default App
