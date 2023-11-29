import { useEffect, useState } from "react"
import { baseURL, entryBlueprint } from "../helpers/constants"

function DropdownField ({category}) {
  const {id, title} = category
  return (
    <option id={id}>{title}</option>
  )
}

export default function CreateEntry() {
  const [categories, setCategories] = useState(null)

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
    "question": "",
    "answer": ""
  }
  const [form, setForm] = useState(initForm)

  const handleInput = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]:value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // if (!form.answer || !form.question) return
    // if (form.answer && form.question) 
    console.log("post")

    const endpoint = "/entries"
    const headers = {
      "content-type": "application/json"
    }

    const category = categories.find(category => category.title === form.category)

    const body = { ...entryBlueprint,
      "categoryId": category.id,
      "last": new Date().toISOString,
      "question": form.question,
      "answer": form.question,
    }

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    }

    fetch(baseURL + endpoint, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log("error creating entry", error))
  }
  
  if (!categories) return (<p>Loading…</p>)

  return (
    <form className="twoColumns" onChange={handleInput} onSubmit={handleSubmit}>
      <label>Category</label>
      <select name="category">
        {categories.map((category, index) => <DropdownField key={index} category={category}/>)}
      </select>
      <label>Question</label>
      <textarea type="text" name="question" required/>
      <label>Answer</label>
      <textarea type="text" name="answer" required/>
      <p></p>
      <button value="Submit">➕ Create</button>
    </form>
  )
}