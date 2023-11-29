import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import Card from "./Card"
import InputField from "./InputField"
import { baseURL } from "../helpers/constants"
import { sessionContext, userContext } from "../App"

function CardPair ({props, revealAnswer, handleEntry}) {
  const { question, answer } = props

  return(
    <div className="twoColumns">
        <Card text={question || ""} />
        {revealAnswer && <Card text={revealAnswer ? answer : ""} />}
        {!revealAnswer && <InputField handleEntry={handleEntry}/>}
    </div>
  )
}

function CardStats ({props}) {
  const { repetitions, stage } = props
  const { cardId } = useParams()
  const totalrepetitions = repetitions.correct + repetitions.wrong
  return (
    <>
    <h3>Card {cardId}</h3>
    <div className="buttoncontainer">
        <label>Correct</label>
        <p className="circlebutton">{repetitions.correct}</p>
        <p className="circlebutton">{totalrepetitions ? repetitions.correct / totalrepetitions + "%" : "0%"}</p>
        <label>Total</label>
        <p className="circlebutton">{totalrepetitions}</p>
        <label>Level</label>
        <p className="circlebutton">{stage}</p>
    </div>
    </>
  )
}

export default function Practice () {

  const { user, setUser } = useContext(userContext)
  const { setSessionStats } = useContext(sessionContext)
  const {categoryId, cardId} = useParams()
  const navigate = useNavigate()
  const [entries, setEntries] = useState(null)
  const [category, setCategory] = useState(null)
  const [currentCard, setCurrentCard] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userEntry, setUserEntry] = useState("")
  const [evaluation, setEvaluation] = useState(null)

  const getCategory = () => {
    const endpoint = "/categories/" + categoryId

    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setCategory(data))
      .catch(error => console.log("error getting entries", error))
  }

  useEffect(getCategory, [])

  const getEntries = () => {
    const endpoint = "/entries"

    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => {
        const entriesFromCategory = data.filter(entry => entry.categoryId === Number(categoryId))
        setCurrentCardIndex(0)
        setEntries(entriesFromCategory)
        navigate("/practice/"+ categoryId + "/" + entriesFromCategory[0].id)
        setCurrentCard(entriesFromCategory[0])
      })
      .catch(error => console.log("error getting entries", error))
  }

  useEffect(getEntries, [])
  
  const getCurrentCard = () => {if (entries && currentCardIndex) {
    setCurrentCard(entries[cardId])
  }
}
  useEffect(getCurrentCard, [currentCardIndex])

  const handleEntry = (event) => setUserEntry(event.target.value) 

  const handleSubmit = () => {
    currentCard.answer.match(userEntry) ? setEvaluation(true) : setEvaluation(false)
    setShowAnswer(true)
  }

  const logCorrect = () => {
    if (user) {
      updateUserStats("correct")
    } else {
      increaseSessionStats("correct")
    }
    next()
  }
  
  const logWrong = () => {
    if (user) {
      updateUserStats("wrong")
    } else {
      increaseSessionStats("wrong")
    }
    next()
  }

  const increaseSessionStats = (keyName) => {
    const sessionStatsOld = JSON.parse(sessionStorage.getItem("sessionStats"))
    const sessionStatsNew = {...sessionStatsOld, [keyName]: sessionStatsOld[keyName]+1} 
    sessionStorage.setItem("sessionStats", JSON.stringify(sessionStatsNew))
    setSessionStats(sessionStatsNew)
  }

  const updateUserStats = (type) => {
    console.log(!!user, "inside updateUserStats")
    if (!type || !user) return
    const endpoint = "/users/" + user.id
      const headers = {
        "content-type": "application/json"
      }

      const body = {
        statistics: {...user.statistics, [type]: user.statistics[type] + 1}
      }
      console.log(body)

      const options = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body)
      }

      fetch(baseURL + endpoint, options)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.log(error, "error updating user"))
  }

  const next = () => {
    if (currentCardIndex + 1 < entries.length) {
      const nextCard = entries[Number(currentCardIndex + 1)]
      navigate("/practice/"+ categoryId + "/" + nextCard.id)
      setCurrentCardIndex(currentCardIndex+1)
    } else {
      navigate("/")
    }
  }

  useEffect(getCurrentCard, [currentCardIndex])

  if (!category) return

  if (!entries) {
    return (
      <>
        <h3>Whoops! There are no entries for {category.title}</h3>
        <button onClick={() => navigate("/new-entry")}>➕ Add Entry</button>
      </>
    )
  }

  if (!currentCard) return <p>Loading current card…</p>

  return (
    <>
      <CardStats props={currentCard} />
      <CardPair props={currentCard} revealAnswer={showAnswer} handleEntry={handleEntry}/>
      {evaluation === null &&
        <div className="buttoncontainer">
          <button onClick={() => handleSubmit()}>Enter</button>
          <button className="red" onClick={() => next()}>Next →</button>
        </div>
      }
      {evaluation !== null &&
      <div className="buttoncontainer">
        <button className="circlebutton green" onClick={() => logCorrect()}>✓</button>
        <button className="circlebutton red" onClick={() => logWrong()}>×</button>
      </div>
      }
    </>
  )
}