import { isValidElement, useContext, useState } from "react"
import { headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../context"
import Form from "./Form"
import { useSearchParams } from "react-router-dom";
import { isValidEmail } from "../../helpers/functions"

export default function Register () {

  const { setUser } = useContext(userContext)
  let [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username")

  const navigate = useNavigate()
  const [signupData, setSignupData] = useState({ username })
  const [failMessage, setFailMessage] = useState(null)

  const handleInput = (event) => {
    const { name, value } = event.target
    setSignupData({
      ...signupData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isValidEmail(signupData.email) === false) {
      setFailMessage("Please submit a valid email!")
      return
    }
    
    if (signupData.password === "" || signupData.repeatPassword === "") {
      setFailMessage("Please fill out all fields!")
      return
    }

    if (signupData.password !== signupData.repeatPassword) {
      setFailMessage("Your passwords don't match!")
      setSignupData({ ... signupData, password: "", repeatPassword: "" } )
      return
    }

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(signupData)
    }

    try {
      const tryRegister = await fetch("/api/register", options)
      if (tryRegister.status === 201) {
        const data = await tryRegister.json()
        sessionStorage.setItem("token", data.token)
        setUser(signupData.username)
        navigate("/start")
      } else if (tryRegister.status === 403) {
        setFailMessage(`Sorry, ${signupData.username} is already taken!`)
      } else {
        setFailMessage("Don't know about that. Did you fill out everything?")
      }
    } catch (error) {
      setFailMessage("Something went wrong. Our bad.")
    }
    event.target.reset()
  }

  return (
    <div className="center">
      <h2>Hi, so nice to meet you!</h2>
      <p>Create your account and start right away!</p>
      {failMessage && <p className="banner warning center">{failMessage}</p>}
      <Form name="signup" prefill={signupData} handleInput={handleInput} handleSubmit={handleSubmit}/>
    </div>
  )
}
