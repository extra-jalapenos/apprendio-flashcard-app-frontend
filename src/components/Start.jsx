import { useNavigate } from "react-router"

export default function Start() {
  const navigate = useNavigate()

  return (
    <div className="center">
      <h2>Welcome back!</h2>
      <div className="autoColumns">
        <button onClick={() => navigate("/select-category")}>Practice</button>
        <button onClick={() => navigate("/new-entry")}>Create entries</button>
        <button  onClick={() => navigate("/lookup")}>Look up</button>
        <button  onClick={() => navigate("/analytics")}>Analytics</button>
        <button  onClick={() => navigate("/statistics")}>Statistics</button>
      </div>
    </div>
  )
}
