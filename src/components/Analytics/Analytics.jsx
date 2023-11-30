import { useEffect, useState } from "react"
import { baseURL, headers, maxStage } from "../../helpers/constants"

const analyze = (entries) => {
  const result = {
    total: entries.length
  }

  const filterForStage = (categoryId) => entries.filter(entry => entry.categoryId === categoryId).length

  for (let i = 0; i++; i <= maxStage) {
    result[String(i)] = filterForStage(i)
  }

  return result
} 

export default function Analytics () {
  const [categories, setCategories] = useState(null)

  const getCategories = () => {
    const endpoint = "/categories"
  
    const options = {
      headers: headers
    }
  
    fetch(baseURL + endpoint, options)
      .then(response => response.json())
      .then(data => setCategories(data))
  }

  useEffect(getCategories, [])

  const [entries, setEntries] = useState(null)

  const getEntries = () => {
    const endpoint = "/entries"
  
    const options = {
      headers: headers
    }
  
    fetch(baseURL + endpoint, options)
      .then(response => response.json())
      .then(data => setEntries(data))
  }

  useEffect(getEntries, [])

  if (!categories) return (<div className="center">
    Loading categories…
  </div>)

  if (!entries) return (<div className="center">
    Loading entries
  </div>)

  return (
    <main className="center">
      
    </main>
  )
}