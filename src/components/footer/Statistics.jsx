import { useContext, useState } from "react"

const initSession = {
  "firstTry": (sessionStorage.getItem("firstTry") || 0),
  "correct": (sessionStorage.getItem("correct") || 0),
  "wrong": (sessionStorage.getItem("wrong") || 0),
  "total": (sessionStorage.getItem("total") || 0)
}

export default function Statistics () {
  
  const handleIncrease = (event) => {
    const { name } = event.target
    const { oldValue } = !sessionStorage.getItem(name) ? initSession[name] : 2
    localStorage.setItem(name, oldValue + 1)
    console.log(localStorage)
  }
  
  const [sessionStats, setSessionStats] = useState(initSession)

  return (
    <div className="buttoncontainer">
      <li>
        {new Date().toLocaleDateString()}
      </li>
      <label>🥇 First Try</label>
      <p className="circlebutton blue" name="firstTry" onClick={(event) => handleIncrease(event)}><span>{sessionStats.firstTry}</span></p>
      <label>🥈🥉 Correct</label>
      <p className="circlebutton green">{sessionStats.correct}</p>
      <label>↻ Maybe next time</label>
      <p className="circlebutton red">{sessionStats.wrong}</p>
    </div>
  )
}