import { mockData } from "../api/mockData.js"

export default function Card () {
  console.log(mockData)
  return (
    mockData.categories.map((category, key) => <button key={key}>{category.title}</button>)
  )
}