import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { mockData } from "../api/mockData"
import Card from "./VocabCard"

function CardPair ({props}) {
  const { question, answer } = props
  return(
    <div className="twoColumns">
      <Card text={question || "unknown"} />
      <Card text={answer || "unknown"} />
    </div>
  )
}

export default function Practice () {

  const {id} = useParams()
  const [entries, setEntries] = useState(null)
  const [currentCard, setCurrentCard] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(null)

  const getEntries = () => {
    setEntries(mockData.categories[id].entries)
    setCurrentCardIndex(0)
  }

  const getCurrentCard = () => {if (entries) {
      setCurrentCard(entries[currentCardIndex])
    }
  }

  useEffect(getEntries, [])
  useEffect(getCurrentCard, [currentCardIndex])

  if (!entries) return <p>Loading…</p>

  if (!currentCard) return <p>Loading current card…</p>
  console.log(currentCard)
  return (
    <CardPair props={currentCard} />
  )
}