import { useContext, useEffect, useState } from "react"
import { baseURL } from "../../helpers/helpers"
import { useNavigate } from "react-router"
import { userContext } from "../../App"

export default function Register () {

  const { setUser } = useContext(userContext)
  console.log("inside Register")

  const navigate = useNavigate()
  const [knownUsers, setKnownUsers] = useState(null)
  const [loginUser, setLoginUser] = useState(null)
  const [registerUser, setRegisterUser] = useState(null)

  const getUsers = () => {
    const endpoint = "/users"
    fetch(baseURL + endpoint)
      .then(res => res.json())
      .then(data => setKnownUsers(data))
  }

  useEffect(getUsers, [])

  const handleInput = (event) => {
    setLoginUser(event.target.value)
    // console.log(knownUsers.find(user => user.displayname === event.target.value))
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      console.log(event.target.value)
      const foundUser = knownUsers.find(user => user.displayname === loginUser)
      if (!foundUser) {
        console.log("unknown user")
        setUser(loginUser)
      } else {
        console.log("unknown user")
      }
    }
  
  if (!knownUsers) return (<button>Loading…</button>)
  
  return (
    <>
    <h3>SIGN UP</h3>
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input name="username" onChange={handleInput}/>
      <button value="Submit">Submit</button>
    </form>
    </>
  )
}