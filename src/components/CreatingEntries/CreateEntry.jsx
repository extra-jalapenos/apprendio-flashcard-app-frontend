import { useEffect, useState } from "react"
import { entryBlueprint } from "../../helpers/constants.js"
import { useNavigate } from "react-router"
import { makeHeaders } from "../../helpers/functions"
import BatchImport from "./BatchImport"

function DropdownField ({category}) {
  const {id, title} = category
  return (
    <option id={id}>{title}</option>
  )
}

export default function CreateEntry() {
  const [categories, setCategories] = useState(null)

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
        const data = await response.json()
        if (response.status === 201) {
          console.log("created", data.card)
          resetForm()
        } else {
          console.log(response.status, "error creating card")
        }
      } else {
        console.log(response.status)
        console.log("error creating entry")
      }
    } catch (error) {
      console.log(error, "error creating entry")
    }

  }

  if (!categories) return (<div className="center">
    Loading categories…
  </div>)

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
        <p>Want to create a lot of entries?</p>
        <button onClick={() => navigate("/import")}>Import</button>
      </div>

      <div className="buttoncontainer">
        {!!form.categoryId && form.answer && form.prompt && <button value="Submit">➕ Create</button>}
        {(form.prompt || form.answer || form.hint) && <button onClick={resetForm}>clear</button>}
      </div>
    </form>
  )
}
