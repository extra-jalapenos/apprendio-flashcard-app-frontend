import { useContext, useState } from "react"

const initSession = {
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
  
  console.log(initSession)
  const [sessionStats, setSessionStats] = useState(initSession)

  return (
    <div className="buttoncontainer">
      <li>
        {new Date().toLocaleDateString()}
      </li>
      <label>🥇 Correct</label>
      <p className="circlebutton green">{sessionStats.correct}</p>
      <label>↻ Maybe next time</label>
      <p className="circlebutton red">{sessionStats.wrong}</p>
      <label>Total</label>
      <p className="circlebutton blue">{sessionStats.total}</p>
    </div>
  )
}