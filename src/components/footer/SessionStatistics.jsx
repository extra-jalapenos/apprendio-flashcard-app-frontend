import { useContext, useEffect } from "react"
import { sessionContext } from "../../App"
import { DateToYYYYMMDD, makeHeaders } from "../../helpers/functions"

export default function Statistics () {
  const { sessionStats, setSessionStats } = useContext(sessionContext)

  const loadTodaysStats = () => {
    const get = async () => {
      const todayAsString = DateToYYYYMMDD(new Date())
      const endpoint = `/api/users/me/statistics/${todayAsString}`
      const options = {
        headers: makeHeaders()
      }

      try {
        const response = await fetch(endpoint, options)
        const data = await response.json()
        setSessionStats(data.statistics)
      } catch (error) {
        console.log(error)
        return false
      }
    }
    get()
  }

  useEffect(loadTodaysStats)

  return (
    <div className="buttoncontainer">
      <li>
        {new Date().toLocaleDateString()}
      </li>
      <label>🥇 Correct</label>
      <p className="circlebutton green">{sessionStats ? sessionStats.correct : "…"}</p>
      <label>↻ Maybe next time</label>
      <p className="circlebutton red">{sessionStats ? sessionStats.incorrect : "…"}</p>
      <label>Total</label>
      <p className="circlebutton blue">{sessionStats ? sessionStats.correct + sessionStats.incorrect : "…"}</p>
    </div>
  )
}
