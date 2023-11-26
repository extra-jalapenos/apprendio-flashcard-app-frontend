import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { mockData } from "../api/mockData"

export default function Practice () {
  const {id} = useParams()
  console.log(id, "ID")
  const [entries, setEntries] = useState(null)
  const getEntries = () => {
    const temp = mockData.entries.forEach(entry => console.log(entry.categoryId === id, id))
    console.log(temp)
    setEntries(mockData.entries.filter(entry => entry.categoryId === id))
  }

  useEffect(getEntries, [])
  if (!entries) return <>… Loading</>
  
  console.log(entries.length)
  return (
    <>
    <div>Test</div>
    {entries.length}
    {/* {entries.map((entry, index) => <button key={index}>{entry.question}</button>)} */}
    </>
  )
}