import { useContext, useEffect } from "react"
import { sessionContext } from "../../context"
import { api } from "../../api/api"

export default function SessionStatistics () {
  const { sessionStats, setSessionStats } = useContext(sessionContext)

  const loadTodaysStats = () => {
    const get = async () => {
      const response = await api.getTodaysStats()
      if (response.message) return
      setSessionStats(response.statistic)
    }
    get()
  }

  useEffect(loadTodaysStats, [setSessionStats])

  if (!sessionStats) return (<></>)
  const correct = sessionStats.correct || ""
  const incorrect = sessionStats.incorrect || ""
  const total = sessionStats ? correct + incorrect : ""

  return (
    <div className="buttoncontainer">
      <label>
        {new Date().toLocaleDateString()}
      </label>
      <p className="circlebutton green">{correct}</p>
      <p className="circlebutton red">{incorrect}</p>
      <p className="circlebutton blue">{total}</p>
    </div>
  )
}
