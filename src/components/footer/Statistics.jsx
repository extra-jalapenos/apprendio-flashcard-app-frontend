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
      <circlebutton className="blue"><span>{sessionStats.firstTry}</span></circlebutton>
      <label>🥈🥉 Correct</label>
      <circlebutton className="green">{sessionStats.correct}</circlebutton>
      <label>↻ Maybe next time</label>
      <circlebutton className="red">{sessionStats.wrong}</circlebutton>
    </>
  )
}