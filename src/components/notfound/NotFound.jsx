import { useNavigate } from "react-router-dom"

export default function NotFound () {
  const navigate = useNavigate()
  return (
    <div className="center">
      <h2>Oops.</h2>
      <p className="banner">There&apos;s nothing here. Maybe it never existed, maybe it was deleted. Maybe it&apos;s still there, but was moved. Sorry.</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  )
}
