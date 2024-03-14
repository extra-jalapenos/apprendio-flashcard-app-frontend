import { useEffect, useState } from "react"
import { entryBlueprint } from "../../helpers/constants.js"
import { useNavigate } from "react-router"
import { makeHeaders } from "../../helpers/functions.js"
import Loading from "../loadingScreen/Loading.jsx"

export default function CreateEntry() {
  const [categories, setCategories] = useState(null)
  const [createdCards, setCreatedCards] = useState(null)

  const navigate = useNavigate()

  const getCategories = () => {
    const get = async () => {
      try {
        const options = {
          headers: makeHeaders()
        }
        const response = await fetch("/api/users/me/categories", options)
        if (response.status === 200) {
          const data = await response.json()
          setCategories(data.categories)
        }
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
  const resetForm = () => setForm(initForm)

  const handleInput = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]:value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.categoryId) return

    try {
      const { prompt, answer, hint } = form

      const body = { ...entryBlueprint,
        categoryId: Number(form.categoryId),
        lastAskedAt: null,
        prompt,
        answer,
        hint
      }

      const options = {
        method: "POST",
        headers: makeHeaders(),
        body: JSON.stringify(body)
      }

      const response = await fetch("/api/cards", options)
      if (response.status === 201) {
          setCreatedCards(createdCards + 1)
          resetForm()
        } else {
        console.log("error creating entry")
      }
    } catch (error) {
      console.log(error, "error creating entry")
    }

  }

  if (!categories) return <Loading />

  return (
    <form className="twoColumns" onSubmit={handleSubmit}>
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

      <div className="buttoncontainer">
        {!!form.categoryId && form.answer && form.prompt && <button value="Submit">➕ Create</button>}
        {(form.prompt || form.answer || form.hint) && <button onClick={resetForm}>clear</button>}
      </div>
      {createdCards && <div className="banner green center">{createdCards} {createdCards != 1 ? "cards" : "card"} successfully created</div>}
      <div className="buttoncontainer">
        <p>Want to create a lot of entries?</p>
        <button onClick={() => navigate("/import")}>Import</button>
      </div>
    </form>
  )
}
