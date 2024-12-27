import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../context/context"

export default function Header () {
  const { user, logoutUser } = useContext(userContext)
  const navigate = useNavigate()

  if (user) {
    return (
      <header>
        <nav>
          <button onClick={() => navigate("/start")}>Start</button>
          <button onClick={() => navigate("/profile")}>{user}</button>
          {user && <button onClick={() => logoutUser()}>Logout</button>}
        </nav>
      </header>
    )
  } else {
    return (
      <header>
        <nav>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/about")}>FAQ</button>
          <button onClick={() => navigate("/imprint")}>Imprint</button>
        </nav>
      </header>
    )
  }
}
