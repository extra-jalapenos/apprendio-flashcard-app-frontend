import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import Card from "./Card"
import InputField from "./InputField"
import { baseURL } from "../helpers/helpers"
import { sessionContext } from "../App"

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
  return (
    <>
    <h3>Card {cardId}</h3>
    <div className="buttoncontainer">
        <label>Correct</label>
        <p className="circlebutton">{repetitions.correct}</p>
        <p className="circlebutton">{repetitions.total ? repetitions.correct / repetitions.total + "%" : "0%"}</p>
        <label>Total</label>
        <p className="circlebutton">{repetitions.total}</p>
        <label>Level</label>
        <p className="circlebutton">{stage}</p>
    </div>
    </>
  )
}

export default function Practice () {

  const { logCorrect, logWrong } = useContext(sessionContext)
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
    console.log("loaded card")
  }
}
  useEffect(getCurrentCard, [currentCardIndex])

  const handleEntry = (event) => setUserEntry(event.target.value) 

  const handleSubmit = () => {
    console.log(!!currentCard.answer.match(userEntry))
    currentCard.answer.match(userEntry) ? setEvaluation(true) : setEvaluation(false)
    setShowAnswer(true)
  }

  const reveal = () => setShowAnswer(showAnswer ? false : true)

  const next = () => {
    if (currentCardIndex + 1 < entries.length) {
      const nextCard = entries[Number(currentCardIndex + 1)]
      navigate("/practice/"+ categoryId + "/" + nextCard.id)
      setCurrentCardIndex(currentCardIndex+1)
    } else {
      navigate("/finish")
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
          <p className="circlebutton red" onClick={() => next()}>→</p>
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