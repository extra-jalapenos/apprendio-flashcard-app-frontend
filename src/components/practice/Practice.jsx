import { useState, useContext } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import CardPair from "./CardPair"
import CardStats from "./CardStatistics"
import { changeCardStats } from "../../helpers/functions"
import { makeHeaders } from "../../helpers/auth"
import { sessionContext } from "../../context"
import Loading from "../loadingScreen/Loading"

export default function Practice ({ card, setCard, next }) {
  const { setSessionStats } = useContext(sessionContext)

  const [showAnswer, setShowAnswer] = useState(false)
  const [userEntry, setUserEntry] = useState("")
  const [evaluation, setEvaluation] = useState(null)
  useHotkeys(["ArrowUp", "ArrowDown"], (event) => {
    if (!showAnswer) {
      handleSubmit()
    } else {
      if (event.key === "ArrowUp") {
        logCorrect()
      } else if (event.key === "ArrowDown") {
        logWrong()
      }
    }
  });

  useHotkeys(['arrowright'], () => {
    if (showAnswer === false) {
      next();
    }
  })

  if (!card) {
    return <Loading message="Loading card…"/>
  }

  const { id, answer } = card

  const resetDisplayOptions = () => {
    setShowAnswer(false)
    setUserEntry("")
    setEvaluation(null)
  }

  const handleEntry = (event) => setUserEntry(event.target.value)

  const handleSubmit = () => {
    answer.match(userEntry) ? setEvaluation(true) : setEvaluation(false)
    setShowAnswer(true)
  }

  const logCorrect = async () => {
    try {
      updateTodaysStats(1, 0)
    } catch {
      console.log("error logging stat change")
    }
    setCard({
      ...card,
      level: card.level+1,
      repetitions: card.repetitions+1,
      lastAskedAt: new Date().toISOString()
    })
    try {
      const changedCard = await changeCardStats(id, 1)
      if (changedCard) {
        resetDisplayOptions()
        next()
      }
    } catch (error) {
      console.log("error logging correct", error)
    }
  }

  const logWrong = async () => {
    try {
      updateTodaysStats(null, 1)
    } catch {
      console.log("error logging stat change")
    }
    setCard({
      ...card,
      repetitions: card.repetitions+1
    })
    try {
      const changedCard = await changeCardStats(id, -1)
      if (changedCard) {
        resetDisplayOptions()
        next()
      }
    } catch (error) {
      console.log("error logging wrong", error)
    }
  }

  /**
   * updateTodaysStats
   * @param {int} increaseDecreaseAsNum
   */
  const updateTodaysStats = async (correct, incorrect) => {
    const queryParams = []
    if (correct > 0) {
      queryParams.push(`correct=${correct}`)
    }
    if (incorrect > 0) {
      queryParams.push(`incorrect=${incorrect}`)
    }

    if (queryParams.length === 0) return

    const queryParamStr = () => {
      if (queryParams.length > 0) return "?" + queryParams.join("&")
      return ""
    }

    const endpoint = `/api/users/me/statistics/today${queryParamStr()}`
    const options = {
      method: "PATCH",
      headers: makeHeaders()
    }

    try {
      const response = await fetch(endpoint, options)
      const data = await response.json()
      console.log("setting session stats", data)
      setSessionStats(data.statistic)
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    <>
      <CardStats card={card} />
      <CardPair props={card} revealAnswer={showAnswer} handleEntry={handleEntry}/>
      {evaluation === null &&
        <div className="buttoncontainer">
          <button onClick={handleSubmit}>Enter</button>
          <button className="red" onClick={next}>Next →</button>
        </div>
      }
      {evaluation !== null &&
      <div className="buttoncontainer">
        <button className="circlebutton green" onClick={logCorrect}>✓</button>
        <button className="circlebutton red" onClick={logWrong}>×</button>
      </div>
      }
      <div>
        <p><em><b>Psst!</b></em> Did you know that you can control this app with your keyboard?</p>
        <p>Press arrow up ↑ to reveal the answer or arrow right → to skip a card.<br/>
        To log your answer, press arrow up ↑ for right or arrow down ↓ for wrong.</p>
      </div>
    </>
  )
}
