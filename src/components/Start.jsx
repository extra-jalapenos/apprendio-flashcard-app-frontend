import { useNavigate } from "react-router"
import Card from "./VocabCard"
export default function Start() {
  const navigate = useNavigate()
  return (
    <main>
      <h1>Welcome back!</h1>
      <p>Choose what you want to do today!</p>
      <button onClick={() => navigate("/practice")}>Practice</button>
      <button>Create entries</button>
      <button>Analytics</button>
    </main>
  )
}