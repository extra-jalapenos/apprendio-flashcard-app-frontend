import { useEffect, useState } from "react"
import Loading from "../loadingScreen/Loading"
import { getCard, updateCard } from "../../helpers/functions"
import { useParams } from "react-router-dom"

export default function EditCard () {
  const [card, setCard] = useState(null)
  const [form, setForm] = useState(null)
  const [saveButtonText, setSaveButtonText] = useState("save")

  const switchAnswerAndPrompt = () => {
    const { answer, prompt } = form
    setForm({
      ...form,
      answer: prompt,
      prompt: answer
    })
  }

  const handleInput = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]:value })
    setSaveButtonText("Save")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaveButtonText("Saving…")
    await updateCard(id, form)
    setSaveButtonText("Saved")
  }

  const { id } = useParams()

  const init = () => {
    const get = async () => {
      const data = await getCard(id)
      if (data) {
        setCard(data)
        setForm(data)
      }
    }
    get()
  }

  useEffect(init, [id])

  if (!card) return (<Loading message={`Loading card ${id}`}/>)

  return(
    <>
      <h3>Edit Card {id}</h3>
      <form className="container" onSubmit={handleSubmit}>
        <label>Prompt</label>
        <textarea type="text" name="prompt" value={form.prompt} onChange={handleInput} required />

        <label>Answer</label>
        <textarea type="text" name="answer" value={form.answer} onChange={handleInput}  required />

        <label>Hint or context</label>
        <textarea type="text" name="hint" value={form.hint} onChange={handleInput} />
        <div>
        </div>
        <div className="buttoncontainer">
          <button className="blue" onClick={switchAnswerAndPrompt}>Switch answer and prompt</button>
          {!!form.categoryId && form.answer && form.prompt && <button value="Submit" className="green">{saveButtonText}</button>}
        </div>
      </form>
    </>
  )
}
