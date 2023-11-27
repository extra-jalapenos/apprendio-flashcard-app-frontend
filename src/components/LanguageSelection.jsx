import { useState } from "react"
import { useParams, useNavigate } from "react-router"
import { mockData } from "../api/mockData"

export default function LanguageSelection () {
  const navigate = useNavigate()
  return (
    mockData.categories.map((category, index) => <button key={index} onClick={() => navigate("/practice/"+index+"/0")}>{category.title}</button>)
  )
}