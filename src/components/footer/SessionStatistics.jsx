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
          console.log("no session stats yet")
        }
        return
      } catch (error) {
        console.log(error)
        return
      }
    }
    get()
  }

  useEffect(loadTodaysStats, [])

  if (!sessionStats) return (<></>)
  const correct = sessionStats.correct ? sessionStats.correct : ""
  const incorrect = sessionStats.incorrect ? sessionStats.incorrect : ""
  const total = sessionStats ? correct + incorrect : ""

  return (
    <div className="buttoncontainer">
      <label>
        {new Date().toLocaleDateString()}
      </label>
      {/* <label>🥇 Correct</label> */}
      <p className="circlebutton green">{correct}</p>
      {/* <label>↻ Maybe next time</label> */}
      <p className="circlebutton red">{incorrect}</p>
      {/* <label>Total</label> */}
      <p className="circlebutton blue">{total}</p>
    </div>
  )
}
