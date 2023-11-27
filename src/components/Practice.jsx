import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { mockData } from "../api/mockData"
import Card from "./VocabCard"

function CardPair ({props, revealAnswer}) {
  const { question, answer } = props
  return(
    <div className="twoColumns">
      <h2>Question</h2>
      <h2>Answer</h2>
      <Card text={question || ""} />
      <Card text={revealAnswer ? answer : ""} />
    </div>
  )
}

function Buttons () {
  return (
    <>
      <button className="confirm"/>
      <button className="reveal"/>
    </>
  )
}

function CardStats ({props}) {
  const { repetitions, stage } = props

  return (
    <>
      <div>
        <button className="confirm">
          {repetitions.correct}
        </button>
        <button className="skip">
          {repetitions.wrong}
        </button>
        <button className="reveal">
          {repetitions.total}
        </button>
      </div>
      <div>
      <button className="confirm">
        {repetitions.total ? repetitions.correct / repetitions.total + "%" : "0%"}
      </button>
      <p>Level: <b>{stage}</b></p>
      <button className="skip">
        {repetitions.total ? repetitions.wrong / repetitions.total + "%" : "0%"}
      </button>
    </div>
    </>
  )
}

export default function Practice () {

  const {categoryId, cardId} = useParams()
  const navigate = useNavigate()
  const [entries, setEntries] = useState(null)
  const [currentCard, setCurrentCard] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(Number(cardId))
  const [showAnswer, setShowAnswer] = useState(false)
  const [userEntry, setUserEntry] = useState(null)

  const getEntries = () => {
    setEntries(mockData.categories[categoryId].entries)
    setCurrentCardIndex(0)
    console.log("loaded entries", mockData.categories[categoryId].entries.length)
  }

  const getCurrentCard = () => {if (entries) {
      setCurrentCard(entries[currentCardIndex])
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

  if (!entries) return <p>Loading…</p>
  if (!currentCard) return <p>Loading current card…</p>

  console.log(currentCard)
  return (
    <body>
      <CardPair props={currentCard} revealAnswer={showAnswer} />
      <button className="confirm">✓</button>
      <button className="reveal" onClick={reveal}>?</button>
      <button className="skip" onClick={() => next()}>→</button>
      <CardStats props={currentCard} />
    </body>
  )
}