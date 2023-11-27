import { useContext, useState } from "react"

export default function Statistics () {
  const initSession = {
    "firstTry": 0,
    "correct": 0,
    "wrong": 0,
    "total": 0
  }
  
  const [sessionStats, setSessionStats] = useState(initSession)

  return (
    <>
      <li>
        {new Date().toLocaleDateString()}
      </li>
      <label>🥇 First Try</label>
      <li className="circleButton blue">{sessionStats.firstTry}</li>
      <label>🥈🥉 Correct</label>
      <li className="circleButton green">{sessionStats.correct}</li>
      <label>↻ Maybe next time</label>
      <li className="circleButton red">{sessionStats.wrong}</li>
    </>
  )
}