import { useContext, useEffect, useState } from "react"
import { baseURL, headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../App"

export default function Login () {

  const { setUser } = useContext(userContext)

  const navigate = useNavigate()
  const [failedLogin, setFailedLogin] = useState(false)
  const [loginData, setLoginData] = useState(null)

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
          setFailedLogin(true)
          console.log(data)
        }
      } catch (error) {
        console.log(error, "something went wrong during login")
      }
    }

  const createAccount = async () => {
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginData)
    }

    try {
      const register = await fetch("/api/register", options)
      if (register.code === 200) {
        const data = register.json()
        console.log(data)
      }
    } catch (error) {
      console.log(error, "something went wrong during signup")
    }
  }

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Username</label>
        <input name="username" onChange={handleInput}/>
        <label>Password</label>
        <input name="password" type="password" onChange={handleInput}/>
        <button value={"Submit"}>Submit</button>
        {failedLogin === true &&
          (
          <div>
            <h3>Oh hi, {loginData.username}!</h3>
            <p>You seem new here – do you want to create an account?</p>
            <button className="green" onClick={createAccount}>Create Account</button>
            <button className="red">Cancel</button>
          </div>
          )
        }
      </form>
    </div>
  )
}
