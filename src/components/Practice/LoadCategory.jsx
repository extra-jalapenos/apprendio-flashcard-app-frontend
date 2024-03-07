import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import { shuffle } from "../../helpers/constants"
import { getCategory, getCards } from "../../helpers/functions"
import { readyForPractice } from "../../helpers/functions"
import { sessionContext, practiceContext } from "../../App"
import Practice from "./Practice"

export default function LoadPractice () {

  // const { user, setUser } = useContext(userContext)
  const { setSessionStats } = useContext(sessionContext)
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const { cards, setCards } = useContext(practiceContext)
  const [category, setCategory] = useState(null)

  const initCategory = () => {
    const run = async () => {
      const category = await getCategory(categoryId)
      if (category) {
        setCategory(category)
      }
    }
    run()
  }

  useEffect(initCategory, [categoryId])

  const initCards = () => {
    const run = async () => {
      const cards = await getCards(categoryId)
      if (cards) {
        const filteredCards = cards.filter((card) => readyForPractice(card))
        const shuffledCards = shuffle(filteredCards)
        setCards(shuffledCards)
      }
    }
    run()
  }

  useEffect(initCards, [category])

  if (!category) {
    return (
      <div className="center">
        <h3>Loading category…</h3>
        <p>This might take some time.</p>
      </div>
    )
  }

  if (!cards) {
    return (
      <div className="center">
        <h3>Loading cards in {category.name}…</h3>
        <p>This might take some time.</p>
      </div>
    )
  }

  if (cards && cards.length === 0) {
    return (
      <div className="center">
        <h3>Whoops!</h3>
        <p>There are no cards to practice for &quot;{category.name}&quot;.</p>
        <button onClick={() => navigate("/new-entry")}>➕ Add Entry</button>
      </div>
    )
  }

  console.log("found", cards.length)
  return <Practice card={cards[cards.length-1]} />
}
