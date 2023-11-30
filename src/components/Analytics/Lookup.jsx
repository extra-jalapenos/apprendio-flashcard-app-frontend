import { baseURL, headers } from "../../helpers/constants"
import { useEffect, useState } from "react"
import CreateEntry from "../CreateEntry"
import { useNavigate } from "react-router"

function ListPair ({card}) {
  const {prompt, answer} = card
  return (
    <p className="listentry twoColumns">
      <p>{prompt}</p>
      <p>{answer}</p>
    </p>
  )
}

function CategorySection ({title, entries}) {
  const navigate = useNavigate()
  
  if (!entries.length) return (
    <section>
      <h2>{title}</h2>
      <div className="list">
        <p className="listentry twoColumns">
          <p>No entries yet – do you want to create one?</p>
          <button onClick={() => navigate("/new-entry")}>➕ Add Entry</button>
        </p>
      </div>
    </section>
  )

  return (
    <section>
      <h2>{title} – {entries.length} {entries.length === 1 ? "entry" : "entries"}</h2>
      <div className="list">
        {entries && entries.map((entry, index) => <ListPair key={index} card={entry}/>)}
      </div>
    </section>
  )
}

export default function Lookup() {
  const [categories, setCategories] = useState(null)
  const getCategories = () => {
    const endpoint = "/categories"

    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log("error getting categories", error))
  }
  useEffect(getCategories, [])

  const [entries, setEntries] = useState(null)
  const getEntries = () => {
    const endpoint = "/entries"

    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setEntries(data))
      .catch(error => console.log("error getting entries", error))
  }
  useEffect(getEntries, [])

  const entriesFromCategory = (categoryId) => entries.filter(entry => entry.categoryId === categoryId)

  if (!categories) return <div className="center">Loading categories</div>
  if (!entries) return <div className="center">Loading entries</div>

  return (
    <>
    {categories.map((category, index) => <CategorySection key={index} title={category.title} entries={entriesFromCategory(category.id)} />)}
    </>
  )
}