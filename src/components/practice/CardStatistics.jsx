import { useNavigate } from "react-router-dom"
import { maxLevel } from "../../helpers/constants"
import "./style.css"

export default function CardStats ({card}) {
  const { repetitions, level, lastAskedAt, id } = card
  const navigate = useNavigate()
  if (!id) return
  return (
    <>
      <h3>Card {id}<button onClick={()=>window.open(`/edit/${id}`,'_blank')}>edit</button></h3>
      <div>
        <div className="buttoncontainer">
          {lastAskedAt && <label id="lastKnown">Last known: {new Date(lastAskedAt).toLocaleDateString()}</label>}
          <button id="percent">{repetitions ? (level / repetitions * 100).toFixed(0) : "0"}%</button>
          <label>Repetitions</label>
          <p className="circlebutton">{repetitions}</p>
          <label>Level</label>
          <p className={level >= maxLevel ? "circlebutton green" : "circlebutton"}>{level}</p>
        </div>
      </div>
    </>
  )
}
