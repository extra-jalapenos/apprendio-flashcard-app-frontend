import { userContext } from "../context/context"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { makeHeaders } from "../../helpers/auth"
import Loading from "../loadingScreen/Loading"

export default function CreateCategory () {
  const { user } = useContext(userContext)
  const navigate = useNavigate()
  const [categories, setCategories] = useState(null)
  const [form, setForm] = useState({ user: (user || "unknown"), entries: [] })

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

  const handleChange = (event) => {
    const {name, value} = event.target
    setForm({...form, [name]: value})
  }

  const duplicate = () => !!categories.find(category => category.name === form.name)

  const createCategory = async () => {
    try {
      const body = {
        "name": form.name
      }

      const options = {
        method: "POST",
        headers: makeHeaders(),
        body: JSON.stringify(body)
      }

      const response = await fetch("/api/categories", options)
      if (response.status === 201) {
        navigate("/select-category")
      }
    } catch (error) {
      console.log(error, "error creating category")
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    duplicate() ? navigate("/select-category") : createCategory()
  }

  if (!categories) return <Loading message={"Loading categories…"} />

  return (
    <main className="center">
    <h2>Create new category</h2>
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <label>Name</label>
      <input name="name"/>
      <button>+ Create</button>
    </form>
    </main>
  )
}
