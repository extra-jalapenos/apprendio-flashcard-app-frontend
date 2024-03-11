import { useEffect, useState } from "react"
import { maxLevel } from "../../helpers/constants"
import { makeHeaders } from "../../helpers/functions"

const renderResult = (resultObj) => {
  return (
    <div className="list">
      {Object.keys(resultObj).map((name, index) => {
      return (<div key={index} className="listentry threeColumns">
        <p><b>Level {name}</b></p>
        <p>{resultObj[name].length || Number(resultObj[name])}{resultObj[name].length === 1 ? " card": " cards"}</p>
        <p>{((resultObj[name].length || resultObj[name]) / resultObj.total * 100).toFixed(1) + "%"}</p>
        </div>
      )})}
      </div>
    )
}

export default function Analytics () {
  const [cards, setCards] = useState()

  const getData = () => {
    const get = async () => {
      try {
        const options = {
          headers: makeHeaders()
        }
        const response = await fetch("/api/users/me/cards", options)
        if (response.status === 200) {
          const data = await response.json()
          setCards(data.cards)
        } else {
          console.log("something went wrong")
        }
      } catch (error) {
        console.log(error, "during request")
      }
    }
    get()
  }

  useEffect(getData, [])

  const analyze = () => {
    const result = {
      total: cards.length
    }

    const filterForLevel = (level) => cards.filter(card => card.level === level)

    for (let i = 0; i <= maxLevel; i++) {
      const cardsOnLevel = filterForLevel(i)
      result[String(i)] = cardsOnLevel
    }
    return result
  }

  if (!cards) return (
    <div className="center">
      Loading cards…
    </div>
  )

  if (cards.length === null) return (
    <div className="center">
      You haven&apos;t created any cards yet.
    </div>
  )

  const analyzedArr = analyze()

  return (
    <main className="center">
      {renderResult(analyzedArr)}
    </main>
  )
}
