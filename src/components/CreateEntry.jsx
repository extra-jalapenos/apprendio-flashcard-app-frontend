import { useEffect, useState } from "react"
import { baseURL, entryBlueprint } from "../helpers/constants"
import { useNavigate } from "react-router"

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
    const endpoint = "/categories"
    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log("error loading categories", error))
  }

  useEffect(getCategories, [])

  const initForm = {
    "categoryId": null,
    "prompt": "",
    "answer": "",
    "clue": ""
  }

  const [form, setForm] = useState(initForm)

  const resetForm = () => setForm(initForm)

  const handleInput = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]:value })
    console.log(name, value, form)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const endpoint = "/entries"
    const headers = {
      "content-type": "application/json"
    }

    const body = { ...entryBlueprint,
      "categoryId": form.categoryId,
      "last": new Date().toISOString(),
      "prompt": form.prompt,
      "answer": form.answer,
      "clue": form.clue
    }

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    }

    fetch(baseURL + endpoint, options)
      .then(response => response.json())
      .then(() => navigate("/new-entry"))
      .then(() => resetForm())
      .catch(error => console.log("error creating entry", error))
  }
  
  if (!categories) return (<div className="center">
    Loading categories…
  </div>)

  return (
    <form className="twoColumns" onSubmit={handleSubmit}>
      <label>Category</label>
      <select name="categoryId" value={form.categoryId || "Select Category"} onChange={handleInput}>
        {!form.categoryId && <option>Select Category</option>}
        {categories.map((category, index) => <option key={index} value={category.id}>{category.title}</option>)}
      </select>
      <label>Prompt</label>
      <textarea type="text" name="prompt" value={form.prompt} onChange={handleInput} required />
      <label>Answer</label>
      <textarea type="text" name="answer" value={form.answer} onChange={handleInput}  required />
      <label>Clue / Context</label>
      <textarea type="text" name="clue" value={form.clue} onChange={handleInput}  required />
      <p></p>
      <button value="Submit">➕ Create</button>
    </form>
  )
}