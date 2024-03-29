import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { makeHeaders } from "../../helpers/auth"
import Loading from "../loadingScreen/Loading"

export default function LanguageSelection () {

  const navigate = useNavigate()
  const [categories, setCategories] = useState(null)

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

  if (!categories) return <Loading />

  return (
    <>
      <h2 className="center">Select your category</h2>
      <div className="autoColumns">
        {categories.map((category, index) => <button key={index} onClick={() => navigate("/practice/"+category.id+"/")}><b>{category.name}</b></button>)}
        <button onClick={() => navigate("/create-category")}>+ Add new category</button>
      </div>
    </>
  )
}
