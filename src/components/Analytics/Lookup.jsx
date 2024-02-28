import { baseURL, headers, maxLevel } from "../../helpers/constants"
import { deleteEntry } from "../../helpers/functions"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Searchbar from "./Searchbar"

function ListPair ({card, getEntries}) {
  const {prompt, answer, level} = card

  const handleDelete = () => {
    deleteEntry(card.id)
    getEntries()
  }

  return (
    <div className="listentry reviewEntry">
      <p>{prompt}</p>
      <p>{answer}</p>
      <div className="buttoncontainer">
        <p className={level >= maxLevel ? "circlebutton green" : "circlebutton"}>{level}</p>
        <p className="circlebutton delete red" onClick={handleDelete}>🗑️</p>
      </div>
    </div>
  )
}

function CategorySection ({title, entries, getEntries}) {
  const navigate = useNavigate()

  if (!entries.length) return (
    <section>
      <h2>{title}</h2>
      <div className="list">
        <div className="listentry reviewEntry">
          <p>No entries yet</p>
          <p>… do you want to create one?</p>
          <button onClick={() => navigate("/new-entry")}>➕ Add</button>
        </div>
      </div>
    </section>
  )

  const donePercent = Number((entries.filter(entry => entry.level >= maxLevel).length) / entries.length * 100).toFixed(0)

  return (
    <section>
      <h2>{title} – {entries.length} {entries.length === 1 ? "entry" : "entries"} – {donePercent}% done</h2>
      <div className="list">
        {entries && entries.map((entry, index) => <ListPair key={index} card={entry} getEntries={getEntries}/>)}
      </div>
    </section>
  )
}

export default function Lookup() {

  const [categories, setCategories] = useState(null)
  const [entries, setEntries] = useState(null)
  const [filteredEntries, setFilteredEntries] = useState(null)
  const [searchText, setSearchText] = useState("")

  const getCategories = () => {
    const endpoint = "/categories"

    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log("error getting categories", error))
  }
  useEffect(getCategories, [])

  const getEntries = () => {
    const endpoint = "/entries"
    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setEntries(data))
      .catch(error => console.log("error getting entries", error))
  }
  useEffect(getEntries, [])

  const filterEntries = () => {
    if (!entries) return
    if (!searchText.length) return setFilteredEntries(entries)
    const filteredForText = entries.filter(entry => !!entry.prompt.match(searchText) || !!entry.answer.match(searchText))
    setFilteredEntries(filteredForText)
  }

  const handleInput = (event) => setSearchText(event.target.value)

  useEffect(filterEntries, [entries, searchText])

  if (!categories) return <div className="center">Loading categories</div>
  if (!entries) return <div className="center">Loading entries</div>
  if (!filteredEntries) return <div className="center">Filtering entries</div>

  return (
    <>
    <section>
      <Searchbar handleInput={handleInput}/>
    </section>
    {categories.map((category, index) => <CategorySection key={index}
    title={category.title}
    entries={filteredEntries.filter(entry => entry.categoryId === category.id)}
    getEntries={getEntries}/>)}
    </>
  )
}
