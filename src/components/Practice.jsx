import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { mockData } from "../api/mockData"
import Card from "./Card"

function CardPair ({props, revealAnswer}) {
  const { question, answer } = props
  return(
    <div className="twoColumns">
      <div>
        <h2>Question</h2>
        <Card text={question || ""} />
      </div>
      <div>
        <h2>Answer</h2>
        <Card text={revealAnswer ? answer : ""} />
      </div>
    </div>
  )
}

function CardStats ({props}) {
  const { repetitions, stage } = props

  return (
    <div className="buttoncontainer">
        <label>Correct</label>
        <circlebutton>{repetitions.correct}</circlebutton>
        <label>Correct</label>
        <circlebutton>{repetitions.total ? repetitions.correct / repetitions.total + "%" : "0%"}</circlebutton>
        <label>Total</label>
        <circlebutton>{repetitions.total}</circlebutton>
        <label>Level</label>
        <circlebutton>{stage}</circlebutton>
    </div>
  )

  return (
    <>
      <circlebutton className="green">
        {repetitions.correct}
      </circlebutton>
      <circlebutton className="blue">
        {repetitions.wrong}
      </circlebutton>
      <label>Test</label>
      <circlebutton className="red">
        {repetitions.total}
      </circlebutton>
      <circlebutton className="green">
        {repetitions.total ? repetitions.correct / repetitions.total + "%" : "0%"}
      </circlebutton>
      <circlebutton className="blue">
        <label>Level</label>{stage}
      </circlebutton>
      <circlebutton className="red">
        {repetitions.total ? repetitions.wrong / repetitions.total + "%" : "0%"}
      </circlebutton>
    </>
  )
}

export default function Practice () {

  const {categoryId, cardId} = useParams()
  const navigate = useNavigate()
  const [entries, setEntries] = useState(null)
  const [currentCard, setCurrentCard] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userEntry, setUserEntry] = useState(null)

  const getEntries = () => {
    setEntries(mockData.categories[categoryId].entries)
    setCurrentCardIndex(0)
    console.log("loaded entries", mockData.categories[categoryId].entries.length)
  }

  const getCurrentCard = () => {if (entries) {
      setCurrentCard(entries[cardId])
      console.log("loaded card")
    }
  }

  const handleEntry = (event) => setUserEntry(event.target.value) 

  const reveal = () => setShowAnswer(showAnswer ? false : true)

  const next = () => {
    if (currentCardIndex + 1 < entries.length) {
      navigate("/practice/"+ categoryId + "/" + Number(currentCardIndex + 1))
      setCurrentCardIndex(currentCardIndex+1)
    } else {
      navigate("/finish")
    }
  }

  useEffect(getEntries, [])
  useEffect(getCurrentCard, [currentCardIndex])

  if (entries === null || entries.length === 0) {
    return (
      <>
        <h3>Whoops! There's no entries for {mockData.categories[categoryId].title}</h3>
        <button>➕ Add Entry</button>
      </>
    )
  }

  if (!currentCard) return <p>Loading current card…</p>

  console.log(currentCard)
  return (
    <>
      <CardStats props={currentCard} />
      <CardPair props={currentCard} revealAnswer={showAnswer} />
      <div className="buttoncontainer">
        <circlebutton className="green">✓</circlebutton>
        <circlebutton className="blue" onClick={reveal}>?</circlebutton>
        <circlebutton className="red" onClick={() => next()}>→</circlebutton>
      </div>
    </>
  )
}