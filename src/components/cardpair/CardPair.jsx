import Card from "../card/Card"
import InputField from "../InputField"

export default function CardPair ({props, revealAnswer, handleEntry}) {
  const { prompt, answer, hint } = props
  return(
    <div className="list twoColumns">
        <Card text={prompt || ""} />
        {revealAnswer && <Card text={revealAnswer ? answer : "" } />}
        {!revealAnswer && <InputField placeholder={hint} handleEntry={handleEntry}/>}
    </div>
  )
}
