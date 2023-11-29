import { useParams } from "react-router"

export default function CardStats ({props}) {
  const { repetitions, stage } = props
  const { cardId } = useParams()
  if (!cardId) return
  const totalrepetitions = repetitions.correct + repetitions.wrong
  return (
    <>
    <h3>Card {cardId}</h3>
    <div className="buttoncontainer">
        <label>Correct</label>
        <p className="circlebutton">{repetitions.correct}</p>
        <p className="circlebutton">{totalrepetitions ? repetitions.correct / totalrepetitions + "%" : "0%"}</p>
        <label>Total</label>
        <p className="circlebutton">{totalrepetitions}</p>
        <label>Level</label>
        <p className="circlebutton">{stage}</p>
    </div>
    </>
  )
}