import { useNavigate } from "react-router"
export default function Start() {
  const navigate = useNavigate()
  return (
    <div className="center">
      <h1>Welcome back!</h1>
      <p>Choose what you want to do today!</p>
      <button onClick={() => navigate("/select-category")}>Practice</button>
      <button onClick={() => navigate("/new-entry")}>Create entries</button>
      <button  onClick={() => navigate("/lookup")}>Look up</button>
      <button  onClick={() => navigate("/analytics")}>Analytics</button>
    </div>
  )
}