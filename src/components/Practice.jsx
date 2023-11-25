import { useState } from "react"
import { useParams, useNavigate } from "react-router"
import { mockData } from "../api/mockData"

export default function Practice () {
  const {id} = useParams()
  console.log(!id)
  const [category, setCategory] = useState(id)

  const entries = mockData.entries.filter(entry => entry.categoryId === category)

  return (
    <>
    <div>Test</div>
    {entries.map((entry, index) => <button key={index}>{entry.question}</button>)}
    </>
  )
}