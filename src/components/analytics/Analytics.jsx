import { useEffect, useState } from "react"
import { maxLevel } from "../../helpers/constants"
import { makeHeaders } from "../../helpers/auth"
import Loading from "../loadingScreen/Loading"
import "../../list.css"
import "./style.css"

const renderResult = (resultObj) => {
  const total = Object.values(resultObj).reduce((accumulator, currentValue) => accumulator + currentValue.length, 0)
  const averageLevel = () => {
    let productSum = 0
    const keys = Object.keys(resultObj)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (typeof Number(key) == "number") {
        productSum += Number(key) * resultObj[key].length
      }
    }
    return productSum / total
  }

  return (
    <div className="list" id="analytics">
      <div className="list-header threeColumns">
        <p>Level</p>
        <p>Cards</p>
        <p>Percent</p>
      </div>
      {Object.keys(resultObj).map((name, index) => {
      return (<div key={index} className="list-entry threeColumns">
        <p><b>Level {name}</b></p>
        <p>{resultObj[name].length || Number(resultObj[name])}</p>
        <p>{((resultObj[name].length || resultObj[name]) / total * 100).toFixed(0) + "%"}</p>
        </div>
      )})}
      <div className="list-header twoColumns">
        <p>Total: {Math.abs(total) != 1 ? total + " cards" : total + " card"}</p>
        <p>Average Level: {averageLevel().toFixed(0)}</p>
      </div>
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
        }
      } catch (error) {
        console.log(error, "something went wrong during request")
      }
    }
    get()
  }

  useEffect(getData, [])

  const analyze = () => {
    const result = {}
    const filterForLevel = (level) => cards.filter(card => card.level === level)

    for (let i = 0; i <= maxLevel; i++) {
      const cardsOnLevel = filterForLevel(i)
      result[String(i)] = cardsOnLevel
    }
    return result
  }

  if (!cards) return <Loading message={"Loading cards…"}/>

  if (cards.length === null) return (
    <div className="center">
      You haven&apos;t created any cards yet.
    </div>
  )

  const analyzedArr = analyze()

  return (
    <>
      {renderResult(analyzedArr)}
    </>
  )
}
