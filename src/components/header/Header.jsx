import { useNavigate } from "react-router-dom"

export default function Header () {
  const navigate = useNavigate()
  return (
    <header>
      <nav>
        <button onClick={() => navigate("/")}>✨ Flashy Flash Cards ✨</button>
        <button onClick={() => navigate("/select-language")}>Switch Languages</button>
      </nav>
    </header>
  )
}