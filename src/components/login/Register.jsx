import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { userContext } from "../../context"
import SignupForm from "../signup/SignupForm"
import { useSearchParams } from "react-router-dom";
import { isValidEmail } from "../../helpers/functions"
import { api } from "../../api/api"

export default function Register () {

  const { setUser } = useContext(userContext)
  let [searchParams] = useSearchParams();
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

    try {
      const response = await api.register(signupData)
      console.log(response)
      if (response instanceof Error) {
        setFailMessage(response.message)
        return
      }
      setUser(signupData.username)
      navigate("/start")
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
      <SignupForm name="signup" prefill={signupData} handleInput={handleInput} handleSubmit={handleSubmit}/>
    </div>
  )
}
