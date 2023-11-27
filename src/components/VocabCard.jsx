import { mockData } from "../api/mockData.js"

export default function Card ({text}) {
  return (
    <p className="card">
      {text}
    </p>
  )
}