import { useContext, useEffect, useState } from "react"
import { baseURL, headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../App"

export default function Login () {

  const { setUser } = useContext(userContext)

  const navigate = useNavigate()
  const [knownUsers, setKnownUsers] = useState(null)
  const [knownUser, setKnownUser] = useState(null)
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
      console.log(options)
      const tryLogin = await fetch(`/api/${baseURL}/login`, options)
      console.log(tryLogin)
      // const foundUser = knownUsers.find(user => user.displayname === username)
      // if (foundUser) {
      //   setUser(foundUser)
      //   sessionStorage.removeItem("sessionStats")
      //   setFailedLogin(false)
      //   navigate("/select-category")
      // } else {
      //   setFailedLogin(true)
      // }
    }

  const createAccount = () => {
    const endpoint = "/users"
    const body = {
      "displayname": username,
      "statistics": {
        "correct": 0,
        "wrong": 0
      }
    }

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    }

    fetch(baseURL + endpoint, options)
      .then(res => res.json())
      .then(setUser(body))
      .then(() => navigate("/select-category"))
      .catch(error => console.log(error, "error creating account"))
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
        {failedLogin && knownUser === false && !!username &&
          (
          <div>
            <h3>Oh hi, {username}!</h3>
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
