import { useNavigate } from "react-router-dom"

export default function Header () {
  const navigate = useNavigate()
  return (
    <header>
      <nav>
        <button>✨ Flashy Flash Cards ✨</button>
        <button>Home</button>
        <button>Switch Languages</button>
      </nav>
    </header>
  )
}