import { useContext, useState } from "react"
import { headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../App"
import Form from "./Form"

export default function Register () {

  const { setUser } = useContext(userContext)

  const navigate = useNavigate()
  const [signupData, setSignupData] = useState(null)

  const handleInput = (event) => {
    const { name, value } = event.target
    setSignupData({
      ...signupData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

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
        navigate("/")
      } else if (tryRegister.status === 403) {
        console.log("username taken")
      } else {
        console.log("something went wrong registering")
      }
    } catch (error) {
      console.log(error, "something went wrong during signup")
    }
    event.target.reset()
  }

  return (
    <div className="center">
      <h2>Create your account</h2>
      <Form name="signup" handleInput={handleInput} handleSubmit={handleSubmit}/>
    </div>
  )
}
