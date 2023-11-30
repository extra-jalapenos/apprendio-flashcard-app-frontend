import { useParams } from "react-router"
import { maxStage } from "../../helpers/constants"

export default function CardStats ({props}) {
  const { repetitions, stage } = props
  const { cardId } = useParams()
  if (!cardId) return
  const totalrepetitions = repetitions.correct + repetitions.wrong
  return (
    <>
    <h3>Card {cardId}</h3>
    <div className="buttoncontainer">
        <p className="circlebutton">{totalrepetitions ? (repetitions.correct / totalrepetitions * 100).toFixed(0) : "0"}%</p>
        <label>Total</label>
        <p className="circlebutton">{totalrepetitions}</p>
        <label>Level</label>
        <p className={stage >= maxStage ? "circlebutton green" : "circlebutton"}>{stage}</p>
    </div>
    </>
  )
}