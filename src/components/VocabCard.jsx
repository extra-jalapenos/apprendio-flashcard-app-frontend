import { mockData } from "../api/mockData.js"

export default function Card ({text}) {
  return (
    <div className="card">
      {text}
    </div>
  )
}