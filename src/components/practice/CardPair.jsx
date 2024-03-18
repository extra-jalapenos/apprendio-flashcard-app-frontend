import Card from "./Card"
import InputField from "../InputField"

export default function CardPair ({props, revealAnswer, handleEntry}) {
  const { prompt, answer, hint } = props
  return(
    <div className="twoColumns">
        <Card text={prompt || ""} />
        {revealAnswer && <Card text={revealAnswer} />}
        {!revealAnswer && <InputField placeholder={hint} handleEntry={handleEntry}/>}
    </div>
  )
}
