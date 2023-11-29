import Card from "./Card"
import InputField from "../InputField"

export default function CardPair ({props, revealAnswer, handleEntry}) {
  const { prompt, answer, clue } = props
  console.log(clue)
  return(
    <div className="twoColumns">
        <Card text={prompt || ""} />
        {revealAnswer && <Card text={revealAnswer ? answer : ""} />}
        {!revealAnswer && <InputField placeholder={clue} handleEntry={handleEntry}/>}
    </div>
  )
}