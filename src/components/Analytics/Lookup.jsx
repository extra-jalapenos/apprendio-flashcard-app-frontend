import { baseURL, headers } from "../../helpers/constants"
import { useEffect, useState } from "react"

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
  return (
    <section>
      <h2>{title}</h2>
      <div className="list">
        {!entries.length && <>NO ENTRIES</>}
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