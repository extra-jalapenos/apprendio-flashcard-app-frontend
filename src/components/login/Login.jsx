import { useContext, useState } from "react"
import { headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../context"
import Form from "./Form"
import { login } from "../../helpers/functions"

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
    const { username, password } = loginData

    if (!username || !password) {
      setFailMessage("Please enter username and password.")
      return
    }

    try {
      const tryLogin = await login(username, password)
      const { token } = tryLogin

      if (!token) {
        setFailedLogin(true)
        setFailMessage("Incorrect login credentials.")
      } else {
        sessionStorage.setItem("token", token)
        setUser(username)
        navigate("/start")
      }
    } catch (error) {
      console.log(error, "something went wrong during login")
      setFailMessage("Something went wrong. Our bad.")
    }

    event.target.reset()
  }

  return (
    <div className="center">
      <div className="banner warning">
        <p><b>Important note – 24th June</b></p>
        <p>We are currently migrating the database, so you cannot log in. Sorry!</p>
        <p>We expect to be back the 31th of June, 2024.</p>
      </div>
      {/* <h2>Welcome back!</h2>
      <Form name="login" prefill={loginData} handleInput={handleInput} handleSubmit={handleSubmit} />
      {failMessage && <p className="banner warning center">{failMessage}</p>}
      {failedLogin === false && <div className="banner center">
        <b>Not sure what to do? Take a tour!</b>
        <button onClick={() => setLoginData({username: "DemoDomino", password: "lernmausi"})}>Log in as Demo User</button>
      </div>}
      {loginData !== null && failedLogin === true &&
        (
        <div>
          <p>Oh hi, {loginData.username}!</p>
          <p>You seem to have forgotten your login details – or did you want to create an account?</p>
          <button className="green" onClick={() => navigate(`/register?username=${loginData.username}`)}>Create Account</button>
          <button className="red" onClick={resetPage}>Re-try login</button>
        </div>
        ) */}
      }
    </div>
  )
}
