import { useNavigate } from "react-router"
export default function Start() {
  const navigate = useNavigate()
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Choose what you want to do today!</p>
      <button onClick={() => navigate("/select-language")}>Practice</button>
      <button>Create entries</button>
      <button>Analytics</button>
    </>
  )
}