import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import { shuffle } from "../../helpers/constants"
import { getCategory, getCards } from "../../helpers/functions"
import { readyForPractice } from "../../helpers/functions"
import { practiceContext } from "../../context"
import Practice from "./Practice"
import Loading from "../loadingScreen/Loading"

export default function LoadPractice () {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const { cards, setCards } = useContext(practiceContext)
  let { currentIndex } = useContext(practiceContext)
  const [ category, setCategory ] = useState(null)
  const [ card, setCard ] = useState(null)

  const init = () => {
    const run = async () => {
      const category = await getCategory(categoryId)
      if (category) {
        setCategory(category)
        const cards = await getCards(categoryId)
        if (cards) {
          const filteredCards = cards.filter((card) => readyForPractice(card))
          const shuffledCards = shuffle(filteredCards)
          setCards(shuffledCards)
          currentIndex = 0
          setCard(shuffledCards[currentIndex])
        }
      }
    }
    run()
  }

  useEffect(init, [])

  if (!category) return <Loading message={"Loading category…"} />

  if (!cards) <Loading message={`Loading cards in ${category.name}…`} />

  if (cards && cards.length === 0) {
    return (
      <div className="center">
        <h3>Whoops!</h3>
        <p>There are no cards to practice for &quot;{category.name}&quot;.</p>
        <button onClick={() => navigate("/new-entry")}>➕ Add Entry</button>
      </div>
    )
  }

  const next = () => {
    if (cards.length > 0) {
      setCard(cards.pop())
      setCards(cards)
    } else {
      navigate("/")
    }
  }

  if (!card) <Loading message={"Loading card…"} />

  return (
    <>
      <h2 className="center">{category.name}</h2>
      <Practice card={card} setCard={setCard} next={next} />
    </>
  )
}
