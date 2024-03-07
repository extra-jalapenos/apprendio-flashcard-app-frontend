import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import CardPair from "./CardPair"
import CardStats from "./CardStatistics"
import { makeHeaders } from "../../helpers/functions"
import { practiceContext, sessionContext, userContext } from "../../App"

export default function Practice ({card}) {

  // const { user, setUser } = useContext(userContext)
  const { cards, setCards, currentIndex, setCurrentIndex } = useContext(practiceContext)
  const { setSessionStats } = useContext(sessionContext)
  const navigate = useNavigate()

  const { prompt, answer, hint, repetitions, level, maxLevel } = card
  const [showAnswer, setShowAnswer] = useState(false)
  const [userEntry, setUserEntry] = useState("")
  const [evaluation, setEvaluation] = useState(null)

  const handleEntry = (event) => setUserEntry(event.target.value)

  const handleSubmit = () => {
    answer.match(userEntry) ? setEvaluation(true) : setEvaluation(false)
    setShowAnswer(true)
  }

  const logCorrect = () => {
    increaseCardStats("correct")

    // if (user) {
    //   updateUserStats("correct")
    // } else {
    //   increaseSessionStats("correct")
    // }

    // setUserEntry("")
    next()
  }

  const logWrong = () => {
    increaseCardStats("wrong")

    // if (user) {
    //   updateUserStats("wrong")
    // } else {
    //   increaseSessionStats("wrong")
    // }
    // setUserEntry("")
    next()
  }

  const increaseCardStats = async (keyName) => {
    const body = {
      repetitions: repetitions + 1
    }

    if (level < maxLevel && keyName === "correct") {
      body.level = level + 1
    }

    if (keyName === "correct") {
      body.lastAskedAt = new Date().toISOString()
    }

    const options = {
      method: "PUT",
      headers: makeHeaders(),
      body: JSON.stringify(body)
    }

    console.log(options)
    try {
      const response = await fetch(`/api/cards/${card.id}`, options)
      if (response.status === 200) {
        const data = await response.json()
        const card = data.card
        console.log("success modifying card", card)
      }
    } catch (error) {
        console.log("error modifying card", card.id)
    }
  }

  // const increaseSessionStats = (keyName) => {
  //   const sessionStatsOld = JSON.parse(sessionStorage.getItem("sessionStats"))
  //   const sessionStatsNew = {...sessionStatsOld, [keyName]: sessionStatsOld[keyName]+1}
  //   sessionStorage.setItem("sessionStats", JSON.stringify(sessionStatsNew))
  //   setSessionStats(sessionStatsNew)
  // }

  // const updateUserStats = (type) => {
  //   if (!type || !user) return
  //   const endpoint = "/users/" + user.id

  //     const body = {
  //       statistics: {...user.statistics, [type]: user.statistics[type] + 1}
  //     }

  //     const options = {
  //       method: "PATCH",
  //       headers: headers,
  //       body: JSON.stringify(body)
  //     }

  //     fetch(baseURL + endpoint, options)
  //       .then(response => response.json())
  //       .then(data => setUser(data))
  //       .catch(error => console.log(error, "error updating user"))
  // }

  const next = () => {
    if (currentIndex < cards.length) {
      setShowAnswer(false)
      setEvaluation(null)
      setCurrentIndex(currentIndex+1)
    } else {
      navigate("/")
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
    </>
  )
}
