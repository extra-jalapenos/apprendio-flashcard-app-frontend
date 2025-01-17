import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { makeHeaders } from "../../helpers/auth"
import Loading from "../loadingScreen/Loading"
import { api } from "../../api/api"

export default function LanguageSelection () {

  const navigate = useNavigate()
  const [categories, setCategories] = useState(null)

  const getCategories = () => {
    const get = async () => {
      const response = await api.getCategories()
      if (response.message) return
      setCategories(response.categories)
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
