import { useState } from "react"
import { useParams, useNavigate } from "react-router"
import { mockData } from "../api/mockData"

export default function LanguageSelection () {
  const navigate = useNavigate()
  return (
    <>
      <h2>Select your category</h2>
      <div className="autoColumns">
        {mockData.categories.map((category, index) => <p className="card" key={index} onClick={() => navigate("/practice/"+index+"/0")}>{category.title}</p>)}
      </div>
    </>
  )
}