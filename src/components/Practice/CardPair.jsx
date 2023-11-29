import Card from "./Card"
import InputField from "../InputField"

export default function CardPair ({props, revealAnswer, handleEntry}) {
  const { prompt, answer } = props

  return(
    <div className="twoColumns">
        <Card text={prompt || ""} />
        {revealAnswer && <Card text={revealAnswer ? answer : ""} />}
        {!revealAnswer && <InputField handleEntry={handleEntry}/>}
    </div>
  )
}