import { useEffect, useState } from "react"
import { entryBlueprint } from "../../helpers/constants.js"
import { useNavigate } from "react-router"
import Loading from "../loadingScreen/Loading.jsx"
import "./style.css"
import { api } from "../../api/api.js"

export default function CreateEntry() {
  const [categories, setCategories] = useState(null)
  const [createdCards, setCreatedCards] = useState(null)

  const navigate = useNavigate()

  const getCategories = () => {
    const get = async () => {
      try {
        const response = await api.getCategories()
        if (response instanceof Error) return
        setCategories(response.categories)
      } catch (error) {
        console.log(error, "error fetching categories")
      }
    }
    get()
  }

  useEffect(getCategories, [])

  const initForm = {
    categoryId: null,
    prompt: "",
    answer: "",
    hint: ""
  }

  const [form, setForm] = useState(initForm)
  const resetForm = () => setForm({...form, prompt: "", answer: "", hint: "" })

  const handleInput = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]:value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.categoryId) return

    try {
      const body = { ...entryBlueprint,
        ...form,
        categoryId: Number(form.categoryId),
        lastAskedAt: null
      }

      const response = await api.createCard(body)
      if (response instanceof Error) return
      setCreatedCards(createdCards + 1)
      resetForm()
    } catch (error) {
      console.log(error, "error creating entry")
    }

  }

  if (!categories) return <Loading />

  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <label>Category</label>
        <select name="categoryId" value={form.categoryId || "Select Category"} onChange={handleInput} required>
          {!form.categoryId && <option>Select Category</option>}
          {categories.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)}
        </select>

        <label>Prompt</label>
        <textarea type="text" name="prompt" value={form.prompt} onChange={handleInput} required />

        <label>Answer</label>
        <textarea type="text" name="answer" value={form.answer} onChange={handleInput}  required />

        <label>Hint or context</label>
        <textarea type="text" name="hint" value={form.hint} onChange={handleInput} />
        <div>
          Migrating? <button onClick={() => navigate("/import")}>Batch Import</button>
        </div>
        <div>
          <div className="buttoncontainer">
            {!!form.categoryId && form.answer && form.prompt && <button value="Submit" className="green">Create</button>}
            {(form.prompt || form.answer || form.hint) && <button onClick={resetForm}>clear</button>}
          </div>
          {createdCards && <div>{createdCards} {createdCards != 1 ? "cards" : "card"} successfully created</div>}
        <div>
        </div>
        </div>
      </form>
    </>
  )
}
