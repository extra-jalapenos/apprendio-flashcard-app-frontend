import { useContext, useState } from "react"
import { headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../context"
import Form from "./Form"

export default function Login () {

  const { setUser } = useContext(userContext)
  const initUser = {
    username: "",
    password: ""
  }

  const navigate = useNavigate()
  const [failedLogin, setFailedLogin] = useState(false)
  const [loginData, setLoginData] = useState(initUser)
  const [failMessage, setFailMessage] = useState(null)

  const resetPage = () => {
    setLoginData(initUser)
    setFailedLogin(false)
    setFailMessage(null)
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
        navigate("/start")
      } else {
        if (tryLogin.status === 401) {
          setFailedLogin(true)
          setFailMessage("Incorrect login data.")
        } else if (tryLogin.status === 400) {
          setFailMessage("Please enter username and password.")
        }
      }
    } catch (error) {
      console.log(error, "something went wrong during login")
      setFailMessage("Something went wrong. Our bad.")
    }
    event.target.reset()
  }

  return (
    <div className="center">
      <h2>Welcome back!</h2>
      <Form name="login" prefill={loginData} handleInput={handleInput} handleSubmit={handleSubmit} />
      {failedLogin === false && <div className="banner center">
        <b>Not sure what to do? Take a tour!</b>
        <button onClick={() => setLoginData({username: "DemoDominik", password: "lernmausi"})}>Log in as Demo User</button>
      </div>}
      {failMessage && <p className="banner warning center">{failMessage}</p>}
      {loginData !== null && failedLogin === true &&
        (
        <div>
          <p>Oh hi, {loginData.username}!</p>
          <p>You seem to have forgotten your login details – or did you want to create an account?</p>
          <button className="green" onClick={() => navigate(`/register?username=${loginData.username}`)}>Create Account</button>
          <button className="red" onClick={resetPage}>Re-try login</button>
        </div>
        )
      }
    </div>
  )
}
