import { useNavigate } from "react-router-dom"

export default function Header () {
  const navigate = useNavigate()
  return (
    <header>
      <nav>
        <button onClick={() => navigate("/")}>✨ Flashy Flash Cards ✨</button>
        <button onClick={() => navigate("/select-language")}>Switch Languages</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </nav>
    </header>
  )
}