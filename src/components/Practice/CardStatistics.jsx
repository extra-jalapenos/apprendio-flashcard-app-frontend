import { maxLevel } from "../../helpers/constants"

export default function CardStats ({card}) {
  const { repetitions, level, lastAskedAt, id } = card
  if (!id) return
  return (
    <>
      <h3>Card {id}</h3>
      <div className="buttoncontainer">
          {lastAskedAt && <label>Last known at {new Date(lastAskedAt).toLocaleString()}</label>}
          <p className="circlebutton">{repetitions ? (level / repetitions * 100).toFixed(0) : "0"}%</p>
          <label>Total</label>
          <p className="circlebutton">{repetitions}</p>
          <label>Level</label>
          <p className={level >= maxLevel ? "circlebutton green" : "circlebutton"}>{level}</p>
      </div>
    </>
  )
}
