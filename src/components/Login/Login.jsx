import { useContext, useEffect, useState } from "react"
import { baseURL } from "../../helpers/helpers"
import { useNavigate } from "react-router"
import { userContext } from "../../App"



export default function Login () {

  const { setUser } = useContext(userContext)

  const navigate = useNavigate()
  const [knownUsers, setKnownUsers] = useState(null)
  const [knownUser, setKnownUser] = useState(null)
  const [loginUser, setLoginUser] = useState(null)
  const [failedLogin, setFailedLogin] = useState(false)

  const getUsers = () => {
    const endpoint = "/users"
    fetch(baseURL + endpoint)
      .then(res => res.json())
      .then(data => setKnownUsers(data))
  }

  useEffect(getUsers, [])

  const handleInput = (event) => {
    const checkDatabase = () => !!knownUsers.find(user => user.displayname === event.target.value)
    setLoginUser(event.target.value)
    setKnownUser(checkDatabase())
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      console.log(event.target.value)
      const foundUser = knownUsers.find(user => user.displayname === loginUser)
      if (foundUser) {
        setUser(loginUser)
        setFailedLogin(false)
        navigate("/")
      } else {
        setFailedLogin(true)
      }
    }

  const createAccount = () => {
    console.log("Create")
    const endpoint = "/users"
    const body = {
      "displayname": loginUser,
      "statistics": {
        "correct": 0,
        "wrong": 0,
        "total": 0
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
      .then(setLoginUser(loginUser))
      .then(() => navigate("/"))
  }

  const resetLogin = () => {
    console.log()
  }

  const RegisterButtons = () => {
    return (
      <div>
        <h3>Oh hi, {loginUser}!</h3>
        <p>You seem new here – do you want to create an account?</p>
        <button className="green" onClick={createAccount}>Create Account</button>
        <button className="red" value="reset" onClick={resetLogin}>Cancel</button>
      </div>
    )
  }
  
  if (!knownUsers) return (<button>Loading…</button>)
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" onChange={handleInput}/>
        <button value={"Submit"}>Submit</button>
        {failedLogin && knownUser === false && !!loginUser && 
              (<div>
              <h3>Oh hi, {loginUser}!</h3>
              <p>You seem new here – do you want to create an account?</p>
              <button className="green" onClick={createAccount}>Create Account</button>
              <button className="red">Cancel</button>
            </div>)
        }
      </form>
    </>
  )
}