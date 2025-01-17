import { useState, useContext } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import CardPair from "./CardPair"
import CardStats from "./CardStatistics"
import { sessionContext } from "../../context"
import Loading from "../loadingScreen/Loading"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/api"

export default function Practice ({ card, setCard, next }) {
  const { setSessionStats } = useContext(sessionContext)

  const [showAnswer, setShowAnswer] = useState(false)
  const [userEntry, setUserEntry] = useState("")
  const [evaluation, setEvaluation] = useState(null)
  const navigate = useNavigate()

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
      const stats = api.updateTodaysStats({ correct: 1, incorrect: 0})
      setSessionStats(stats.statistic)
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
      const response = await api.changeCardStats({ cardId: id, changeBy: 1 })
      if (response.message) return
      resetDisplayOptions()
      next()
    } catch (error) {
      console.log("error logging correct", error)
    }
  }

  const logWrong = async () => {
    try {
      const stats = api.updateTodaysStats({ correct: null, incorrect: 1})
      setSessionStats(stats.statistic)
    } catch {
      console.log("error logging stat change")
    }
    setCard({
      ...card,
      repetitions: card.repetitions+1
    })

    try {
      const response = await api.changeCardStats({ cardId: id, changeBy: -1 })
      if (response.message) return
      resetDisplayOptions()
      next()
    } catch (error) {
      console.log("error logging wrong", error)
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
        <button onClick={()=>navigate(`/edit/${id}`,'_blank')} className="blue">Edit this card</button>
        <button className="circlebutton green" onClick={logCorrect}>✓</button>
        <button className="circlebutton red" onClick={logWrong}>×</button>
      </div>
      }
      <div id="keyboard-info">
        <p><em><b>Psst!</b></em> Did you know that you can control this app with your keyboard?</p>
        <p>Press arrow up ↑ to reveal the answer or arrow right → to skip a card.<br/>
        To log your answer, press arrow up ↑ for right or arrow down ↓ for wrong.</p>
      </div>
    </>
  )
}
