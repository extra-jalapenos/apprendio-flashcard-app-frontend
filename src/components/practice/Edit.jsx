import { useEffect, useState } from "react"
import Loading from "../loadingScreen/Loading"
import { useParams } from "react-router-dom"
import { api } from "../../api/api"

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

  const { id } = useParams()
  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaveButtonText("Saving…")
    await api.updateCard({ cardId: id,  ...form })
    setSaveButtonText("Saved")
  }


  const init = () => {
    const get = async () => {
      const card = await api.getCard(id)
      if (card.message) return
      setCard(card.card)
      setForm(card.card)
    }
    get()
  }

  useEffect(init, [])

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
