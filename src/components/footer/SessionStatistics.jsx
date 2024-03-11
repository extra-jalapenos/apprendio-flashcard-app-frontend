import { useContext, useEffect } from "react"
import { sessionContext } from "../../context"
import { makeHeaders } from "../../helpers/functions"

export default function SessionStatistics () {
  const { sessionStats, setSessionStats } = useContext(sessionContext)

  const loadTodaysStats = () => {
    const get = async () => {
      const endpoint = `/api/users/me/statistics/today`
      const options = {
        headers: makeHeaders()
      }

      try {
        const response = await fetch(endpoint, options)
        if (response.status === 200) {
          const data = await response.json()
          setSessionStats(data.statistic)
        } else if (response.status === 404) {
          setSessionStats({ correct: 0, incorrect: 0 })
        } else {
          console.log()
          return
        }
      } catch (error) {
        console.log(error)
        return
      }
    }
    get()
  }

  useEffect(loadTodaysStats, [])

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
