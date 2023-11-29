import { useContext } from "react"
import { sessionContext } from "../../App"

export default function Statistics () {
  const {sessionStats} = useContext(sessionContext)
  
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
      <p className="circlebutton blue">{sessionStats.correct + sessionStats.wrong}</p>
    </div>
  )
}