import { useContext } from "react"
import { sessionContext, userContext } from "../../App"

export default function Statistics () {
  const {sessionStats} = useContext(sessionContext)
  const { user } = useContext(userContext)

  return (
    <div className="buttoncontainer">
      <li>
        {new Date().toLocaleDateString()}
      </li>
      <label>🥇 Correct</label>
      <p className="circlebutton green">{user ? user.statistics.correct : sessionStats.correct}</p>
      <label>↻ Maybe next time</label>
      <p className="circlebutton red">{sessionStats.wrong}</p>
      <label>Total</label>
      <p className="circlebutton blue">{sessionStats.correct + sessionStats.wrong}</p>
    </div>
  )
}