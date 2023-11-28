import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { mockData } from "../api/mockData"
import Card from "./Card"
import InputField from "./InputField"
import { baseURL } from "../helpers/helpers"

function CardPair ({props, revealAnswer, handleEntry}) {
  const { question, answer } = props

  return(
    <div className="twoColumns">
      <div>
        <h2>Question</h2>
        <Card text={question || ""} />
      </div>
      <div>
        <h2>Answer</h2>
        {revealAnswer && <Card text={revealAnswer ? answer : ""} />}
        {!revealAnswer && <InputField handleEntry={handleEntry}/>}
      </div>
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

  const {categoryId, cardId} = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [currentCard, setCurrentCard] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userEntry, setUserEntry] = useState("")

  const getEntries = () => {
    const endpoint = "/categories"

    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setCategory(data[categoryId]))
      .then(() => setCurrentCardIndex(0))
      .then(() => console.log("loaded entries", category))
      .catch(error => console.log("error getting entries", error))
  }

  const getCurrentCard = () => {if (category) {
      setCurrentCard(category.entries[cardId])
      console.log("loaded card")
    }
  }

  const handleEntry = (event) => setUserEntry(event.target.value) 

  const handleSubmit = () => {
    console.log(userEntry)
  }

  const reveal = () => setShowAnswer(showAnswer ? false : true)

  const next = () => {
    if (currentCardIndex + 1 < category.entries.length) {
      navigate("/practice/"+ categoryId + "/" + Number(currentCardIndex + 1))
      setCurrentCardIndex(currentCardIndex+1)
    } else {
      navigate("/finish")
    }
  }

  useEffect(getEntries, [])
  useEffect(getCurrentCard, [currentCardIndex])

  if (!category) return

  if (!!category.entries) {
    return (
      <>
        <h3>Whoops! There are no entries for {category.title}</h3>
        <button>➕ Add Entry</button>
      </>
    )
  }

  if (!currentCard) return <p>Loading current card…</p>

  return (
    <>
      <CardStats props={currentCard} />
      <CardPair props={currentCard} revealAnswer={showAnswer} handleEntry={handleEntry}/>
      <div className="buttoncontainer">
        <p className="circlebutton green" onClick={() => handleSubmit()}>✓</p>
        <p className="circlebutton blue" onClick={reveal}>?</p>
        <p className="circlebutton red" onClick={() => next()}>→</p>
      </div>
    </>
  )
}