import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { headers } from "../helpers/constants"

export default function LanguageSelection () {

  const navigate = useNavigate()
  const [categories, setCategories] = useState(null)

  const getCategories = () => {
    const response = async () => {
      try {
        const myHeaders = new Headers()
        const token = sessionStorage.getItem("token")
        myHeaders.set("Authorization", `Bearer ${token}`)
        const options = {
          headers: headers()
        }
        const res = await fetch("/api/users/me/categories", options)
        const data = await res.json()
        if (res.status === 200) {
          setCategories(data.categories)
        } else {
          console.log(data)
        }
      } catch (error) {
        console.log("error fetching categories")
      }
    }
    response()
  }

  useEffect(getCategories, [])

  if (!categories) return (<div className="center">
      Loading…
    </div>)

  return (
    <>
      <h2 className="center">Select your category</h2>
      <div className="autoColumns">
        {categories.map((category, index) => <label key={index} onClick={() => navigate("/practice/"+category.id+"/")}>{category.name}</label>)}
        <button onClick={() => navigate("/create-category")}>Create new category</button>
      </div>
    </>
  )
}
