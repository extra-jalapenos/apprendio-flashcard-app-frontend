import { useEffect, useState } from "react"
import { baseURL, headers, maxStage } from "../../helpers/constants"

const analyze = (entries) => {
  const result = {
    total: entries.length
  }

  const filterForStage = (stage) => entries.filter(entry => entry.stage === stage)

  for (let i = 0; i <= maxStage; i++) {
    const entriesAtStage = filterForStage(i)
    result[String(i)] = entriesAtStage
  }
  return result
}

const renderResult = (resultObj) => {
  return (
    <div className="list">
      <h2>{resultObj.total} {resultObj.total === 1 ? "entry" : "entries"}</h2>
      {Object.keys(resultObj).map((name, index) => {
      return (<div key={index} className="listentry threeColumns">
        <p><b>Stage {name}</b></p>
        <p>{resultObj[name].length || Number(resultObj[name])}{resultObj[name].length === 1 ? " entry": " entries"}</p>
        <p>{((resultObj[name].length || resultObj[name]) / resultObj.total * 100).toFixed(1) + "%"}</p>
        </div>
      )})}
      </div>
    )
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

  const analyzedArr = analyze(entries)

  return (
    <main className="center">
      {renderResult(analyzedArr)}
    </main>
  )
}