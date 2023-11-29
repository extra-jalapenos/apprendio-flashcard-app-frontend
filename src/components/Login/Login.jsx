import { useContext, useEffect, useState } from "react"
import { baseURL } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../App"

export default function Login () {

  const { setUser } = useContext(userContext)

  const navigate = useNavigate()
  const [knownUsers, setKnownUsers] = useState(null)
  const [knownUser, setKnownUser] = useState(null)
  const [failedLogin, setFailedLogin] = useState(false)
  const [username, setUsername] = useState(null)
  
  const getUsers = () => {
    const endpoint = "/users"
    fetch(baseURL + endpoint)
      .then(res => res.json())
      .then(data => setKnownUsers(data))
  }
  useEffect(getUsers, [])

  const handleInput = (event) => {
    setUsername(event.target.value)
    const checkDatabase = () => !!knownUsers.find(user => user.displayname === event.target.value)
    setKnownUser(checkDatabase())
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      const foundUser = knownUsers.find(user => user.displayname === username)
      if (foundUser) {
        console.log("logging in handleSubmit", foundUser)
        setUser(foundUser)
        sessionStorage.removeItem("sessionStats")
        setFailedLogin(false)
        navigate("/select-category")
      } else {
        setFailedLogin(true)
      }
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
    
    const headers = {
      "content-type": "application/json",
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

  if (!knownUsers) return (
    <div className="center">
      Loading users…
    </div>)
  
  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" onChange={handleInput}/>
        <button value={"Submit"}>Submit</button>
        {failedLogin && knownUser === false && !!username && 
              (<div>
              <h3>Oh hi, {username}!</h3>
              <p>You seem new here – do you want to create an account?</p>
              <button className="green" onClick={createAccount}>Create Account</button>
              <button className="red">Cancel</button>
            </div>)
        }
      </form>
    </div>
  )
}