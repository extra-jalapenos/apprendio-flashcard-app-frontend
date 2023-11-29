import { useEffect, useState } from "react"
import { baseURL } from "../helpers/constants"

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
    console.log(name, value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.answer || !form.question) return
    console.log(form)
    
  }
  
  if (!categories) return (<p>Loading…</p>)

  return (
    <form className="twoColumns" onChange={handleInput} onSubmit={handleSubmit}>
      <label>Category</label>
      <select name="categoryId">
        {categories.map((category, index) => <DropdownField category={category} />)}
      </select>
      <label>Question</label>
      <textarea type="text" name="question" />
      <label>Answer</label>
      <textarea type="text" name="answer" />
      <button value="Submit">Create</button>
    </form>
  )
}