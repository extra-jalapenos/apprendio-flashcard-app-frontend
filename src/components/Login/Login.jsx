import { useContext, useState } from "react"
import { headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../context"
import Form from "./Form"

export default function Login () {

  const { setUser } = useContext(userContext)

  const navigate = useNavigate()
  const [failedLogin, setFailedLogin] = useState(false)
  const [loginData, setLoginData] = useState(null)

  const resetPage = () => {
    setLoginData(null)
    setFailedLogin(false)
  }

  const handleInput = (event) => {
    const { name, value } = event.target
    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
      event.preventDefault()
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(loginData)
      }

    try {
      const tryLogin = await fetch("/api/login", options)
      console.log(tryLogin.status)
      const data = await tryLogin.json()
      if (tryLogin.status === 200) {
        sessionStorage.setItem("token", data.token)
        setUser(loginData.username)
        navigate("/")
      } else {
        if (tryLogin.status === 401) {
          setFailedLogin(true)
        }
      }
    } catch (error) {
      console.log(error, "something went wrong during login")
    }
    event.target.reset()
  }

  return (
    <div className="center">
      <h2>Login</h2>
      <Form name="login" handleInput={handleInput} handleSubmit={handleSubmit} />
      {loginData !== null && failedLogin === true &&
        (
        <div>
          <h3>Oh hi, {loginData.username}!</h3>
          <p>You seem to have forgotten your login details – or did you want to create an account?</p>
          <button className="green" onClick={() => navigate("/register")}>Create Account</button>
          <button className="red" onClick={resetPage}>Re-try login</button>
        </div>
        )
      }
    </div>
  )
}
