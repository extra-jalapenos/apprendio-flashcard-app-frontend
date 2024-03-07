import { useContext, useEffect, useState } from "react"
import { headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../App"
import Form from "./Form"

export default function Register () {

  const { setUser } = useContext(userContext)

  const navigate = useNavigate()
  const [failedLogin, setFailedLogin] = useState(false)
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
      body: JSON.stringify(signupData)
    }

    try {
      const register = await fetch("/api/register", options)
      if (register.code === 201) {
        const data = register.json()
        console.log(data)
      }
    } catch (error) {
      console.log(error, "something went wrong during signup")
    }
  }

  return (
    <div className="center">
      <h2>Create your account</h2>
      <Form name="signup" handleInput={handleInput} handleSubmit={handleSubmit}/>
    </div>
  )
}
