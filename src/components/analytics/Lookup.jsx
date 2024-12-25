import { maxLevel } from "../../helpers/constants"
import { deleteEntry } from "../../helpers/functions"
import { makeHeaders } from "../../helpers/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Searchbar from "./Searchbar"
import "../../list.css"
import Loading from "../loadingScreen/Loading"

function ListPair ({card, getCards, searchText}) {
  const navigate = useNavigate()
  const {prompt, answer, level} = card

  const handleDelete = async () => {
    await deleteEntry(card.id)
    getCards()
  }

  const filteredFor = () => {
    if (!searchText) return true
    if (!!card.prompt.match(searchText) || !!card.answer.match(searchText)) return true
    return false
  }

  if (filteredFor() === false) return <></>

  return (
    <div className={`list-entry reviewEntry`}>
      <p>{prompt}</p>
      <p>{answer}</p>
      <div className="buttoncontainer">
        <p className={level >= maxLevel ? "circlebutton green" : "circlebutton"}>{level}</p>
        <button className="circlebutton edit" onClick={()=>navigate(`/edit/${card.id}`,'_blank')}>✎</button>
        <p className="circlebutton delete red" onClick={handleDelete}>␡</p>
      </div>
    </div>
  )
}

function CategorySection ({name, cards, getCards, searchText}) {
  const navigate = useNavigate()

  if (!cards.length) return (
    <section>
      <h2>{name}</h2>
      <div className="list">
        <div className="list-entry reviewEntry">
          <p>No entries yet</p>
          <p>… do you want to create some?</p>
          <button onClick={() => navigate("/new-entry")}>+ Add</button>
        </div>
      </div>
    </section>
  )

  const donePercent = Number((cards.filter(card => card.level >= maxLevel).length) / cards.length * 100).toFixed(0)

  return (
    <section>
      <h2>{name} – {cards.length} {cards.length === 1 ? "card" : "cards"} – {donePercent}% done</h2>
      <div className="list">
        {cards && cards.map((card, index) => <ListPair key={index} card={card} getCards={getCards} searchText={searchText}/>)}
      </div>
    </section>
  )
}

export default function Lookup() {

  const [data, setData] = useState(null)
  const [searchText, setSearchText] = useState("")

  const getCards = () => {
    const get = async () => {
      try {
        const options = {
          headers: makeHeaders()
        }
        const response = await fetch("/api/users/me/categories/details", options)
        // this is not a mistake, the cards are included in their category-element: categories: [ ... cards: [] ]
        if (response.status === 200) {
          const data = await response.json()
          setData(data.categories)
        }
      } catch (error) {
        console.log(error, "error fetching cards")
      }
    }
    get()
  }
  useEffect(getCards, [])

  const handleInput = (event) => setSearchText(event.target.value)

  if (!data) return <Loading message={"Loading cards…"} />

  return (
    <>
    <section>
      <Searchbar handleInput={handleInput}/>
    </section>
    {data.map((category, index) => <CategorySection key={index}
        name={category.name}
        cards={category.cards}
        getCards={getCards}
        searchText={searchText}
      />)}
    </>
  )
}
