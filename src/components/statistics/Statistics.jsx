import { useEffect, useState } from "react";
import Loading from "../loadingScreen/Loading"
import { api } from "../../api/api";

function Entry ({statisticObj}) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }
  const date = new Date(statisticObj.date).toLocaleDateString(undefined, options)
  const { correct, incorrect } = statisticObj
  const total = Number(correct) + Number(incorrect)
  if (total <= 0) {
    return (
      <div className="list-entry">
        <p>{date}</p>
      </div>
    )
  }

  return (
    <div className="list-entry">
      <p>{date}</p>
      <p id="total">{total}</p>
      {/* <p id="total" className="circlebutton blue">{total}</p> */}
      <div className="autoColumns twoColumns">
        {/* <span id="correct" className="circlebutton green" style={{opacity: total ? correct / total : 0}} /> */}
        <span id="absolute" >{correct}</span>
        <span id="percent" >{(correct / total * 100).toFixed(0)+"%"}</span>
      </div>
      <div className="autoColumns twoColumns">
        {/* <span className="circlebutton red" style={{opacity: total ? incorrect / total : 0}} /> */}
        <span id="absolute">{incorrect}</span>
        <span id="percent">{(incorrect / total * 100).toFixed(0)+"%"}</span>
      </div>
    </div>
  )
}

export default function Statistics () {
  const [history, setHistory] = useState(null)

  const getData = async () => {
    const response = await api.getStatistics()
    if (response.message) return
    setHistory(response.statistics)
  }
  useEffect(getData, [])

  if (!history) return <Loading message={"Loading statistics…"}/>

  return (
    <div className="list">
    <div className="list-header">
      <p>Date</p>
      <p id="total">Total</p>
      <p>Correct</p>
      <p>Incorrect</p>
    </div>
      {history.map((entry, index) => <Entry key={index} statisticObj={entry} />)}
    </div>
  )
}
