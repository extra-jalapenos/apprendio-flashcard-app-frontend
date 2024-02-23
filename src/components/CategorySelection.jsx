import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { baseURL, header } from "../helpers/constants"

export default function LanguageSelection () {

  const navigate = useNavigate()
  const [categories, setCategories] = useState(null)

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories")
      const data = res.json()
      if (res.status === 200) {
        setCategories(data.categories)
      } else {
        setCategories([])
      }
    } catch (error) {
      console.log("error fetching categories")
    }
  }

  useEffect(() => getCategories(), [])

  if (!categories) return (<div className="center">
      Loading…
    </div>)

  return (
    <>
      <h2 className="center">Select your category</h2>
      <div className="autoColumns">
        {categories.map((category, index) => <label key={index} onClick={() => navigate("/practice/"+category.id+"/")}>{category.title}</label>)}
        <button onClick={() => navigate("/create-category")}>Create new category</button>
      </div>
    </>
  )
}
